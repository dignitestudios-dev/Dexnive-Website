// app/api/jobs/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { fetchJobs } from '@/lib/odoo';

const LIMIT = 10;

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const offset = parseInt(req.nextUrl.searchParams.get('offset') ?? '0', 10);
    const limit  = parseInt(req.nextUrl.searchParams.get('limit')  ?? String(LIMIT), 10);

    const jobs = await fetchJobs(offset, limit);
    return NextResponse.json({ jobs, hasMore: jobs.length === limit });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[GET /api/jobs]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
