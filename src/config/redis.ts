import { registerAs } from '@nestjs/config';

export interface RedisEnv {
  host: string;
  port: number;
  cacheTTL: number;
}
export const redis = (): RedisEnv => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: +process.env.REDIS_PORT || 6379,
  cacheTTL: +process.env.CACHE_TTL || 7890000,
});
export default registerAs('redis', redis);
