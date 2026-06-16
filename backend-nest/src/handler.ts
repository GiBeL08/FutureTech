import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { Request, Response } from 'express';
import { INestApplication } from '@nestjs/common';

let app: INestApplication | undefined;

async function createApp(): Promise<INestApplication> {
  const nestApp = await NestFactory.create(AppModule);

  nestApp.setGlobalPrefix('api');
  nestApp.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });
  nestApp.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  nestApp.useGlobalFilters(new HttpExceptionFilter());

  await nestApp.init();
  return nestApp;
}

export default async (req: Request, res: Response) => {
  if (!app) {
    app = await createApp();
  }
  await app.getHttpAdapter().getInstance()(req, res);
};