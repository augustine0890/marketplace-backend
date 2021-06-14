import app from './app';
import auth from './auth';
import redis from './redis';
import settings from './settings';

export const config = [app, auth, redis, settings];

// @TODO: Replace this w\ configService??
export default app();
export * from './app';
export * from './auth';
export * from './redis';
export * from './settings';
