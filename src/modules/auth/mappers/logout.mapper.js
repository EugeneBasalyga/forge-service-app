const mapLogoutRequestToLogoutParamsVO = (req) => ({
  tenantId: req.tenant.id,
  accessToken: req.token,
});

module.exports = {
  mapLogoutRequestToLogoutParamsVO,
};
