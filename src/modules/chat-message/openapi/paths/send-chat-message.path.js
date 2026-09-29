module.exports = {
  post: {
    tags: ['ChatMessage'],
    operationId: 'chatMessage.sendChatMessage',
    summary: 'Send chat message',
    description: [
      'Saves the user message and streams the coach reply as Server-Sent Events (text/event-stream).',
      'Events: `text_chunk` (data: ChatMessageTextChunkEventData) for every piece of the reply,',
      'then `message_completed` (data: ChatMessageCompletedEventData) once the reply is saved.',
      'A failure after the stream has started is sent as an `error` event (data: InternalServerError)',
      'and closes the stream. Validation and auth errors are regular JSON responses.',
    ].join(' '),
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/SendChatMessageRequestBody',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Coach reply stream',
        content: {
          'text/event-stream': {
            schema: {
              type: 'string',
            },
            example:
              'event: text_chunk\ndata: {"messageId":"11111111-1111-4111-8111-111111111111","chunk":"Great question! "}\n\nevent: message_completed\ndata: {"messageId":"11111111-1111-4111-8111-111111111111","message":{...}}\n\n',
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
