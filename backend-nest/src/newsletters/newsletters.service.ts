import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewslettersService {
  constructor(private readonly prisma: PrismaService) {}

  async subscribe(email: string) {
    const existing = await this.prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      return { email, alreadySubscribed: true as const, created: false };
    }

    const subscriber = await this.prisma.newsletterSubscriber.create({
      data: { email },
    });

    return {
      email: subscriber.email,
      alreadySubscribed: false as const,
      created: true,
    };
  }

  count() {
    return this.prisma.newsletterSubscriber.count();
  }

  findAllForAdmin() {
    return this.prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
