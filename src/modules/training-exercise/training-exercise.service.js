const { ERROR_MESSAGE: GENERIC_ERROR_MESSAGE } = require('@forge/forge-ws-common/constants');
const ApiError = require('@forge/forge-ws-common/errors/api.error');

const { mapTrainingExerciseTOToTrainingExerciseVO } = require('./mappers/training-exercise.mapper');

class TrainingExerciseService {
  constructor(repository) {
    this.repository = repository;
  }

  async getTrainingExercises(getTrainingExercisesParamsVO) {
    // Exercises are only visible to the owner of their training session
    const trainingSessionTO = await this.repository.trainingSession.findTrainingSessionByParams({
      tenantId: getTrainingExercisesParamsVO.tenantId,
      userId: getTrainingExercisesParamsVO.userId,
      id: getTrainingExercisesParamsVO.sessionId,
    });

    if (!trainingSessionTO) {
      throw ApiError.NotFound({
        message: GENERIC_ERROR_MESSAGE.entityNotFoundBy(
          'TrainingSession',
          'id',
          getTrainingExercisesParamsVO.sessionId
        ),
      });
    }

    const trainingExerciseTOs =
      await this.repository.trainingExercise.findTrainingExercisesBySessionId({
        tenantId: trainingSessionTO.tenantId,
        sessionId: trainingSessionTO.id,
      });

    return trainingExerciseTOs.map(mapTrainingExerciseTOToTrainingExerciseVO);
  }
}

module.exports = TrainingExerciseService;
