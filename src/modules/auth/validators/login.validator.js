const { checkSchema } = require('express-validator');

const { ERROR_MESSAGE: GENERIC_ERROR_MESSAGE } = require('@forge/forge-ws-common/constants');

const loginValidator = checkSchema({
  tenantId: {
    in: ['body'],
    isUUID: true,
    errorMessage: GENERIC_ERROR_MESSAGE.requiredMustBeType('tenantId', 'UUID'),
  },
  password: {
    in: ['body'],
    isString: {
      bail: true,
      errorMessage: GENERIC_ERROR_MESSAGE.requiredMustBeType('password', 'string'),
    },
    isLength: {
      options: {
        max: 250,
        min: 1,
      },
      bail: true,
      errorMessage: GENERIC_ERROR_MESSAGE.lengthTypeError('password', 1, 250, 'string'),
    },
  },
  email: {
    in: ['body'],
    isEmail: {
      bail: true,
      errorMessage: GENERIC_ERROR_MESSAGE.requiredMustBeType('email', 'email'),
    },
    isLength: {
      options: {
        max: 250,
        min: 1,
      },
      bail: true,
      errorMessage: GENERIC_ERROR_MESSAGE.lengthTypeError('email', 1, 250, 'string'),
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

module.exports = loginValidator;
