import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders() });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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

    const { id } = await params;

    const post = await prisma.post.findUnique({
      where: { id }
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404, headers: corsHeaders() }
      );
    }

    // Check if user already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        authorId_postId: {
          authorId: decoded.userId,
          postId: id
        }
      }
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: { id: existingLike.id }
      });
      return NextResponse.json({ liked: false }, { headers: corsHeaders() });
    } else {
      // Like
      await prisma.like.create({
        data: {
          authorId: decoded.userId,
          postId: id
        }
      });
      return NextResponse.json({ liked: true }, { headers: corsHeaders() });
    }
  } catch (error: any) {
    console.error('Error toggling like:', error);
    return NextResponse.json(
      { error: 'Failed to toggle like', details: error.message },
      { status: 500, headers: corsHeaders() }
    );
  }
}
