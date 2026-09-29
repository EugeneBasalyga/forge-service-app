module.exports = {
  LoginRequestBody: {
    type: 'object',
    required: ['tenantId', 'password', 'email'],
    properties: {
      tenantId: {
        type: 'string',
        description: 'Tenant id (UUID)',
      },
      password: {
        type: 'string',
        description: 'User password',
      },
      email: {
        type: 'string',
        description: 'User email',
      },
    },
    additionalProperties: false,
  },
  LoginResponseBody: {
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
