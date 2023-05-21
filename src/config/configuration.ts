import { resolve } from 'path';
import { config } from 'dotenv';
import { IConfig } from './config.interface';

config({ path: resolve(__dirname, '../../.env') });

const createConfig = (): IConfig => ({
  env: process.env.ENV || 'local',
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  apiKey: process.env.VALID_API_KEY,
});

export const CONFIG = createConfig();

export default createConfig;
