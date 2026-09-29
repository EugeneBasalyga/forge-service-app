const { normalizeEmail } = require('validator');

const mapLoginRequestToLoginParamsVO = (req) => ({
  tenantId: req.tenant.id,
  email: normalizeEmail(req.body.email),
  password: req.body.password,
  deviceId: req.headers['device-id'],
  locale: req.headers.locale,
});

const mapTokenPairToLoginResponse = (tokenPair) => ({
  accessToken: tokenPair.accessToken,
  refreshToken: tokenPair.refreshToken,
});

module.exports = {
  mapLoginRequestToLoginParamsVO,
  mapTokenPairToLoginResponse,
};
