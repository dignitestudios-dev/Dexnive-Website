// app/api/jobs/route.ts

import { NextResponse } from 'next/server';
import { fetchJobs } from '@/lib/odoo';

export async function GET(): Promise<NextResponse> {
  try {
    const jobs = await fetchJobs();
    return NextResponse.json({ jobs });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[GET /api/jobs]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
