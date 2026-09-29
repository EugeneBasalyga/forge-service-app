const BaseController = require('@forge/forge-ws-common/classes/base.controller');
const { validationMiddleware } = require('@forge/forge-ws-common/middlewares');

const userAuthenticationMiddleware = require('../../middlewares/user-authentication.middleware');

const {
  mapLoginRequestToLoginParamsVO,
  mapTokenPairToLoginResponse,
} = require('./mappers/login.mapper');
const { mapLogoutRequestToLogoutParamsVO } = require('./mappers/logout.mapper');
const { loginValidator } = require('./validators');

class AuthController extends BaseController {
  constructor(service) {
    super(service);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.router.post('/login', validationMiddleware([loginValidator]), this.login);

    this.router.post('/logout', userAuthenticationMiddleware(service), this.logout);
  }

  async login(req, res, next) {
    try {
      const tokenPair = await this.service.auth.login(mapLoginRequestToLoginParamsVO(req));

      return res.status(200).json(mapTokenPairToLoginResponse(tokenPair));
    } catch (e) {
      return next(e);
    }
  }

  async logout(req, res, next) {
    try {
      await this.service.auth.logout(mapLogoutRequestToLogoutParamsVO(req));

      return res.sendStatus(204);
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = AuthController;
