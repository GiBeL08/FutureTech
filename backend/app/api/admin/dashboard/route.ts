import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders() });
}

export async function GET(request: NextRequest) {
  const auth = request.headers.get('authorization');
  if (!auth?.startsWith('Bearer ')) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const decoded = verifyToken(auth.substring(7));
  if (!decoded || decoded.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const [
    totalUsers, totalPosts, totalComments,
    totalBlogs, totalNews, totalPodcasts,
    totalSubscribers, totalMessages, recentUsers, recentPosts,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.post.count(),
    prisma.comment.count(),
    prisma.blogPost.count(),
    prisma.newsArticle.count(),
    prisma.podcastEpisode.count(),
    prisma.newsletterSubscriber.count(),
    prisma.contactMessage.count(),
    prisma.user.findMany({
      take: 5, orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    }),
    prisma.post.findMany({
      take: 5, orderBy: { createdAt: 'desc' },
      include: { author: { select: { name: true } }, _count: { select: { likes: true, comments: true } } },
    }),
  ]);

  return NextResponse.json({
    data: {
      stats: { totalUsers, totalPosts, totalComments, totalBlogs, totalNews, totalPodcasts, totalSubscribers, totalMessages },
      recentUsers,
      recentPosts,
    },
  }, { headers: corsHeaders() });
}
