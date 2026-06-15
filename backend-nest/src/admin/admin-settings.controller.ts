import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { AdminGuard } from '../common/guards/admin.guard';
import { NewslettersService } from '../newsletters/newsletters.service';
import { StatsService } from '../stats/stats.service';

class UpdateSiteStatDto {
  @IsInt()
  id!: number;

  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  @IsString()
  label?: string;
}

@Controller('admin/settings')
export class AdminSettingsController {
  constructor(
    private readonly statsService: StatsService,
    private readonly newslettersService: NewslettersService,
  ) {}

  @Get()
  @UseGuards(AdminGuard)
  async getSettings() {
    const [stats, subscribers] = await Promise.all([
      this.statsService.findAllStats(),
      this.newslettersService.findAllForAdmin(),
    ]);
    return { data: { stats, subscribers } };
  }

  @Post()
  @UseGuards(AdminGuard)
  async updateStat(@Body() dto: UpdateSiteStatDto) {
    const data = await this.statsService.updateStat(dto.id, {
      value: dto.value,
      label: dto.label,
    });
    return { data };
  }
}
