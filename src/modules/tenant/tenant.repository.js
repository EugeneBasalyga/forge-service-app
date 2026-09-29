const EntityRepository = require('@forge/forge-ws-common/classes/entity.repository');

const { TABLE_CONFIG } = require('./constants');

class TenantRepository {
  constructor({ dbPool }) {
    this.tenantEntityRepository = new EntityRepository({
      dbPool,
      tableName: TABLE_CONFIG.TABLE_NAME,
      columns: TABLE_CONFIG.COLUMNS,
    });
  }

  async findTenantById({ id }) {
    return this.tenantEntityRepository.findOne({
      where: {
        id,
      },
    });
  }
}

module.exports = TenantRepository;
