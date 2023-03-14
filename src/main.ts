import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  const PORT = process.env.PORT || 3560;

  const swaggerConfig = new DocumentBuilder()
    .setTitle('QCase open api')
    .setDescription('QCase API for pet application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => {
    console.log('APP LISTEN PORT: ', PORT);
  });
}

bootstrap();
