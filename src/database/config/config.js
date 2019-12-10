import { config } from 'dotenv';

config();

export const development = {
  use_env_variable: 'DATABASE_URL_DEV',
  dialect: 'postgres',
  logging: false
};
export const testing = {
  use_env_variable: 'DATABASE_URL_TEST',
  dialect: 'postgres',
  logging: false
};
export const production = {
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgresql',
  logging: false
};
