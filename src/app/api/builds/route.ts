import { NextResponse } from 'next/server';
import { builds, createBuild } from '@/mocks/data';
import { ensureSim } from '@/server/sim';

export async function GET() {
  ensureSim();
  return NextResponse.json({ builds });
}

export async function POST(req: Request) {
  ensureSim();
  const body = (await req.json()) as { package: string; branch?: string };
  const b = createBuild(body.package, body.branch);
  return NextResponse.json(b, { status: 201 });
}
