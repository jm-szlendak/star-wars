import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Character } from './modules/star-wars/model/character';
import { Planet } from './modules/star-wars/model/planet';
import { Episode } from './modules/star-wars/model/episode';

function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Star Wars API')
    .setDescription('REST API with Star Wars data')
    .setVersion('1')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    extraModels: [Character, Planet, Episode]
  });
  SwaggerModule.setup('api/docs', app, document)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  setupSwagger(app)
  await app.listen(process.env.PORT);
}

bootstrap();
