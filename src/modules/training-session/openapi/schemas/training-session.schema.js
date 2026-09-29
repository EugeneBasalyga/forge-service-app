module.exports = {
  TrainingSession: {
    type: 'object',
    required: [
      'id',
      'tenantId',
      'userId',
      'order',
      'title',
      'description',
      'duration',
      'completedAt',
      'createdBy',
      'updatedBy',
      'createdAt',
      'updatedAt',
      'version',
    ],
    properties: {
      id: {
        type: 'string',
        description: 'Training session id (UUID)',
      },
      tenantId: {
        type: 'string',
        description: 'Tenant id (UUID)',
      },
      userId: {
        type: 'string',
        description: 'Owner user id (UUID)',
      },
      order: {
        type: 'number',
        description: 'Position of the session in the user program (ascending)',
      },
      title: {
        type: 'string',
        description: 'Title',
      },
      description: {
        type: ['string', 'null'],
        description: 'Description',
      },
      duration: {
        type: ['number', 'null'],
        description: 'Planned duration',
      },
      completedAt: {
        type: ['number', 'null'],
        description: 'Completion timestamp (ms), null until the session is completed',
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
