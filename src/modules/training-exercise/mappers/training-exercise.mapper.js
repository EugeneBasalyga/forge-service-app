const mapTrainingExerciseTOToTrainingExerciseVO = (trainingExerciseTO) => ({
  id: trainingExerciseTO.id,
  tenantId: trainingExerciseTO.tenantId,
  sessionId: trainingExerciseTO.sessionId,
  title: trainingExerciseTO.title,
  description: trainingExerciseTO.description,
  createdBy: trainingExerciseTO.createdBy,
  updatedBy: trainingExerciseTO.updatedBy,
  createdAt: trainingExerciseTO.createdAt,
  updatedAt: trainingExerciseTO.updatedAt,
  version: trainingExerciseTO.version,
});

const mapTrainingExerciseVOToTrainingExerciseResponse = (trainingExerciseVO) => ({
  id: trainingExerciseVO.id,
  tenantId: trainingExerciseVO.tenantId,
  sessionId: trainingExerciseVO.sessionId,
  title: trainingExerciseVO.title,
  description: trainingExerciseVO.description,
  createdBy: trainingExerciseVO.createdBy,
  updatedBy: trainingExerciseVO.updatedBy,
  createdAt: trainingExerciseVO.createdAt,
  updatedAt: trainingExerciseVO.updatedAt,
  version: trainingExerciseVO.version,
});

module.exports = {
  mapTrainingExerciseTOToTrainingExerciseVO,
  mapTrainingExerciseVOToTrainingExerciseResponse,
};
