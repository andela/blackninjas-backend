require('dotenv').config();

module.exports.development = {
  url: process.env.DATABASE_URL_DEV,
  dialect: 'postgres',
  logging: false
};

module.exports.testing = {
  url: process.env.DATABASE_URL_TEST,
  dialect: 'postgres',
  logging: false
};

module.exports.production = {
  url: process.env.DATABASE_URL,
  dialect: 'postgresql',
  logging: false
};
