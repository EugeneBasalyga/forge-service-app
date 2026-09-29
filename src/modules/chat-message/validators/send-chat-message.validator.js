const { checkSchema } = require('express-validator');

const { ERROR_MESSAGE: GENERIC_ERROR_MESSAGE } = require('@forge/forge-ws-common/constants');

const sendChatMessageValidator = checkSchema({
  content: {
    in: ['body'],
    isString: {
      bail: true,
      errorMessage: GENERIC_ERROR_MESSAGE.requiredMustBeType('content', 'string'),
    },
    trim: true,
    isLength: {
      options: {
        max: 4000,
        min: 1,
      },
      bail: true,
      errorMessage: GENERIC_ERROR_MESSAGE.lengthTypeError('content', 1, 4000, 'string'),
    },
  },
});

module.exports = sendChatMessageValidator;
