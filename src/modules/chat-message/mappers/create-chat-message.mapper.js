const { generateUUID } = require('@forge/forge-ws-common/utils/generator.util');

const mapCreateChatMessageVOToCreateChatMessageTO = (chatMessageVO) => ({
  id: chatMessageVO.id ?? generateUUID(),
  tenantId: chatMessageVO.tenantId,
  userId: chatMessageVO.userId,
  content: chatMessageVO.content,
  role: chatMessageVO.role,
  createdBy: chatMessageVO.createdBy ?? null,
  updatedBy: chatMessageVO.updatedBy ?? null,
});

module.exports = {
  mapCreateChatMessageVOToCreateChatMessageTO,
};
