// app/api/jobs/[id]/route.ts

import { NextResponse } from 'next/server';
import { fetchJobById } from '@/lib/odoo';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: Request,
  { params }: RouteContext,
): Promise<NextResponse> {
  const { id } = await params;
  try {
    const job = await fetchJobById(id);

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({ job });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[GET /api/jobs/${id}]`, message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
