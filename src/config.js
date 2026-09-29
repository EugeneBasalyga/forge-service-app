// const path = require('node:path');

const { getEnvVariable } = require('@forge/forge-ws-common/utils/config.util');

// Uncomment code below to use environment variables from .env file in service root folder
// require('dotenv').config({
//   path: path.join(__dirname, '../.env'),
// });

const config = {
  port: getEnvVariable('SERVICE_PORT', { defaultValue: 1111 }),
  version: getEnvVariable('SERVICE_VERSION', { defaultValue: 1 }),
  domainUrl: getEnvVariable('SERVICE_DOMAIN_URL', { isRequired: true }),
  connectionString: getEnvVariable('DB_CONNECTION_STRING', { isRequired: true }),
  jwt: {
    accessTokenSecret: getEnvVariable('SERVICE_JWT_ACCESS_TOKEN_SECRET', { isRequired: true }),
    accessTokenExpiresIn: getEnvVariable('SERVICE_JWT_ACCESS_TOKEN_EXPIRES_IN', {
      defaultValue: 3600,
    }),
    refreshTokenSecret: getEnvVariable('SERVICE_JWT_REFRESH_TOKEN_SECRET', { isRequired: true }),
    refreshTokenExpiresIn: getEnvVariable('SERVICE_JWT_REFRESH_TOKEN_EXPIRES_IN', {
      defaultValue: 2592000,
    }),
  },
};

module.exports = config;
