import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ResourcesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(tab?: string) {
    const highlights = await this.prisma.resourceHighlight.findMany({
      orderBy: { sort: 'asc' },
    });

    const resources = await this.prisma.resource.findMany({
      where: tab && tab !== 'All' ? { tab } : undefined,
      orderBy: { sort: 'asc' },
    });

    return {
      highlights,
      resources: resources.map((r) => ({
        ...r,
        meta: r.meta ? JSON.parse(r.meta) : [],
      })),
    };
  }
}
