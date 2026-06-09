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

export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders() });
}

// GET all posts
export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            email: true,
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
        likes: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(
      {
        data: posts.map((post) => ({
          ...post,
          likesCount: post.likes.length,
          commentsCount: post.comments.length,
        })),
      },
      { headers: corsHeaders() }
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500, headers: corsHeaders() }
    );
  }
}

// POST create new post
export async function POST(request: NextRequest) {
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

    const { title, content, image } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400, headers: corsHeaders() }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        image,
        authorId: decoded.userId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            email: true,
          },
        },
        comments: true,
        likes: true,
      },
    });

    return NextResponse.json(
      {
        data: {
          ...post,
          likesCount: post.likes.length,
          commentsCount: post.comments.length,
        },
      },
      { status: 201, headers: corsHeaders() }
    );
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500, headers: corsHeaders() }
    );
  }
}
