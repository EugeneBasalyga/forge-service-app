const { generateUUID } = require('@forge/forge-ws-common/utils/generator.util');

const mapCreateSessionVOToCreateSessionTO = (sessionVO) => ({
  id: sessionVO.id ?? generateUUID(),
  tenantId: sessionVO.tenantId,
  userId: sessionVO.userId,
  appKey: sessionVO.appKey ?? null,
  deviceId: sessionVO.deviceId ?? null,
  locale: sessionVO.locale ?? null,
  accessToken: sessionVO.accessToken,
  accessTokenExpires: sessionVO.accessTokenExpires,
  refreshToken: sessionVO.refreshToken,
  refreshTokenExpires: sessionVO.refreshTokenExpires,
  createdBy: sessionVO.createdBy ?? null,
  updatedBy: sessionVO.updatedBy ?? null,
});

module.exports = {
  mapCreateSessionVOToCreateSessionTO,
};
