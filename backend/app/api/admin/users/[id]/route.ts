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

// PUT — change role
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const admin = requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403, headers: corsHeaders() });

  const { role } = await request.json();
  const user = await prisma.user.update({
    where: { id: params.id },
    data: { role },
    select: { id: true, email: true, name: true, role: true },
  });

  return NextResponse.json({ data: user }, { headers: corsHeaders() });
}

// DELETE user
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const admin = requireAdmin(request);
  if (!admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403, headers: corsHeaders() });

  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true }, { headers: corsHeaders() });
}