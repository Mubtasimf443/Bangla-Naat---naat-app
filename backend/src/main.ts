// بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ صلى الله عليه وسلم InshaAllah


import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Bangla Naat App API')
    .setDescription(
      'REST API + WebSocket notifications for the Bangla Naat React Native app.\n\n' +
        '**WebSocket:** connect with socket.io to the `/notifications` namespace and listen to ' +
        '`naat:created`, `naat:updated` and `naat:deleted` events.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const port = process.env.PORT ?? 3000;
  const APP_URL = process.env.APP_URL ?? `http://localhost:${port}`;
  await app.listen(port);
  console.log(`API running on ${APP_URL}/api`);
  console.log(`Swagger docs on ${APP_URL}/api/docs`);
}
bootstrap();
