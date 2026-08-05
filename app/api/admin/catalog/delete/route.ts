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
  } catch (e: any) {
    console.error('[sync] Failed:', e.message);
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
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

    // 2. Parse Body
    let body: { collectionNumber?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ ok: false, error: 'Invalid request body' }, { status: 400 });
    }

    const { collectionNumber } = body;
    if (!collectionNumber) {
      return NextResponse.json({ ok: false, error: 'collectionNumber is required (e.g. RC-037)' }, { status: 400 });
    }

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

    // Create New Tree, deleting the collection folder by setting its sha to null
    const treeData = await octokit.git.createTree({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      base_tree: baseTreeSha,
      tree: [
        {
          path: `public/catalog/${collectionNumber}`,
          mode: '040000',
          type: 'tree',
          sha: null as any,
        }
      ],
    });

    // Create Commit
    const newCommit = await octokit.git.createCommit({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      message: `Admin Panel: Delete catalog item ${collectionNumber}`,
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

    await runSync();
    return NextResponse.json({ ok: true, message: `Successfully deleted ${collectionNumber}` });

  } catch (error: any) {
    console.error('Delete Catalog Error:', error);
    return NextResponse.json({ ok: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
