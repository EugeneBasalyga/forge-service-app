module.exports = {
  post: {
    tags: ['TrainingSession'],
    operationId: 'trainingSession.completeTrainingSession',
    summary: 'Complete training session',
    description:
      'Sets completedAt of the current user training session. Sessions are completed in order: only the first session by order with no completedAt can be completed. Idempotent: an already completed session is returned unchanged.',
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: 'id',
        in: 'path',
        required: true,
        schema: {
          type: 'string',
        },
        description: 'Training session id (UUID)',
      },
    ],
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CompleteTrainingSessionResponseBody',
            },
          },
        },
      },
      400: {
        description:
          'Bad Request: invalid id, or the session is locked (code trainingSessionLocked)',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/BadRequestError',
            },
          },
        },
      },
      401: {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UnauthorizedError',
            },
          },
        },
      },
      404: {
        description: 'Not Found',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/NotFoundError',
            },
          },
        },
      },
      500: {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/InternalServerError',
            },
          },
        },
      },
    },
  },
};
