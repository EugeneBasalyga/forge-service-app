const { mapTrainingSessionVOToTrainingSessionResponse } = require('./training-session.mapper');

const mapCompleteTrainingSessionRequestToCompleteTrainingSessionParamsVO = (req) => ({
  tenantId: req.tenant.id,
  userId: req.user.id,
  id: req.params.id,
});

const mapTrainingSessionVOToCompleteTrainingSessionResponse = (trainingSessionVO) => ({
  ...mapTrainingSessionVOToTrainingSessionResponse(trainingSessionVO),
});

module.exports = {
  mapCompleteTrainingSessionRequestToCompleteTrainingSessionParamsVO,
  mapTrainingSessionVOToCompleteTrainingSessionResponse,
};
