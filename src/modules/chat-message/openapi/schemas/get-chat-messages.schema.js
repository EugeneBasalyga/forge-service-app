module.exports = {
  GetChatMessagesResponseBody: {
    type: 'object',
    required: ['messages'],
    properties: {
      messages: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/ChatMessage',
        },
      },
    },
    additionalProperties: false,
  },
};
