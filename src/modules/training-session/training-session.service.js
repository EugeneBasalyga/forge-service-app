const { ERROR_MESSAGE: GENERIC_ERROR_MESSAGE } = require('@forge/forge-ws-common/constants');
const ApiError = require('@forge/forge-ws-common/errors/api.error');

const { mapTrainingSessionTOToTrainingSessionVO } = require('./mappers/training-session.mapper');
const {
  mapTrainingSessionVOToUpdateTrainingSessionTO,
} = require('./mappers/update-training-session.mapper');

class TrainingSessionService {
  constructor(repository) {
    this.repository = repository;
  }

  async getTrainingSessions(getTrainingSessionsParamsVO) {
    const trainingSessionTOs = await this.repository.trainingSession.findTrainingSessionsByUserId({
      tenantId: getTrainingSessionsParamsVO.tenantId,
      userId: getTrainingSessionsParamsVO.userId,
    });

    return trainingSessionTOs.map(mapTrainingSessionTOToTrainingSessionVO);
  }

  async completeTrainingSession(completeTrainingSessionParamsVO) {
    const existingTrainingSessionTO =
      await this.repository.trainingSession.findTrainingSessionByParams({
        tenantId: completeTrainingSessionParamsVO.tenantId,
        userId: completeTrainingSessionParamsVO.userId,
        id: completeTrainingSessionParamsVO.id,
      });

    if (!existingTrainingSessionTO) {
      throw ApiError.NotFound({
        message: GENERIC_ERROR_MESSAGE.entityNotFoundBy(
          'TrainingSession',
          'id',
          completeTrainingSessionParamsVO.id
        ),
      });
    }

    const existingTrainingSessionVO =
      mapTrainingSessionTOToTrainingSessionVO(existingTrainingSessionTO);

    // Completion is idempotent: a repeated call keeps the first completedAt
    if (existingTrainingSessionVO.completedAt !== null) {
      return existingTrainingSessionVO;
    }

    const updateTrainingSessionTO = mapTrainingSessionVOToUpdateTrainingSessionTO({
      ...existingTrainingSessionVO,
      completedAt: Date.now(),
      updatedBy: completeTrainingSessionParamsVO.userId,
    });

    const updatedTrainingSessionTO = await this.repository.trainingSession.updateTrainingSession(
      updateTrainingSessionTO,
      {
        id: updateTrainingSessionTO.id,
        tenantId: updateTrainingSessionTO.tenantId,
      }
    );

    return mapTrainingSessionTOToTrainingSessionVO(updatedTrainingSessionTO);
  }
}

module.exports = TrainingSessionService;
