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
    console.log('[sync] Pulling latest changes from GitHub...');
    await execAsync('git pull', { cwd: process.cwd() });
    
    console.log('[sync] Running sync-data.js...');
    const scriptPath = path.join(process.cwd(), 'scripts', 'sync-data.js');
    await execAsync(`node "${scriptPath}"`, { cwd: process.cwd() });
  } catch (e: any) {
    console.error('[sync] Failed:', e.message);
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
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

    // 4. Fetch existing sold.json and data.json
    let soldArray: string[] = [];
    let dataObj: any = {};

    try {
      // Fetch sold.json
      const soldResp = await octokit.repos.getContent({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        path: 'public/sold.json',
        ref: `heads/${GITHUB_BRANCH}`,
      });
      
      const soldBase64 = (soldResp.data as any).content;
      const soldText = Buffer.from(soldBase64, 'base64').toString('utf-8');
      soldArray = JSON.parse(soldText);
    } catch (e: any) {
      if (e.status !== 404) {
        throw new Error(`Failed to fetch sold.json: ${e.message}`);
      }
    }

    try {
      // Fetch data.json
      const dataResp = await octokit.repos.getContent({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        path: `public/catalog/${collectionNumber}/data.json`,
        ref: `heads/${GITHUB_BRANCH}`,
      });
      
      const dataBase64 = (dataResp.data as any).content;
      const dataText = Buffer.from(dataBase64, 'base64').toString('utf-8');
      dataObj = JSON.parse(dataText);
    } catch (e: any) {
      throw new Error(`Failed to fetch data.json for ${collectionNumber}: ${e.message}`);
    }

    // 5. Update data
    const originalLength = soldArray.length;
    soldArray = soldArray.filter((id) => id !== collectionNumber);
    
    // Check if it's already Available to prevent unnecessary commits
    if (dataObj.status === 'Available' && originalLength === soldArray.length) {
       return NextResponse.json({ ok: true, message: `${collectionNumber} is already available` });
    }

    dataObj.status = 'Available';

    const newSoldJsonContent = JSON.stringify(soldArray, null, 2);
    const newDataJsonContent = JSON.stringify(dataObj, null, 2);

    // 6. Git Trees Flow
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

    // Create JSON Blobs
    const soldBlob = await octokit.git.createBlob({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      content: newSoldJsonContent,
      encoding: 'utf-8',
    });

    const dataBlob = await octokit.git.createBlob({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      content: newDataJsonContent,
      encoding: 'utf-8',
    });

    // Create New Tree
    const treeData = await octokit.git.createTree({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      base_tree: baseTreeSha,
      tree: [
        {
          path: 'public/sold.json',
          mode: '100644',
          type: 'blob',
          sha: soldBlob.data.sha,
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
      message: `Admin Panel: Undo mark sold for ${collectionNumber}`,
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
    return NextResponse.json({ ok: true, message: `Successfully reverted ${collectionNumber} to Available` });

  } catch (error: any) {
    console.error('Undo Sold Error:', error);
    return NextResponse.json({ ok: false, error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
