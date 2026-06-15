import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}

  findByPage(page = 'home') {
    return this.prisma.siteStat.findMany({
      where: { page },
      orderBy: { sort: 'asc' },
    });
  }

  findAllStats() {
    return this.prisma.siteStat.findMany({ orderBy: { sort: 'asc' } });
  }

  updateStat(id: number, data: { value?: string; label?: string }) {
    return this.prisma.siteStat.update({
      where: { id },
      data: {
        ...(data.value !== undefined && { value: data.value }),
        ...(data.label !== undefined && { label: data.label }),
      },
    });
  }
}
