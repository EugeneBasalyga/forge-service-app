const EntityRepository = require('@forge/forge-ws-common/classes/entity.repository');

const { TABLE_CONFIG } = require('./constants');

class TrainingSessionRepository {
  constructor({ dbPool }) {
    this.trainingSessionEntityRepository = new EntityRepository({
      dbPool,
      tableName: TABLE_CONFIG.TABLE_NAME,
      columns: TABLE_CONFIG.COLUMNS,
    });
  }

  async findTrainingSessionsByUserId({ tenantId, userId }) {
    const sql = `
      SELECT *
      FROM "${TABLE_CONFIG.TABLE_NAME}"
      WHERE "tenantId" = $1
        AND "userId" = $2
      ORDER BY "order" ASC, "createdAt" ASC
    `;

    const { rows } = await this.trainingSessionEntityRepository.query(sql, [tenantId, userId]);

    return rows;
  }

  async findTrainingSessionByParams({ tenantId, ...where }) {
    return this.trainingSessionEntityRepository.findOne({
      where: {
        ...where,
        tenantId,
      },
    });
  }

  async updateTrainingSession(data, { id, tenantId }) {
    return this.trainingSessionEntityRepository.update(data, {
      where: {
        id,
        tenantId,
      },
    });
  }
}

module.exports = TrainingSessionRepository;
