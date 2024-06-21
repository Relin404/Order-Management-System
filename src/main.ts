import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UnknownExceptionsFilter } from 'src/common/exception-filters/unknown-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.setGlobalPrefix('api');

  app.useGlobalFilters(new UnknownExceptionsFilter(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Slash Assessment API')
    .setDescription(
      'Slash API for  cart management. This API is built using NestJS and uses Swagger for documentation.',
    )
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Local development server')
    .addTag('Auth', 'Endpoints for authentication')
    .addTag('Users', 'Endpoints for user management')
    .addTag('Cart', 'Endpoints for cart management')
    .addTag('Products', 'Endpoints for product management')
    .addTag('Orders', 'Endpoints for order management')
    .addTag('Public', 'Endpoints that are public')
    .addTag('Protected', 'Endpoints that are protected')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api/docs', app, swaggerDocument);

  const port = configService.get<number>('PORT');
  await app.listen(port);
}

bootstrap();
