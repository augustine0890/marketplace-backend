import { ConfigService } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { IsNumber, validateSync } from 'class-validator';
import { IsString } from 'class-validator';
import { AppEnv } from './app';
import { AuthEnv } from './auth';
import { RedisEnv } from './redis';
import { SettingsEnv } from './settings';

export class EnviromentVars {
  // APP
  //  REDIS
  @IsString()
  REDIS_HOST: string;
  @IsNumber()
  REDIS_PORT: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnviromentVars, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

export function getConfig(configService: ConfigService) {
  const app = configService.get<AppEnv>('app');
  const auth = configService.get<AuthEnv>('auth');
  const redis = configService.get<RedisEnv>('redis');
  const setting = configService.get<SettingsEnv>('settings');
  return {
    app,
    auth,
    redis,
    setting,
  };
}
