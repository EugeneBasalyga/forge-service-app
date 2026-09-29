const EntityRepository = require('@forge/forge-ws-common/classes/entity.repository');

const { TABLE_CONFIG } = require('./constants');

class UserRepository {
  constructor({ dbPool }) {
    this.userEntityRepository = new EntityRepository({
      dbPool,
      tableName: TABLE_CONFIG.TABLE_NAME,
      columns: TABLE_CONFIG.COLUMNS,
    });
  }

  async findUserById({ id, tenantId }) {
    return this.userEntityRepository.findOne({
      where: {
        id,
        tenantId,
      },
    });
  }

  async findUserByEmail({ tenantId, email }) {
    const sql = `
      SELECT *
      FROM "${TABLE_CONFIG.TABLE_NAME}"
      WHERE "tenantId" = $1
        AND LOWER("email") = LOWER($2)
      LIMIT 1
    `;

    const { rows } = await this.userEntityRepository.query(sql, [tenantId, email]);

    return rows[0] ?? null;
  }
}

module.exports = UserRepository;
