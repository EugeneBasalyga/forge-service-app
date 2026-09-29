const { checkSchema } = require('express-validator');

const { ERROR_MESSAGE: GENERIC_ERROR_MESSAGE } = require('@forge/forge-ws-common/constants');

const getTrainingExercisesValidator = checkSchema({
  sessionId: {
    in: ['params'],
    isUUID: {
      bail: true,
      errorMessage: GENERIC_ERROR_MESSAGE.requiredMustBeType('sessionId', 'UUID'),
    },
  },
});

module.exports = getTrainingExercisesValidator;
