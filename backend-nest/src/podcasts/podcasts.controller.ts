import { Controller, Get, Query } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';

@Controller('podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Get()
  async findAll(@Query('type') type?: string) {
    const data = await this.podcastsService.findAll(type);
    return { success: true, data };
  }
}
