module.exports = {
  post: {
    tags: ['Auth'],
    operationId: 'auth.logout',
    summary: 'Logout',
    security: [
      {
        bearerAuth: [],
      },
    ],
    responses: {
      204: {
        description: 'No Content',
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
