import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit, { Options } from 'express-rate-limit';
import { ValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  // Security Middlewares
  app.use(helmet());
  app.enableCors();

  const rateLimitOptions: Partial<Options> = {
    windowMs: 15 * 60 * 1000,
    max: 100,
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
