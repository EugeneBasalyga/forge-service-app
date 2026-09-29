const mapChatMessageTOToChatMessageVO = (chatMessageTO) => ({
  id: chatMessageTO.id,
  tenantId: chatMessageTO.tenantId,
  userId: chatMessageTO.userId,
  content: chatMessageTO.content,
  role: chatMessageTO.role,
  createdBy: chatMessageTO.createdBy,
  updatedBy: chatMessageTO.updatedBy,
  createdAt: chatMessageTO.createdAt,
  updatedAt: chatMessageTO.updatedAt,
  version: chatMessageTO.version,
});

const mapChatMessageVOToChatMessageResponse = (chatMessageVO) => ({
  id: chatMessageVO.id,
  tenantId: chatMessageVO.tenantId,
  userId: chatMessageVO.userId,
  content: chatMessageVO.content,
  role: chatMessageVO.role,
  createdBy: chatMessageVO.createdBy,
  updatedBy: chatMessageVO.updatedBy,
  createdAt: chatMessageVO.createdAt,
  updatedAt: chatMessageVO.updatedAt,
  version: chatMessageVO.version,
});

module.exports = {
  mapChatMessageTOToChatMessageVO,
  mapChatMessageVOToChatMessageResponse,
};
