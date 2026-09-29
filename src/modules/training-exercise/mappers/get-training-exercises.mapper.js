const { mapTrainingExerciseVOToTrainingExerciseResponse } = require('./training-exercise.mapper');

const mapGetTrainingExercisesRequestToGetTrainingExercisesParamsVO = (req) => ({
  tenantId: req.tenant.id,
  userId: req.user.id,
  sessionId: req.params.sessionId,
});

const mapTrainingExerciseVOsToGetTrainingExercisesResponse = (trainingExerciseVOs) =>
  trainingExerciseVOs.map(mapTrainingExerciseVOToTrainingExerciseResponse);

module.exports = {
  mapGetTrainingExercisesRequestToGetTrainingExercisesParamsVO,
  mapTrainingExerciseVOsToGetTrainingExercisesResponse,
};
