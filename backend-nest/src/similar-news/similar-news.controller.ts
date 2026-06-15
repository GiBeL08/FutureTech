import { Controller, Get } from '@nestjs/common';
import { SimilarNewsService } from './similar-news.service';

@Controller('similar-news')
export class SimilarNewsController {
  constructor(private readonly similarNewsService: SimilarNewsService) {}

  @Get()
  async findAll() {
    const data = await this.similarNewsService.findAll();
    return { success: true, data };
  }
}
