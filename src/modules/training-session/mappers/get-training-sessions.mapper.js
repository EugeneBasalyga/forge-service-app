const { mapTrainingSessionVOToTrainingSessionResponse } = require('./training-session.mapper');

const mapGetTrainingSessionsRequestToGetTrainingSessionsParamsVO = (req) => ({
  tenantId: req.tenant.id,
  userId: req.user.id,
});

const mapTrainingSessionVOsToGetTrainingSessionsResponse = (trainingSessionVOs) =>
  trainingSessionVOs.map(mapTrainingSessionVOToTrainingSessionResponse);

module.exports = {
  mapGetTrainingSessionsRequestToGetTrainingSessionsParamsVO,
  mapTrainingSessionVOsToGetTrainingSessionsResponse,
};
