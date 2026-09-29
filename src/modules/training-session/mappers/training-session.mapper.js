const mapTrainingSessionTOToTrainingSessionVO = (trainingSessionTO) => ({
  id: trainingSessionTO.id,
  tenantId: trainingSessionTO.tenantId,
  userId: trainingSessionTO.userId,
  order: trainingSessionTO.order,
  title: trainingSessionTO.title,
  description: trainingSessionTO.description,
  duration: trainingSessionTO.duration,
  completedAt: trainingSessionTO.completedAt,
  createdBy: trainingSessionTO.createdBy,
  updatedBy: trainingSessionTO.updatedBy,
  createdAt: trainingSessionTO.createdAt,
  updatedAt: trainingSessionTO.updatedAt,
  version: trainingSessionTO.version,
});

const mapTrainingSessionVOToTrainingSessionResponse = (trainingSessionVO) => ({
  id: trainingSessionVO.id,
  tenantId: trainingSessionVO.tenantId,
  userId: trainingSessionVO.userId,
  order: trainingSessionVO.order,
  title: trainingSessionVO.title,
  description: trainingSessionVO.description,
  duration: trainingSessionVO.duration,
  completedAt: trainingSessionVO.completedAt,
  createdBy: trainingSessionVO.createdBy,
  updatedBy: trainingSessionVO.updatedBy,
  createdAt: trainingSessionVO.createdAt,
  updatedAt: trainingSessionVO.updatedAt,
  version: trainingSessionVO.version,
});

module.exports = {
  mapTrainingSessionTOToTrainingSessionVO,
  mapTrainingSessionVOToTrainingSessionResponse,
};
