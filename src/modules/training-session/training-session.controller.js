const BaseController = require('@forge/forge-ws-common/classes/base.controller');
const { validationMiddleware } = require('@forge/forge-ws-common/middlewares');

const userAuthenticationMiddleware = require('../../middlewares/user-authentication.middleware');

const {
  mapCompleteTrainingSessionRequestToCompleteTrainingSessionParamsVO,
  mapTrainingSessionVOToCompleteTrainingSessionResponse,
} = require('./mappers/complete-training-session.mapper');
const {
  mapGetTrainingSessionsRequestToGetTrainingSessionsParamsVO,
  mapTrainingSessionVOsToGetTrainingSessionsResponse,
} = require('./mappers/get-training-sessions.mapper');
const { completeTrainingSessionValidator } = require('./validators');

class TrainingSessionController extends BaseController {
  constructor(service) {
    super(service);

    this.getTrainingSessions = this.getTrainingSessions.bind(this);
    this.completeTrainingSession = this.completeTrainingSession.bind(this);

    this.router.get('/', userAuthenticationMiddleware(service), this.getTrainingSessions);

    this.router.post(
      '/:id/complete',
      userAuthenticationMiddleware(service),
      validationMiddleware([completeTrainingSessionValidator]),
      this.completeTrainingSession
    );
  }

  async getTrainingSessions(req, res, next) {
    try {
      const trainingSessionVOs = await this.service.trainingSession.getTrainingSessions(
        mapGetTrainingSessionsRequestToGetTrainingSessionsParamsVO(req)
      );

      return res
        .status(200)
        .json(mapTrainingSessionVOsToGetTrainingSessionsResponse(trainingSessionVOs));
    } catch (e) {
      return next(e);
    }
  }

  async completeTrainingSession(req, res, next) {
    try {
      const trainingSessionVO = await this.service.trainingSession.completeTrainingSession(
        mapCompleteTrainingSessionRequestToCompleteTrainingSessionParamsVO(req)
      );

      return res
        .status(200)
        .json(mapTrainingSessionVOToCompleteTrainingSessionResponse(trainingSessionVO));
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = TrainingSessionController;
