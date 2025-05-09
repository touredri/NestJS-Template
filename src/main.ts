import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit, { Options } from 'express-rate-limit';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });

  // --- Swagger Setup ---
  const config = new DocumentBuilder()
    .setTitle('NestJS template API')
    .setDescription(
      'Documentation des endpoints de l’API NestJS template avec Auth module gerer par JWT',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Entrez votre token JWT ici',
      },
      'access-token', // nom de la security dans swagger
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // On monte Swagger à l’URL /api/docs
  SwaggerModule.setup('api/docs', app, document);
  // --- Fin Swagger Setup ---

  // Security Middlewares
  app.use(helmet());
  app.enableCors();

  const rateLimitOptions: Partial<Options> = {
    windowMs: 15 * 60 * 1000,
    max: 100,
  };

  app.use(rateLimit(rateLimitOptions));

  // Global Validation Pipe
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
});

// nest start --builder swc --watch
