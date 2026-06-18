import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthUser } from '../config/constants';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateCommentDto, CreatePostDto } from './dto/posts.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll() {
    const data = await this.postsService.findAll();
    return { data };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreatePostDto, @CurrentUser() user: AuthUser) {
    const data = await this.postsService.create(dto, user.userId);
    return { data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.postsService.findOne(id);
    return { data };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  // ✅ ОБНОВЛЕННЫЙ МЕТОД - теперь передает роль в сервис
  delete(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.postsService.delete(id, user.userId, user.role);
  }

  @Get(':id/comments')
  async getComments(@Param('id') id: string) {
    const data = await this.postsService.getComments(id);
    return { data };
  }

  @Post(':id/comments')
  @UseGuards(JwtAuthGuard)
  async addComment(
    @Param('id') id: string,
    @Body() dto: CreateCommentDto,
    @CurrentUser() user: AuthUser,
  ) {
    const data = await this.postsService.addComment(id, user.userId, dto);
    return { data };
  }

  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  toggleLike(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.postsService.toggleLike(id, user.userId);
  }

  @Post(':id/likes')
  @UseGuards(JwtAuthGuard)
  toggleLikesAlias(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.postsService.toggleLike(id, user.userId);
  }

  @Post(':id/share')
  share(@Param('id') id: string) {
    return this.postsService.incrementShare(id);
  }
}