import { Controller, Get, Query } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  async findAll(@Query('page') page = 'home') {
    const data = await this.statsService.findByPage(page);
    return { success: true, data };
  }
}
