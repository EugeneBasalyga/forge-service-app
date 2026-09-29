const chatMessageSchemas = require('./chat-message.schema');
const getChatMessagesSchemas = require('./get-chat-messages.schema');
const sendChatMessageSchemas = require('./send-chat-message.schema');

module.exports = {
  ...chatMessageSchemas,
  ...getChatMessagesSchemas,
  ...sendChatMessageSchemas,
};
