import { NextResponse } from 'next/server';
import { withLogs } from '@/mocks/data';
import { ensureSim } from '@/server/sim';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Params) {
  ensureSim();
  const { id } = await params;
  return NextResponse.json(withLogs(id));
}
