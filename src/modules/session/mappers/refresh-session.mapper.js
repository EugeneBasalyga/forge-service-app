const mapRefreshSessionRequestToRefreshSessionVO = (req) => ({
  tenantId: req.tenant.id,
  refreshToken: req.body.refreshToken,
  deviceId: req.headers['device-id'],
  locale: req.headers.locale,
});

const mapSessionVOToRefreshSessionResponse = (sessionVO) => ({
  accessToken: sessionVO.accessToken,
  refreshToken: sessionVO.refreshToken,
});

module.exports = {
  mapRefreshSessionRequestToRefreshSessionVO,
  mapSessionVOToRefreshSessionResponse,
};
