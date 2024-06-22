import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UnknownExceptionsFilter } from 'src/common/exception-filters/unknown-exceptions.filter';

async function bootstrap() {
  const logger = new Logger('bootstrap');

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
      'Slash Order Management System API for e-commerce mobile app',
    )
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Local Development Server')
    .setExternalDoc(
      'GitHub',
      'https://github.com/Relin404/slash-assessment/blob/dev/README.md',
    )
    .setContact(
      "Ahmad Mash'aal",
      'https://www.linkedin.com/in/relin404/',
      undefined,
    )
    .addTag('Auth', 'Endpoints for authentication')
    .addTag('Users', 'Endpoints for user management')
    .addTag('Cart', 'Endpoints for cart management')
    .addTag('Products', 'Endpoints for product management')
    .addTag('Orders', 'Endpoints for order management')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api/docs', app, swaggerDocument);

  const port = configService.get<number>('PORT');
  await app.listen(port);
  logger.log(
    `Swagger documentation is available at http://localhost:${port}/api/docs`,
  );
  logger.log(`Application is running on port ${port}`);
}

bootstrap();
