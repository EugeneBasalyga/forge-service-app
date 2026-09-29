module.exports = {
  TrainingExercise: {
    type: 'object',
    required: [
      'id',
      'tenantId',
      'sessionId',
      'title',
      'description',
      'createdBy',
      'updatedBy',
      'createdAt',
      'updatedAt',
      'version',
    ],
    properties: {
      id: {
        type: 'string',
        description: 'Training exercise id (UUID)',
      },
      tenantId: {
        type: 'string',
        description: 'Tenant id (UUID)',
      },
      sessionId: {
        type: 'string',
        description: 'Training session id (UUID)',
      },
      title: {
        type: 'string',
        description: 'Title',
      },
      description: {
        type: ['string', 'null'],
        description: 'Description',
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
