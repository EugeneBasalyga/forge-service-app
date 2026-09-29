const getChatMessagesPath = require('./get-chat-messages.path');
const sendChatMessagePath = require('./send-chat-message.path');

module.exports = {
  '/chat/messages': {
    ...getChatMessagesPath,
    ...sendChatMessagePath,
  },
};
