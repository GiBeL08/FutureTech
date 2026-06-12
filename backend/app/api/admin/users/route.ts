import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
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

// GET all users
export async function GET(request: NextRequest) {
  const admin = requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403, headers: corsHeaders() });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true, email: true, name: true,
      avatar: true, role: true, createdAt: true,
      _count: { select: { posts: true, comments: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ data: users }, { headers: corsHeaders() });
}
