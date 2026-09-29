module.exports = {
  RefreshSessionRequestBody: {
    type: 'object',
    required: ['refreshToken'],
    properties: {
      refreshToken: {
        type: 'string',
        description: 'JWT refresh token',
      },
    },
    additionalProperties: false,
  },
  RefreshSessionResponseBody: {
    type: 'object',
    required: ['accessToken', 'refreshToken'],
    properties: {
      accessToken: {
        type: 'string',
        description: 'JWT access token',
      },
      refreshToken: {
        type: 'string',
        description: 'JWT refresh token',
      },
    },
    additionalProperties: false,
  },
};
