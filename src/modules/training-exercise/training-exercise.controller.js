const BaseController = require('@forge/forge-ws-common/classes/base.controller');
const { validationMiddleware } = require('@forge/forge-ws-common/middlewares');

const userAuthenticationMiddleware = require('../../middlewares/user-authentication.middleware');

const {
  mapGetTrainingExercisesRequestToGetTrainingExercisesParamsVO,
  mapTrainingExerciseVOsToGetTrainingExercisesResponse,
} = require('./mappers/get-training-exercises.mapper');
const { getTrainingExercisesValidator } = require('./validators');

// Mounted under /training-sessions/:sessionId/exercises, so params are merged from the parent
class TrainingExerciseController extends BaseController {
  constructor(service) {
    super(service, true);

    this.getTrainingExercises = this.getTrainingExercises.bind(this);

    this.router.get(
      '/',
      userAuthenticationMiddleware(service),
      validationMiddleware([getTrainingExercisesValidator]),
      this.getTrainingExercises
    );
  }

  async getTrainingExercises(req, res, next) {
    try {
      const trainingExerciseVOs = await this.service.trainingExercise.getTrainingExercises(
        mapGetTrainingExercisesRequestToGetTrainingExercisesParamsVO(req)
      );

      return res
        .status(200)
        .json(mapTrainingExerciseVOsToGetTrainingExercisesResponse(trainingExerciseVOs));
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = TrainingExerciseController;
