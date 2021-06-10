import { registerAs } from '@nestjs/config';

export enum Environment {
  Local = 'localhost',
  Development = 'development',
  Production = 'production',
}

export interface AppEnv {
  name: string;
  nodeEnv: Environment;
  appEnv: Environment;
  service: string;
  port: number;
}

export const app = (): AppEnv => ({
  // app
  name: process.env.APP_NAME || 'MARKETPLACE API V1.0',
  nodeEnv: (process.env.APP_ENV || 'production') as Environment,
  appEnv: (process.env.APP_ENV || 'production') as Environment,
  service: process.env.SERVICE_NAME || 'marketplace',

  // api
  port: +process.env.PORT || 3000,
});

export default registerAs('app', app);
