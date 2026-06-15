import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PodcastsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(type?: string) {
    if (type === 'shows') {
      return this.prisma.podcastShow.findMany({ orderBy: { sort: 'asc' } });
    }

    if (type === 'featured') {
      const featured = await this.prisma.podcastEpisode.findMany({
        where: { featured: true },
        orderBy: { sort: 'asc' },
      });
      return featured.map((e) => ({
        ...e,
        tags: e.tags ? JSON.parse(e.tags) : [],
      }));
    }

    return this.prisma.podcastEpisode.findMany({
      where: { featured: false },
      orderBy: { sort: 'asc' },
    });
  }
}
