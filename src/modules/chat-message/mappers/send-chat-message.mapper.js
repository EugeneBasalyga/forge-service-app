const { mapChatMessageVOToChatMessageResponse } = require('./chat-message.mapper');

const mapSendChatMessageRequestToSendChatMessageParamsVO = (req) => ({
  tenantId: req.tenant.id,
  userId: req.user.id,
  content: req.body.content,
});

const mapChatMessageChunkVOToTextChunkEventData = (chatMessageChunkVO) => ({
  messageId: chatMessageChunkVO.messageId,
  chunk: chatMessageChunkVO.chunk,
});

const mapChatMessageVOToMessageCompletedEventData = (chatMessageVO) => ({
  messageId: chatMessageVO.id,
  message: mapChatMessageVOToChatMessageResponse(chatMessageVO),
});

module.exports = {
  mapSendChatMessageRequestToSendChatMessageParamsVO,
  mapChatMessageChunkVOToTextChunkEventData,
  mapChatMessageVOToMessageCompletedEventData,
};
