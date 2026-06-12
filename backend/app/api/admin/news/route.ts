import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

function requireAdmin(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  const d = verifyToken(auth.substring(7));
  if (!d || d.role !== 'admin') return null;
  return d;
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders() });
}

export async function GET(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  // для blogs: prisma.blogPost.findMany(...)
  // для news: prisma.newsArticle.findMany(...)
  const items = await prisma.newsArticle.findMany({ orderBy: { sort: 'asc' } });
  return NextResponse.json({ data: items }, { headers: corsHeaders() });
}

export async function DELETE(req: NextRequest) {
  if (!requireAdmin(req)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const { id } = await req.json();
  await prisma.newsArticle.delete({ where: { id } });
  return NextResponse.json({ success: true }, { headers: corsHeaders() });
}