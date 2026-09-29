module.exports = {
  SendChatMessageRequestBody: {
    type: 'object',
    required: ['content'],
    properties: {
      content: {
        type: 'string',
        description: 'Message text, 1-4000 characters after trimming',
      },
    },
    additionalProperties: false,
  },
  ChatMessageTextChunkEventData: {
    type: 'object',
    required: ['messageId', 'chunk'],
    properties: {
      messageId: {
        type: 'string',
        description: 'Id (UUID) of the coach message the chunk belongs to',
      },
      chunk: {
        type: 'string',
        description: 'Next piece of the reply text, to be appended as is',
      },
    },
    additionalProperties: false,
  },
  ChatMessageCompletedEventData: {
    type: 'object',
    required: ['messageId', 'message'],
    properties: {
      messageId: {
        type: 'string',
        description: 'Id (UUID) of the completed coach message',
      },
      message: {
        $ref: '#/components/schemas/ChatMessage',
      },
    },
    additionalProperties: false,
  },
};
