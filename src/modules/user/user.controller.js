const BaseController = require('@forge/forge-ws-common/classes/base.controller');

const userAuthenticationMiddleware = require('../../middlewares/user-authentication.middleware');

const { mapUserVOToGetCurrentUserResponse } = require('./mappers/get-current-user.mapper');

class UserController extends BaseController {
  constructor(service) {
    super(service);

    this.getCurrentUser = this.getCurrentUser.bind(this);

    this.router.get('/current', userAuthenticationMiddleware(service), this.getCurrentUser);
  }

  // eslint-disable-next-line class-methods-use-this
  getCurrentUser(req, res, _next) {
    return res.status(200).json(mapUserVOToGetCurrentUserResponse(req.user));
  }
}

module.exports = UserController;
