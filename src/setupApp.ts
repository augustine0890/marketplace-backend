import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppEnv } from './config';

export const setupApp = (app: INestApplication): AppEnv => {
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppEnv>('app');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.use(cookieParser());

  const options = new DocumentBuilder()
    .setTitle('MarketPlace API Server')
    .setDescription('Game NFTs Marketplace')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  return appConfig;
};
