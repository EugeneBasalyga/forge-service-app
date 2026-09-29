module.exports = {
  ChatMessage: {
    type: 'object',
    required: [
      'id',
      'tenantId',
      'userId',
      'content',
      'role',
      'createdBy',
      'updatedBy',
      'createdAt',
      'updatedAt',
      'version',
    ],
    properties: {
      id: {
        type: 'string',
        description: 'Chat message id (UUID)',
      },
      tenantId: {
        type: 'string',
        description: 'Tenant id (UUID)',
      },
      userId: {
        type: 'string',
        description: 'Owner user id (UUID). Coach replies belong to the user they answer',
      },
      content: {
        type: 'string',
        description: 'Plain text, no markdown',
      },
      role: {
        type: 'string',
        enum: ['user', 'coach'],
        description: 'Author of the message',
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
