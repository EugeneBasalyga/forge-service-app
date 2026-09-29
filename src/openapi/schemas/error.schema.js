module.exports = {
  BadRequestError: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
      },
      code: {
        type: 'number',
      },
      errors: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: { type: 'string' },
            value: { type: 'string' },
            msg: { type: 'string' },
            path: { type: 'string' },
            location: { type: 'string' },
          },
          required: ['type', 'value', 'msg', 'path', 'location'],
          additionalProperties: false,
        },
      },
    },
    required: ['message'],
    additionalProperties: false,
  },
  UnauthorizedError: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
      },
      code: {
        type: 'number',
      },
    },
    required: ['message'],
    additionalProperties: false,
  },
  NotFoundError: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
      },
      code: {
        type: 'number',
      },
    },
    required: ['message'],
    additionalProperties: false,
  },
  InternalServerError: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
      },
      code: {
        type: 'number',
      },
    },
    required: ['message'],
    additionalProperties: false,
  },
};
