import { registerAs } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SettingsEnv {}
export const settings = (): SettingsEnv => ({});
export default registerAs('settings', settings);
