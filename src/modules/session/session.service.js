const { ERROR_MESSAGE: GENERIC_ERROR_MESSAGE } = require('@forge/forge-ws-common/constants');
const ApiError = require('@forge/forge-ws-common/errors/api.error');

const JwtService = require('../../utils/jwt.util');

const { mapSessionTOToSessionVO } = require('./mappers/session.mapper');
const { mapSessionVOToUpdateSessionTO } = require('./mappers/update-session.mapper');

class SessionService {
  constructor(repository) {
    this.repository = repository;
  }

  async refreshSession(refreshSessionVO) {
    const existingSessionTO = await this.repository.session.findSessionByParams({
      tenantId: refreshSessionVO.tenantId,
      refreshToken: refreshSessionVO.refreshToken,
    });

    if (!existingSessionTO) {
      throw ApiError.BadRequest({
        message: GENERIC_ERROR_MESSAGE.invalidEntityProvided('refreshToken'),
      });
    }

    if (existingSessionTO.refreshTokenExpires < Date.now()) {
      this.repository.session.deleteSessionById({
        id: existingSessionTO.id,
        tenantId: existingSessionTO.tenantId,
      });

      throw ApiError.BadRequest({
        message: GENERIC_ERROR_MESSAGE.invalidEntityProvided('refreshToken'),
      });
    }

    const { accessToken, refreshToken, accessTokenExpires, refreshTokenExpires } =
      JwtService.generateTokens({
        tenantId: existingSessionTO.tenantId,
        userId: existingSessionTO.userId,
      });

    const existingSessionVO = mapSessionTOToSessionVO(existingSessionTO);

    const updateSessionTO = mapSessionVOToUpdateSessionTO({
      ...existingSessionVO,
      accessToken,
      refreshToken,
      accessTokenExpires,
      refreshTokenExpires,
      deviceId: refreshSessionVO.deviceId,
      locale: refreshSessionVO.locale,
      updatedBy: existingSessionVO.userId,
    });

    const updatedSessionTO = await this.repository.session.updateSession(updateSessionTO, {
      id: updateSessionTO.id,
      tenantId: updateSessionTO.tenantId,
    });
    const updatedSessionVO = mapSessionTOToSessionVO(updatedSessionTO);

    return updatedSessionVO;
  }
}

module.exports = SessionService;
