import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders() });
}

// POST like
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: corsHeaders() }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401, headers: corsHeaders() }
      );
    }

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id: params.id },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404, headers: corsHeaders() }
      );
    }

    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        authorId_postId: {
          authorId: decoded.userId,
          postId: params.id,
        },
      },
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: {
          authorId_postId: {
            authorId: decoded.userId,
            postId: params.id,
          },
        },
      });
      return NextResponse.json(
        { liked: false },
        { headers: corsHeaders() }
      );
    }

    // Like
    await prisma.like.create({
      data: {
        authorId: decoded.userId,
        postId: params.id,
      },
    });

    return NextResponse.json(
      { liked: true },
      { headers: corsHeaders() }
    );
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json(
      { error: 'Failed to toggle like' },
      { status: 500, headers: corsHeaders() }
    );
  }
}
