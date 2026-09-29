const mapTrainingSessionVOToUpdateTrainingSessionTO = (trainingSessionVO) => ({
  id: trainingSessionVO.id,
  tenantId: trainingSessionVO.tenantId,
  userId: trainingSessionVO.userId,
  order: trainingSessionVO.order,
  title: trainingSessionVO.title,
  description: trainingSessionVO.description ?? null,
  duration: trainingSessionVO.duration ?? null,
  completedAt: trainingSessionVO.completedAt ?? null,
  createdBy: trainingSessionVO.createdBy ?? null,
  updatedBy: trainingSessionVO.updatedBy ?? null,
  createdAt: trainingSessionVO.createdAt,
  updatedAt: trainingSessionVO.updatedAt,
  version: trainingSessionVO.version,
});

module.exports = {
  mapTrainingSessionVOToUpdateTrainingSessionTO,
};
