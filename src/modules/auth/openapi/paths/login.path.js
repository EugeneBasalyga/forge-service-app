module.exports = {
  post: {
    tags: ['Auth'],
    operationId: 'auth.login',
    summary: 'Login',
    parameters: [
      {
        name: 'device-id',
        in: 'header',
        schema: {
          type: 'string',
        },
        description: 'Session device id',
      },
      {
        name: 'locale',
        in: 'header',
        schema: {
          type: 'string',
        },
        description: 'Session locale',
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/LoginRequestBody',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginResponseBody',
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
