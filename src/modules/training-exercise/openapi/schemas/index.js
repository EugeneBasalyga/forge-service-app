const getTrainingExercisesSchemas = require('./get-training-exercises.schema');
const trainingExerciseSchemas = require('./training-exercise.schema');

module.exports = {
  ...trainingExerciseSchemas,
  ...getTrainingExercisesSchemas,
};
