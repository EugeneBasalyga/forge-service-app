const { ERROR_MESSAGE: GENERIC_ERROR_MESSAGE } = require('@forge/forge-ws-common/constants');
const ApiError = require('@forge/forge-ws-common/errors/api.error');

const { mapTenantTOToTenantVO } = require('./mappers/tenant.mapper');

class TenantService {
  constructor(repository) {
    this.repository = repository;
  }

  async getTenantById({ id }) {
    const tenantTO = await this.repository.tenant.findTenantById({ id });

    if (!tenantTO) {
      throw ApiError.NotFound({
        message: GENERIC_ERROR_MESSAGE.entityNotFoundBy('Tenant', 'id', id),
      });
    }

    const tenantVO = mapTenantTOToTenantVO(tenantTO);

    return tenantVO;
  }
}

module.exports = TenantService;
