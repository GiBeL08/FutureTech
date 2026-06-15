import { Body, Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { IsInt } from 'class-validator';
import { AdminGuard } from '../common/guards/admin.guard';
import { BlogService } from '../blog/blog.service';

class DeleteByIdDto {
  @IsInt()
  id!: number;
}

@Controller('admin/blogs')
export class AdminBlogsController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  @UseGuards(AdminGuard)
  async findAll() {
    const data = await this.blogService.findAllForAdmin();
    return { data };
  }

  @Delete()
  @UseGuards(AdminGuard)
  async delete(@Body() dto: DeleteByIdDto) {
    await this.blogService.deleteById(dto.id);
    return { success: true };
  }
}
