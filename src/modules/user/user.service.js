const { ERROR_MESSAGE: GENERIC_ERROR_MESSAGE } = require('@forge/forge-ws-common/constants');
const ApiError = require('@forge/forge-ws-common/errors/api.error');

const { mapUserTOToUserVO } = require('./mappers/user.mapper');

class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  async getUserByAccessToken(getUserByAccessTokenParamsVO) {
    const sessionTO = await this.repository.session.findSessionByParams({
      tenantId: getUserByAccessTokenParamsVO.tenantId,
      accessToken: getUserByAccessTokenParamsVO.accessToken,
    });

    if (!sessionTO || sessionTO.accessTokenExpires < Date.now()) {
      throw ApiError.NotFound({
        message: GENERIC_ERROR_MESSAGE.entityNotFoundBy(
          'Session',
          'accessToken',
          getUserByAccessTokenParamsVO.accessToken
        ),
      });
    }

    const userTO = await this.repository.user.findUserById({
      id: sessionTO.userId,
      tenantId: sessionTO.tenantId,
    });

    if (!userTO) {
      this.repository.session.deleteSessionById({
        id: sessionTO.id,
        tenantId: sessionTO.tenantId,
      });

      throw ApiError.NotFound({
        message: GENERIC_ERROR_MESSAGE.entityNotFoundBy('User', 'id', sessionTO.userId),
      });
    }

    const userVO = mapUserTOToUserVO(userTO);

    return userVO;
  }
}

module.exports = UserService;
