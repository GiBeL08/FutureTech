import { Injectable, NotFoundException } from '@nestjs/common';
import { DEFAULT_BLOG_SLUG } from '../config/constants';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(category?: string) {
    const blogs = await this.prisma.blogPost.findMany({
      where:
        category && category !== 'All' ? { category } : undefined,
      orderBy: { sort: 'asc' },
    });

    return blogs.map((b) => ({
      id: b.id,
      slug: b.slug,
      category: b.category,
      title: b.title,
      desc: b.desc ?? '',
      date: b.publishedDate,
      author: {
        name: b.authorName,
        role: b.authorRole ?? '',
        avatar: b.authorAvatar ?? '',
      },
      metrics: {
        likes: b.likes,
        views: b.views,
      },
      tags: b.tags ? (JSON.parse(b.tags) as string[]) : [],
    }));
  }

  async findBySlug(slug: string) {
    let post = await this.prisma.blogPost.findUnique({ where: { slug } });

    if (!post) {
      post = await this.prisma.blogPost.findUnique({
        where: { slug: DEFAULT_BLOG_SLUG },
      });
    }

    if (!post) {
      throw new NotFoundException('Blog post not found');
    }

    return {
      slug: post.slug,
      title: post.title,
      heroImage: post.heroImage,
      category: post.category,
      publishedDate: post.publishedDate,
      readingTime: post.readingTime,
      authorName: post.authorName,
      likes: post.likes,
      views: post.views,
      shares: post.shares,
      introduction: post.introduction,
      sections: JSON.parse(post.sections) as {
        heading: string;
        paragraphs: string[];
      }[],
      relatedTopics: JSON.parse(post.relatedTopics) as string[],
    };
  }

  findAllForAdmin() {
    return this.prisma.blogPost.findMany({ orderBy: { sort: 'asc' } });
  }

  deleteById(id: number) {
    return this.prisma.blogPost.delete({ where: { id } });
  }
}
