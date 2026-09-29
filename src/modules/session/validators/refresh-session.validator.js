const { checkSchema } = require('express-validator');

const { ERROR_MESSAGE: GENERIC_ERROR_MESSAGE } = require('@forge/forge-ws-common/constants');

const refreshSessionValidator = checkSchema({
  refreshToken: {
    in: ['body'],
    isString: {
      bail: true,
      errorMessage: GENERIC_ERROR_MESSAGE.requiredMustBeType('refreshToken', 'string'),
    },
    isLength: {
      options: {
        max: 1000,
        min: 1,
      },
      bail: true,
      errorMessage: GENERIC_ERROR_MESSAGE.lengthTypeError('refreshToken', 1, 1000, 'string'),
    },
  },
  locale: {
    in: ['headers'],
    isString: {
      bail: true,
      errorMessage: GENERIC_ERROR_MESSAGE.mustBeType('locale', 'string'),
    },
    optional: true,
    isLength: {
      options: {
        max: 250,
        min: 1,
      },
      bail: true,
      errorMessage: GENERIC_ERROR_MESSAGE.lengthTypeError('locale', 1, 250, 'string'),
    },
  },
  'device-id': {
    in: ['headers'],
    isString: {
      bail: true,
      errorMessage: GENERIC_ERROR_MESSAGE.mustBeType('device-id', 'string'),
    },
    optional: true,
    isLength: {
      options: {
        max: 250,
        min: 1,
      },
      bail: true,
      errorMessage: GENERIC_ERROR_MESSAGE.lengthTypeError('device-id', 1, 250, 'string'),
    },
  },
});

module.exports = refreshSessionValidator;
