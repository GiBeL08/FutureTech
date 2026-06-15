import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(type?: string) {
    let where = {};

    if (type === 'featured') {
      where = { featured: true };
    } else if (type === 'teasers') {
      where = { featured: false };
    } else if (type === 'headlines') {
      where = { headline: true };
    }

    const news = await this.prisma.newsArticle.findMany({
      where,
      orderBy: { sort: 'asc' },
    });

    return news.map((n) => ({
      id: n.id,
      slug: n.slug,
      title: n.title,
      desc: n.desc,
      category: n.category,
      image: n.image,
      date: n.date,
      readTime: n.readTime,
      author: {
        name: n.authorName,
        avatar: n.authorAvatar,
      },
    }));
  }

  findAllForAdmin() {
    return this.prisma.newsArticle.findMany({ orderBy: { sort: 'asc' } });
  }

  deleteById(id: number) {
    return this.prisma.newsArticle.delete({ where: { id } });
  }
}
