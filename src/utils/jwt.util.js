const jwt = require('jsonwebtoken');

const { generateUUID } = require('@forge/forge-ws-common/utils/generator.util');

const config = require('../config');

// Expiration values in config are in seconds
const generateTokens = ({ tenantId, userId }) => {
  const now = Date.now();

  const accessTokenExpiresIn = parseInt(config.jwt.accessTokenExpiresIn, 10);
  const refreshTokenExpiresIn = parseInt(config.jwt.refreshTokenExpiresIn, 10);

  // jwtid keeps tokens unique when several sessions are created within the same second
  const accessToken = jwt.sign({ tenantId, userId }, config.jwt.accessTokenSecret, {
    expiresIn: accessTokenExpiresIn,
    jwtid: generateUUID(),
  });

  const refreshToken = jwt.sign({ tenantId, userId }, config.jwt.refreshTokenSecret, {
    expiresIn: refreshTokenExpiresIn,
    jwtid: generateUUID(),
  });

  return {
    accessToken,
    accessTokenExpires: now + accessTokenExpiresIn * 1000,
    refreshToken,
    refreshTokenExpires: now + refreshTokenExpiresIn * 1000,
  };
};

const verifyAccessToken = (token) => jwt.verify(token, config.jwt.accessTokenSecret);

module.exports = {
  generateTokens,
  verifyAccessToken,
};
