import { Module } from '@nestjs/common';
import { SimilarNewsController } from './similar-news.controller';
import { SimilarNewsService } from './similar-news.service';

@Module({
  controllers: [SimilarNewsController],
  providers: [SimilarNewsService],
})
export class SimilarNewsModule {}
