import { Controller, Get, Param, Query } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async findAll(@Query('category') category?: string) {
    const data = await this.blogService.findAll(category);
    return { success: true, data };
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    const data = await this.blogService.findBySlug(slug);
    return { success: true, data };
  }
}
