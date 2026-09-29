const BaseController = require('@forge/forge-ws-common/classes/base.controller');
const { validationMiddleware } = require('@forge/forge-ws-common/middlewares');

const {
  mapRefreshSessionRequestToRefreshSessionVO,
  mapSessionVOToRefreshSessionResponse,
} = require('./mappers/refresh-session.mapper');
const { refreshSessionValidator } = require('./validators');

class SessionController extends BaseController {
  constructor(service) {
    super(service);

    this.refreshSession = this.refreshSession.bind(this);

    this.router.post(
      '/refresh',
      validationMiddleware([refreshSessionValidator]),
      this.refreshSession
    );
  }

  async refreshSession(req, res, next) {
    try {
      const sessionVO = await this.service.session.refreshSession(
        mapRefreshSessionRequestToRefreshSessionVO(req)
      );

      return res.status(200).json(mapSessionVOToRefreshSessionResponse(sessionVO));
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = SessionController;
