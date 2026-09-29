const getTrainingExercisesPath = require('./get-training-exercises.path');

module.exports = {
  '/training-sessions/{sessionId}/exercises': {
    ...getTrainingExercisesPath,
  },
};
