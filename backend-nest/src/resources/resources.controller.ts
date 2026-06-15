import { Controller, Get, Query } from '@nestjs/common';
import { ResourcesService } from './resources.service';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  async findAll(@Query('tab') tab?: string) {
    const data = await this.resourcesService.findAll(tab);
    return { success: true, data };
  }
}
