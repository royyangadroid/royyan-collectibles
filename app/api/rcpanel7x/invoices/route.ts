import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY ?? '$2a$10$hHr99Fi2urp1SDkjQKf5wO8ZikjAKMDu4mH5TCB/.D6z9boGQ2mWG';
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID ?? '6a6995bef5f4af5e29cffbfe';
const JSONBIN_BASE = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

async function forwardRequest(method: string, body?: unknown) {
  const headers: Record<string, string> = {
    'X-Master-Key': JSONBIN_API_KEY,
  };

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(JSONBIN_BASE, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const responseBody = await res.text();
  return new NextResponse(responseBody, {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('content-type') ?? 'application/json',
    },
  });
}

export async function GET() {
  const res = await fetch(`${JSONBIN_BASE}/latest`, {
    headers: {
      'X-Master-Key': JSONBIN_API_KEY,
    },
  });

  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('content-type') ?? 'application/json',
    },
  });
}

export async function PUT(request: Request) {
  const payload = await request.json();
  return forwardRequest('PUT', payload);
}
