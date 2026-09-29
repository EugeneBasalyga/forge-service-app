const { checkSchema } = require('express-validator');

const { ERROR_MESSAGE: GENERIC_ERROR_MESSAGE } = require('@forge/forge-ws-common/constants');

const completeTrainingSessionValidator = checkSchema({
  id: {
    in: ['params'],
    isUUID: {
      bail: true,
      errorMessage: GENERIC_ERROR_MESSAGE.requiredMustBeType('id', 'UUID'),
    },
  },
});

module.exports = completeTrainingSessionValidator;
