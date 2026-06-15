import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { NewsletterDto } from '../contacts/dto/contact.dto';
import { NewslettersService } from './newsletters.service';

@Controller('newsletter')
export class NewslettersController {
  constructor(private readonly newslettersService: NewslettersService) {}

  @Post()
  async subscribe(
    @Body() dto: NewsletterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.newslettersService.subscribe(dto.email);
    if (result.created) {
      res.status(201);
    }
    return {
      success: true,
      data: {
        email: result.email,
        alreadySubscribed: result.alreadySubscribed,
      },
    };
  }

  @Get()
  async count() {
    const count = await this.newslettersService.count();
    return { success: true, data: { count } };
  }
}
