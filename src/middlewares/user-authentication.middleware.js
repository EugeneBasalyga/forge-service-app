const bearerToken = require('express-bearer-token');

const ApiError = require('@forge/forge-ws-common/errors/api.error');

const { STATUS: USER_STATUS } = require('../modules/user/constants');
const JwtService = require('../utils/jwt.util');

// Must run after tenantSetupHandler, which sets req.tenant
const userAuthenticationMiddleware = (service) => {
  const validateUserAuthentication = async (req, __res, next) => {
    const { token } = req;

    if (!token) {
      return next(ApiError.Unauthorized());
    }

    let decodedToken;

    try {
      decodedToken = JwtService.verifyAccessToken(token);
    } catch {
      return next(ApiError.Unauthorized());
    }

    if (!decodedToken?.tenantId || decodedToken.tenantId !== req.tenant?.id) {
      return next(ApiError.Unauthorized());
    }

    try {
      const userVO = await service.user.getUserByAccessToken({
        tenantId: decodedToken.tenantId,
        accessToken: token,
      });

      if (userVO.status !== USER_STATUS.ACTIVE && userVO.status !== USER_STATUS.INACTIVE) {
        return next(ApiError.Unauthorized());
      }

      req.user = userVO;

      return next();
    } catch {
      return next(ApiError.Unauthorized());
    }
  };

  return [
    bearerToken({
      headerKey: 'Bearer',
    }),
    validateUserAuthentication,
  ];
};

module.exports = userAuthenticationMiddleware;
