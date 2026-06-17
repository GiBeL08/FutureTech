import { Controller, Delete, Get, UseGuards, Body } from '@nestjs/common';
import { AdminGuard } from '../common/guards/admin.guard';
import { PostsService } from '../posts/posts.service';
import { DeletePostDto } from '../posts/dto/posts.dto';

@Controller('admin/posts')
export class AdminPostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @UseGuards(AdminGuard)
  async findAll() {
    const data = await this.postsService.findAll();
    return { data };
  }

  @Delete()
  @UseGuards(AdminGuard)
  async delete(@Body() dto: DeletePostDto) {
    return await this.postsService.deleteByAdmin(dto.id);
  }
}