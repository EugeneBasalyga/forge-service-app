module.exports = {
  get: {
    tags: ['TrainingExercise'],
    operationId: 'trainingExercise.getTrainingExercises',
    summary: 'Get training session exercises',
    description:
      'Returns exercises of a current user training session sorted by createdAt (ascending).',
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: 'sessionId',
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
              $ref: '#/components/schemas/GetTrainingExercisesResponseBody',
            },
          },
        },
      },
      400: {
        description: 'Bad Request',
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
