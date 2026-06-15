import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SimilarNewsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.similarNewsItem.findMany({ orderBy: { sort: 'asc' } });
  }
}
