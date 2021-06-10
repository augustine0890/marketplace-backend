import app from './app';
import auth from './auth';

export const config = [app, auth];

export default app();
export * from './app';
export * from './auth';
