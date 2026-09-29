const completeTrainingSessionPath = require('./complete-training-session.path');
const getTrainingSessionsPath = require('./get-training-sessions.path');

module.exports = {
  '/training-sessions': {
    ...getTrainingSessionsPath,
  },
  '/training-sessions/{id}/complete': {
    ...completeTrainingSessionPath,
  },
};
