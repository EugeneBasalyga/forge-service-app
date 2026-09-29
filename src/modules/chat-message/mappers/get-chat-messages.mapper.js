const { mapChatMessageVOToChatMessageResponse } = require('./chat-message.mapper');

const mapGetChatMessagesRequestToGetChatMessagesParamsVO = (req) => ({
  tenantId: req.tenant.id,
  userId: req.user.id,
});

const mapChatMessageVOsToGetChatMessagesResponse = (chatMessageVOs) => ({
  messages: chatMessageVOs.map(mapChatMessageVOToChatMessageResponse),
});

module.exports = {
  mapGetChatMessagesRequestToGetChatMessagesParamsVO,
  mapChatMessageVOsToGetChatMessagesResponse,
};
