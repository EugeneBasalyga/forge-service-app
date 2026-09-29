const bcrypt = require('bcryptjs');

const { ERROR_MESSAGE: GENERIC_ERROR_MESSAGE } = require('@forge/forge-ws-common/constants');
const ApiError = require('@forge/forge-ws-common/errors/api.error');

const JwtService = require('../../utils/jwt.util');
const { mapCreateSessionVOToCreateSessionTO } = require('../session/mappers/create-session.mapper');
const { mapSessionTOToSessionVO } = require('../session/mappers/session.mapper');
const { STATUS: USER_STATUS } = require('../user/constants');
const { mapUserTOToUserVO } = require('../user/mappers/user.mapper');

const { ERROR_MESSAGE, ERROR_CODE } = require('./constants');

class AuthService {
  constructor(repository) {
    this.repository = repository;
  }

  async login(loginParamsVO) {
    const existingUserTO = await this.repository.user.findUserByEmail({
      tenantId: loginParamsVO.tenantId,
      email: loginParamsVO.email,
    });

    const userVO = existingUserTO ? mapUserTOToUserVO(existingUserTO) : null;

    const isStatusValid =
      userVO?.status === USER_STATUS.ACTIVE || userVO?.status === USER_STATUS.INACTIVE;

    const isPasswordEqual =
      isStatusValid && !!userVO.password
        ? await bcrypt.compare(loginParamsVO.password, userVO.password)
        : false;

    if (!isPasswordEqual) {
      // Throw unified error for any error case to not expose user existence data to API consumers
      throw ApiError.BadRequest({
        message: ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD,
        code: ERROR_CODE.INVALID_EMAIL_OR_PASSWORD,
      });
    }

    await this.repository.session.deleteUserExpiredSessions({
      tenantId: userVO.tenantId,
      userId: userVO.id,
    });
    if (loginParamsVO.deviceId) {
      await this.repository.session.deleteSessionsByUserIdAndDeviceId({
        tenantId: userVO.tenantId,
        userId: userVO.id,
        deviceId: loginParamsVO.deviceId,
      });
    }

    const createdSessionVO = await this.#generateSession(userVO, {
      deviceId: loginParamsVO.deviceId,
      locale: loginParamsVO.locale,
    });

    return {
      accessToken: createdSessionVO.accessToken,
      refreshToken: createdSessionVO.refreshToken,
    };
  }

  async logout(logoutParamsVO) {
    const sessionTO = await this.repository.session.findSessionByParams({
      tenantId: logoutParamsVO.tenantId,
      accessToken: logoutParamsVO.accessToken,
    });

    if (!sessionTO) {
      throw ApiError.BadRequest({
        message: GENERIC_ERROR_MESSAGE.invalidEntityProvided('accessToken'),
      });
    }

    await this.repository.session.deleteSessionById({
      id: sessionTO.id,
      tenantId: sessionTO.tenantId,
    });
  }

  async #generateSession(userVO, { deviceId, locale }) {
    const { accessToken, refreshToken, accessTokenExpires, refreshTokenExpires } =
      JwtService.generateTokens({
        tenantId: userVO.tenantId,
        userId: userVO.id,
      });

    const createSessionTO = mapCreateSessionVOToCreateSessionTO({
      tenantId: userVO.tenantId,
      userId: userVO.id,
      deviceId,
      locale,
      accessToken,
      accessTokenExpires,
      refreshToken,
      refreshTokenExpires,
      createdBy: userVO.id,
      updatedBy: userVO.id,
    });

    const createdSessionTO = await this.repository.session.createSession(createSessionTO);
    const createdSessionVO = mapSessionTOToSessionVO(createdSessionTO);

    return createdSessionVO;
  }
}

module.exports = AuthService;
