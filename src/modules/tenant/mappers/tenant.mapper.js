const mapTenantTOToTenantVO = (tenantTO) => ({
  id: tenantTO.id,
  name: tenantTO.name,
  status: tenantTO.status,
  createdAt: tenantTO.createdAt,
  updatedAt: tenantTO.updatedAt,
  createdBy: tenantTO.createdBy,
  updatedBy: tenantTO.updatedBy,
  version: tenantTO.version,
});

module.exports = {
  mapTenantTOToTenantVO,
};
