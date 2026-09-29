const { generateUUID } = require('@forge/forge-ws-common/utils/generator.util');

const { ROLE } = require('./constants');
const { mapChatMessageTOToChatMessageVO } = require('./mappers/chat-message.mapper');
const {
  mapCreateChatMessageVOToCreateChatMessageTO,
} = require('./mappers/create-chat-message.mapper');

// How many of the latest messages the coach sees as the conversation context
const CONTEXT_MESSAGES_LIMIT = 20;

class ChatMessageService {
  constructor(repository, { coachProvider }) {
    this.repository = repository;
    this.coachProvider = coachProvider;
  }

  async getChatMessages(getChatMessagesParamsVO) {
    const chatMessageTOs = await this.repository.chatMessage.findChatMessagesByUserId({
      tenantId: getChatMessagesParamsVO.tenantId,
      userId: getChatMessagesParamsVO.userId,
    });

    return chatMessageTOs.map(mapChatMessageTOToChatMessageVO);
  }

  // Saves the user message, streams the coach reply through onChunk and saves the reply once
  // it is complete. Generation doesn't depend on the client connection, so the history stays
  // consistent even if the client disconnects mid-stream
  async sendChatMessage(sendChatMessageParamsVO, { onChunk }) {
    const { tenantId, userId, content } = sendChatMessageParamsVO;

    // Read before saving the new message and append it explicitly, so it is always the last
    // context message even when another request of the same user saves one in between
    const historyChatMessageTOs = await this.repository.chatMessage.findLatestChatMessagesByUserId({
      tenantId,
      userId,
      limit: CONTEXT_MESSAGES_LIMIT - 1,
    });

    const userChatMessageTO = await this.repository.chatMessage.createChatMessage(
      mapCreateChatMessageVOToCreateChatMessageTO({
        tenantId,
        userId,
        content,
        role: ROLE.USER,
        createdBy: userId,
        updatedBy: userId,
      })
    );

    // Known before the first chunk, so the client can collect the chunks into one message
    const coachChatMessageId = generateUUID();

    const coachContent = await this.coachProvider.streamReply({
      messages: [...historyChatMessageTOs, userChatMessageTO].map(mapChatMessageTOToChatMessageVO),
      onChunk: (chunk) => onChunk({ messageId: coachChatMessageId, chunk }),
    });

    const coachChatMessageTO = await this.repository.chatMessage.createChatMessage(
      mapCreateChatMessageVOToCreateChatMessageTO({
        id: coachChatMessageId,
        tenantId,
        userId,
        content: coachContent,
        role: ROLE.COACH,
      })
    );

    return mapChatMessageTOToChatMessageVO(coachChatMessageTO);
  }
}

module.exports = ChatMessageService;
