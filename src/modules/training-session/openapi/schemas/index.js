const completeTrainingSessionSchemas = require('./complete-training-session.schema');
const getTrainingSessionsSchemas = require('./get-training-sessions.schema');
const trainingSessionSchemas = require('./training-session.schema');

module.exports = {
  ...trainingSessionSchemas,
  ...getTrainingSessionsSchemas,
  ...completeTrainingSessionSchemas,
};
