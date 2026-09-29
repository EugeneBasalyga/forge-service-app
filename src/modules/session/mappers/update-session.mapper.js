const mapSessionVOToUpdateSessionTO = (sessionVO) => ({
  id: sessionVO.id,
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
  createdAt: sessionVO.createdAt,
  updatedAt: sessionVO.updatedAt,
  version: sessionVO.version,
});

module.exports = {
  mapSessionVOToUpdateSessionTO,
};
