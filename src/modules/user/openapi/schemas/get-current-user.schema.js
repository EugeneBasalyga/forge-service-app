const { STATUS } = require('../../constants');

module.exports = {
  GetCurrentUserResponseBody: {
    type: 'object',
    required: [
      'id',
      'tenantId',
      'email',
      'status',
      'createdBy',
      'updatedBy',
      'createdAt',
      'updatedAt',
      'version',
    ],
    properties: {
      id: {
        type: 'string',
        description: 'User id (UUID)',
      },
      tenantId: {
        type: 'string',
        description: 'User tenant id (UUID)',
      },
      email: {
        type: 'string',
        description: 'User email',
      },
      status: {
        type: 'string',
        enum: Object.values(STATUS),
        description: 'User status',
      },
      createdBy: {
        type: ['string', 'null'],
        description: 'Created by',
      },
      updatedBy: {
        type: ['string', 'null'],
        description: 'Updated by',
      },
      createdAt: {
        type: 'number',
        description: 'Created at',
      },
      updatedAt: {
        type: 'number',
        description: 'Updated at',
      },
      version: {
        type: 'number',
        description: 'Version',
      },
    },
    additionalProperties: false,
  },
};
