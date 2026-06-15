import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboard() {
    const [
      totalUsers,
      totalPosts,
      totalComments,
      totalBlogs,
      totalNews,
      totalPodcasts,
      totalSubscribers,
      totalMessages,
      recentUsers,
      recentPosts,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.post.count(),
      this.prisma.comment.count(),
      this.prisma.blogPost.count(),
      this.prisma.newsArticle.count(),
      this.prisma.podcastEpisode.count(),
      this.prisma.newsletterSubscriber.count(),
      this.prisma.contactMessage.count(),
      this.prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      }),
      this.prisma.post.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          author: { select: { name: true } },
          _count: { select: { likes: true, comments: true } },
        },
      }),
    ]);

    return {
      stats: {
        totalUsers,
        totalPosts,
        totalComments,
        totalBlogs,
        totalNews,
        totalPodcasts,
        totalSubscribers,
        totalMessages,
      },
      recentUsers,
      recentPosts,
    };
  }
}
