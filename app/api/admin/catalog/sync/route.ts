import { NextResponse, type NextRequest } from 'next/server';
import { verifyAdminJWT, ADMIN_COOKIE_NAME } from '@/lib/auth';
import { exec } from 'child_process';
import path from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);
export const runtime = 'nodejs';

/**
 * POST /api/admin/catalog/sync
 * Triggers regeneration of lib/generated-data.ts from public/catalog/*.
 * Must be called after any GitHub push to keep the catalog in sync locally.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Auth check
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    const payload = await verifyAdminJWT(token);
    if (!payload) return NextResponse.json({ ok: false, error: 'Invalid token' }, { status: 401 });

    const projectRoot = path.join(process.cwd());
    const scriptPath = path.join(projectRoot, 'scripts', 'sync-data.js');

    const { stdout, stderr } = await execAsync(`node "${scriptPath}"`, { cwd: projectRoot });

    return NextResponse.json({
      ok: true,
      message: 'sync-data.js executed successfully. Restart dev server or redeploy to see new items.',
      stdout: stdout.trim(),
      stderr: stderr.trim(),
    });
  } catch (error: any) {
    console.error('Sync Error:', error);
    return NextResponse.json({ ok: false, error: error.message || 'Sync failed' }, { status: 500 });
  }
}
