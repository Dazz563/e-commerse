import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const cookisSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.use(cookisSession({
    keys: ['sdjide34343']
  }))

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
