import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { ContactsModule } from './contacts/contacts.module';
import { FaqsModule } from './faqs/faqs.module';
import { NewsModule } from './news/news.module';
import { NewslettersModule } from './newsletters/newsletters.module';
import { PodcastsModule } from './podcasts/podcasts.module';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { ResourcesModule } from './resources/resources.module';
import { SimilarNewsModule } from './similar-news/similar-news.module';
import { StatsModule } from './stats/stats.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { UsersModule } from './users/users.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    PostsModule,
    BlogModule,
    NewsModule,
    VideosModule,
    PodcastsModule,
    ResourcesModule,
    TestimonialsModule,
    FaqsModule,
    SimilarNewsModule,
    StatsModule,
    ContactsModule,
    NewslettersModule,
    AdminModule,
  ],
})
export class AppModule {}
