import { Module } from '@nestjs/common';
import { BlogModule } from '../blog/blog.module';
import { ContactsModule } from '../contacts/contacts.module';
import { NewsModule } from '../news/news.module';
import { NewslettersModule } from '../newsletters/newsletters.module';
import { PostsModule } from '../posts/posts.module';
import { StatsModule } from '../stats/stats.module';
import { UsersModule } from '../users/users.module';
import { AdminBlogsController } from './admin-blogs.controller';
import { AdminDashboardController } from './admin-dashboard.controller';
import { AdminMessagesController } from './admin-messages.controller';
import { AdminNewsController } from './admin-news.controller';
import { AdminPostsController } from './admin-posts.controller';
import { AdminSettingsController } from './admin-settings.controller';
import { AdminUsersController } from './admin-users.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    UsersModule,
    BlogModule,
    PostsModule,
    NewsModule,
    StatsModule,
    NewslettersModule,
    ContactsModule,
  ],
  controllers: [
    AdminDashboardController,
    AdminUsersController,
    AdminNewsController,
    AdminBlogsController,
    AdminPostsController,
    AdminSettingsController,
    AdminMessagesController,
  ],
  providers: [AdminService],
})
export class AdminModule {}