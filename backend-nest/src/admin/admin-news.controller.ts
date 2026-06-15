import { Body, Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { IsInt } from 'class-validator';
import { AdminGuard } from '../common/guards/admin.guard';
import { NewsService } from '../news/news.service';

class DeleteByIdDto {
  @IsInt()
  id!: number;
}

@Controller('admin/news')
export class AdminNewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @UseGuards(AdminGuard)
  async findAll() {
    const data = await this.newsService.findAllForAdmin();
    return { data };
  }

  @Delete()
  @UseGuards(AdminGuard)
  async delete(@Body() dto: DeleteByIdDto) {
    await this.newsService.deleteById(dto.id);
    return { success: true };
  }
}
