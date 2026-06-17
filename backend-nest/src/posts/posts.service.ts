import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto, CreatePostDto } from './dto/posts.dto';

const authorSelect = {
  id: true,
  name: true,
  avatar: true,
  email: true,
} as const;

const postInclude = {
  author: { select: authorSelect },
  comments: {
    include: {
      author: { select: { id: true, name: true, avatar: true } },
    },
  },
  likes: true,
} as const;

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  private mapPost(post: {
    likes: unknown[];
    comments: unknown[];
    [key: string]: unknown;
  }) {
    return {
      ...post,
      likesCount: post.likes.length,
      commentsCount: post.comments.length,
    };
  }

  async findAll() {
    const posts = await this.prisma.post.findMany({
      include: postInclude,
      orderBy: { createdAt: 'desc' },
    });
    return posts.map((post) => this.mapPost(post));
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: authorSelect },
        comments: {
          include: {
            author: { select: { id: true, name: true, avatar: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
        likes: true,
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.mapPost(post);
  }

  async create(dto: CreatePostDto, authorId: string) {
    const post = await this.prisma.post.create({
      data: {
        title: dto.title,
        content: dto.content,
        image: dto.image,
        authorId,
      },
      include: postInclude,
    });
    return this.mapPost(post);
  }

  // Обычное удаление пользователем своего поста
  async delete(id: string, authorId: string) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.authorId !== authorId) {
      throw new ForbiddenException('You can only delete your own posts');
    }
    await this.prisma.post.delete({ where: { id } });
    return { success: true };
  }

  // Административное удаление (без проверки на автора)
  async deleteByAdmin(id: string) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    await this.prisma.post.delete({ where: { id } });
    return { success: true };
  }

  async getComments(postId: string) {
    await this.ensurePostExists(postId);
    return this.prisma.comment.findMany({
      where: { postId },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async addComment(postId: string, authorId: string, dto: CreateCommentDto) {
    await this.ensurePostExists(postId);
    return this.prisma.comment.create({
      data: {
        text: dto.text,
        postId,
        authorId,
      },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
      },
    });
  }

  async toggleLike(postId: string, authorId: string) {
    await this.ensurePostExists(postId);

    const existingLike = await this.prisma.like.findUnique({
      where: { authorId_postId: { authorId, postId } },
    });

    if (existingLike) {
      await this.prisma.like.delete({ where: { id: existingLike.id } });
      return { liked: false };
    }

    await this.prisma.like.create({ data: { authorId, postId } });
    return { liked: true };
  }

  async incrementShare(postId: string) {
    await this.ensurePostExists(postId);
    const post = await this.prisma.post.update({
      where: { id: postId },
      data: { shares: { increment: 1 } },
    });
    return { shares: post.shares };
  }

  private async ensurePostExists(id: string) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }
}