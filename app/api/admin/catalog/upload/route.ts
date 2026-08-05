import { NextResponse, type NextRequest } from 'next/server';
import { verifyAdminJWT, ADMIN_COOKIE_NAME } from '@/lib/auth';
import { Octokit } from '@octokit/rest';
import { exec } from 'child_process';
import path from 'path';
import { promisify } from 'util';

export const runtime = 'nodejs';

const execAsync = promisify(exec);

async function runSync() {
  try {
    const scriptPath = path.join(process.cwd(), 'scripts', 'sync-data.js');
    await execAsync(`node "${scriptPath}"`, { cwd: process.cwd() });
    console.log('[sync] generated-data.ts regenerated successfully.');
  } catch (e: any) {
    console.error('[sync] Failed to run sync-data.js:', e.message);
  }
}

// --- Magic Bytes Validation ---
function validateImageMagicBytes(buffer: Uint8Array): boolean {
  // Check for JPEG: FF D8 FF
  if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) return true;
  // Check for PNG: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) return true;
  // Check for WebP: RIFF ... WEBP
  if (
    buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
    buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50
  ) return true;
  return false;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Auth Validation
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }
    const payload = await verifyAdminJWT(token);
    if (!payload) {
      return NextResponse.json({ ok: false, error: 'Invalid token' }, { status: 401 });
    }

    // 2. Parse FormData
    const formData = await request.formData();
    const cover = formData.get('cover') as File | null;
    
    if (!cover) {
      return NextResponse.json({ ok: false, error: 'Cover image is required' }, { status: 400 });
    }

    // Validation: Check file size (e.g., max 3MB)
    const MAX_SIZE = 3 * 1024 * 1024;
    if (cover.size > MAX_SIZE) {
      return NextResponse.json({ ok: false, error: 'File size exceeds 3MB limit' }, { status: 400 });
    }

    const arrayBuffer = await cover.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    
    // Validation: Magic Bytes
    if (!validateImageMagicBytes(buffer)) {
      return NextResponse.json({ ok: false, error: 'Invalid image format. Only JPEG, PNG, or WebP allowed.' }, { status: 400 });
    }

    // Prepare metadata
    const collectionNumber = formData.get('collectionNumber') as string;
    if (!collectionNumber) {
      return NextResponse.json({ ok: false, error: 'collectionNumber is required' }, { status: 400 });
    }

    const dataObj = {
      id: formData.get('id') || `ryc-${Math.random().toString(36).substr(2, 9)}`,
      collectionNumber,
      title: formData.get('title') || '',
      price: parseInt(formData.get('price') as string || '0', 10),
      category: formData.get('category') || '',
      condition: formData.get('condition') || '',
      badge: formData.get('badge') || '',
      status: formData.get('status') || 'Available',
      description: formData.get('description') || '',
      featured: formData.get('featured') === 'true',
      tags: JSON.parse(formData.get('tags') as string || '[]'),
    };

    // 3. GitHub API Setup
    const GITHUB_PAT = process.env.GITHUB_PAT;
    const GITHUB_OWNER = process.env.GITHUB_OWNER;
    const GITHUB_REPO = process.env.GITHUB_REPO;
    const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

    if (!GITHUB_PAT || !GITHUB_OWNER || !GITHUB_REPO) {
      console.error("Missing GitHub environment variables.");
      return NextResponse.json({ ok: false, error: 'Server configuration error' }, { status: 500 });
    }

    const octokit = new Octokit({ auth: GITHUB_PAT });

    // 4. Git Trees Flow
    // Get latest commit SHA
    const refData = await octokit.git.getRef({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      ref: `heads/${GITHUB_BRANCH}`,
    });
    const latestCommitSha = refData.data.object.sha;

    // Get Base Tree SHA
    const commitData = await octokit.git.getCommit({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      commit_sha: latestCommitSha,
    });
    const baseTreeSha = commitData.data.tree.sha;

    // Create Image Blob (Base64)
    const imageBase64 = Buffer.from(arrayBuffer).toString('base64');
    const imageBlob = await octokit.git.createBlob({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      content: imageBase64,
      encoding: 'base64',
    });

    // Create JSON Blob (UTF-8)
    const dataJsonContent = JSON.stringify(dataObj, null, 2);
    const dataBlob = await octokit.git.createBlob({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      content: dataJsonContent,
      encoding: 'utf-8',
    });

    // Determine cover extension
    const isPng = buffer[0] === 0x89;
    const isWebp = buffer[0] === 0x52;
    const ext = isPng ? 'png' : (isWebp ? 'webp' : 'jpg');

    // Create New Tree
    const treeData = await octokit.git.createTree({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      base_tree: baseTreeSha,
      tree: [
        {
          path: `public/catalog/${collectionNumber}/cover.${ext}`,
          mode: '100644',
          type: 'blob',
          sha: imageBlob.data.sha,
        },
        {
          path: `public/catalog/${collectionNumber}/data.json`,
          mode: '100644',
          type: 'blob',
          sha: dataBlob.data.sha,
        },
      ],
    });

    // Create Commit
    const newCommit = await octokit.git.createCommit({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      message: `Admin Panel: Upload catalog item ${collectionNumber}`,
      tree: treeData.data.sha,
      parents: [latestCommitSha],
    });

    // Update Ref
    await octokit.git.updateRef({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      ref: `heads/${GITHUB_BRANCH}`,
      sha: newCommit.data.sha,
    });

    // Re-generate generated-data.ts so the new item appears immediately
    await runSync();

    return NextResponse.json({ ok: true, message: 'Upload successful and catalog synced!' });

  } catch (error: any) {
    console.error('Upload Error:', error);
    return NextResponse.json({ ok: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
