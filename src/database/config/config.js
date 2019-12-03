require('dotenv').config();

module.exports = {
  "development": {
    "use_env_variable": "DATABASE_URL_DEV",
    "dialect": "postgres",
    "logging": true
  },
  "testing": {
    "use_env_variable": "DATABASE_URL_TEST",
    "dialect": "postgres",
    "logging": true
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgresql",
    "logging": false
  }
}

