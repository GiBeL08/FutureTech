import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
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

    const updatedPost = await prisma.post.update({
      where: { id },
      data: {
        shares: {
          increment: 1
        }
      }
    });

    return NextResponse.json({ shares: updatedPost.shares }, { headers: corsHeaders() });
  } catch (error) {
    console.error('Error sharing post:', error);
    return NextResponse.json(
      { error: 'Failed to share post' },
      { status: 500, headers: corsHeaders() }
    );
  }
}
