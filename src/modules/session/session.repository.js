const EntityRepository = require('@forge/forge-ws-common/classes/entity.repository');

const { TABLE_CONFIG } = require('./constants');

class SessionRepository {
  constructor({ dbPool }) {
    this.sessionEntityRepository = new EntityRepository({
      dbPool,
      tableName: TABLE_CONFIG.TABLE_NAME,
      columns: TABLE_CONFIG.COLUMNS,
    });
  }

  async findSessionByParams({ tenantId, ...where }) {
    return this.sessionEntityRepository.findOne({
      where: {
        ...where,
        tenantId,
      },
    });
  }

  async createSession(data) {
    return this.sessionEntityRepository.create(data);
  }

  async updateSession(data, { id, tenantId }) {
    return this.sessionEntityRepository.update(data, {
      where: {
        id,
        tenantId,
      },
    });
  }

  async deleteSessionById({ id, tenantId }) {
    return this.sessionEntityRepository.delete({
      where: {
        id,
        tenantId,
      },
    });
  }

  async deleteSessionsByUserIdAndDeviceId({ tenantId, userId, deviceId }) {
    return this.sessionEntityRepository.delete({
      where: {
        tenantId,
        userId,
        deviceId,
      },
    });
  }

  async deleteUserExpiredSessions({ tenantId, userId }) {
    const sql = `
      DELETE FROM "${TABLE_CONFIG.TABLE_NAME}"
      WHERE "tenantId" = $1
        AND "userId" = $2
        AND "refreshTokenExpires" < $3
    `;

    await this.sessionEntityRepository.query(sql, [tenantId, userId, Date.now()]);
  }
}

module.exports = SessionRepository;
