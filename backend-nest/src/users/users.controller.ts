import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthUser } from '../config/constants';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';

@Controller('users/profile')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: AuthUser) {
    const profile = await this.usersService.getProfile(user.userId);
    if (!profile) {
      throw new NotFoundException('User not found');
    }

    return {
      data: {
        ...profile,
        posts: profile.posts.map((post) => ({
          id: post.id,
          title: post.title,
          content: post.content,
          image: post.image,
          shares: post.shares,
          createdAt: post.createdAt,
          likesCount: post.likes.length,
          commentsCount: post.comments.length,
        })),
      },
    };
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @CurrentUser() user: AuthUser,
    @Body() dto: UpdateProfileDto,
  ) {
    const updated = await this.usersService.updateProfile(user.userId, dto);
    return { data: updated };
  }
}
