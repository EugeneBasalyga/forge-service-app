const TABLE_CONFIG = {
  TABLE_NAME: 'auth_Session',
  COLUMNS: [
    'id',
    'tenantId',
    'userId',
    'appKey',
    'deviceId',
    'locale',
    'accessToken',
    'accessTokenExpires',
    'refreshToken',
    'refreshTokenExpires',
  ],
};

module.exports = TABLE_CONFIG;
