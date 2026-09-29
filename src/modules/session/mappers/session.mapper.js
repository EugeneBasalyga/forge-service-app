const mapSessionTOToSessionVO = (sessionTO) => ({
  id: sessionTO.id,
  tenantId: sessionTO.tenantId,
  userId: sessionTO.userId,
  appKey: sessionTO.appKey,
  deviceId: sessionTO.deviceId,
  locale: sessionTO.locale,
  accessToken: sessionTO.accessToken,
  accessTokenExpires: sessionTO.accessTokenExpires,
  refreshToken: sessionTO.refreshToken,
  refreshTokenExpires: sessionTO.refreshTokenExpires,
  createdBy: sessionTO.createdBy,
  updatedBy: sessionTO.updatedBy,
  createdAt: sessionTO.createdAt,
  updatedAt: sessionTO.updatedAt,
  version: sessionTO.version,
});

module.exports = {
  mapSessionTOToSessionVO,
};
