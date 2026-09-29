const BaseController = require('@forge/forge-ws-common/classes/base.controller');
const { ERROR_MESSAGE: GENERIC_ERROR_MESSAGE } = require('@forge/forge-ws-common/constants');
const { validationMiddleware } = require('@forge/forge-ws-common/middlewares');

const userAuthenticationMiddleware = require('../../middlewares/user-authentication.middleware');
const { createSseStream } = require('../../utils/sse.util');

const { STREAM_EVENT } = require('./constants');
const {
  mapGetChatMessagesRequestToGetChatMessagesParamsVO,
  mapChatMessageVOsToGetChatMessagesResponse,
} = require('./mappers/get-chat-messages.mapper');
const {
  mapSendChatMessageRequestToSendChatMessageParamsVO,
  mapChatMessageChunkVOToTextChunkEventData,
  mapChatMessageVOToMessageCompletedEventData,
} = require('./mappers/send-chat-message.mapper');
const { sendChatMessageValidator } = require('./validators');

class ChatMessageController extends BaseController {
  constructor(service) {
    super(service);

    this.getChatMessages = this.getChatMessages.bind(this);
    this.sendChatMessage = this.sendChatMessage.bind(this);

    this.router.get('/', userAuthenticationMiddleware(service), this.getChatMessages);

    this.router.post(
      '/',
      userAuthenticationMiddleware(service),
      validationMiddleware([sendChatMessageValidator]),
      this.sendChatMessage
    );
  }

  async getChatMessages(req, res, next) {
    try {
      const chatMessageVOs = await this.service.chatMessage.getChatMessages(
        mapGetChatMessagesRequestToGetChatMessagesParamsVO(req)
      );

      return res.status(200).json(mapChatMessageVOsToGetChatMessagesResponse(chatMessageVOs));
    } catch (e) {
      return next(e);
    }
  }

  async sendChatMessage(req, res, next) {
    const sseStream = createSseStream(res);

    try {
      const coachChatMessageVO = await this.service.chatMessage.sendChatMessage(
        mapSendChatMessageRequestToSendChatMessageParamsVO(req),
        {
          onChunk: (chatMessageChunkVO) =>
            sseStream.send(
              STREAM_EVENT.TEXT_CHUNK,
              mapChatMessageChunkVOToTextChunkEventData(chatMessageChunkVO)
            ),
        }
      );

      sseStream.send(
        STREAM_EVENT.MESSAGE_COMPLETED,
        mapChatMessageVOToMessageCompletedEventData(coachChatMessageVO)
      );

      return sseStream.end();
    } catch (e) {
      // Before the first event the response is still plain HTTP and gets a regular JSON error
      if (!res.headersSent) {
        return next(e);
      }

      sseStream.send(STREAM_EVENT.ERROR, { message: GENERIC_ERROR_MESSAGE.internalServerError() });

      return sseStream.end();
    }
  }
}

module.exports = ChatMessageController;
