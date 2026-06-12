import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

function requireAdmin(request: NextRequest) {
  const auth = request.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  const decoded = verifyToken(auth.substring(7));
  if (!decoded || decoded.role !== 'admin') return null;
  return decoded;
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders() });
}

// GET — stats + subscribers
export async function GET(request: NextRequest) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403, headers: corsHeaders() });
  }
  const [stats, subscribers] = await Promise.all([
    prisma.siteStat.findMany({ orderBy: { sort: 'asc' } }),
    prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: 'desc' } }),
  ]);
  return NextResponse.json({ data: { stats, subscribers } }, { headers: corsHeaders() });
}

// POST — update stat
export async function POST(request: NextRequest) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403, headers: corsHeaders() });
  }
  const { id, value, label } = await request.json();
  const stat = await prisma.siteStat.update({
    where: { id },
    data: { ...(value && { value }), ...(label && { label }) },
  });
  return NextResponse.json({ data: stat }, { headers: corsHeaders() });
}