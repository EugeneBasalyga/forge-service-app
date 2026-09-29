const EntityRepository = require('@forge/forge-ws-common/classes/entity.repository');
const { PAGINATION } = require('@forge/forge-ws-common/constants');

const { TABLE_CONFIG } = require('./constants');

class TrainingExerciseRepository {
  constructor({ dbPool }) {
    this.trainingExerciseEntityRepository = new EntityRepository({
      dbPool,
      tableName: TABLE_CONFIG.TABLE_NAME,
      columns: TABLE_CONFIG.COLUMNS,
    });
  }

  async findTrainingExercisesBySessionId({ tenantId, sessionId }) {
    return this.trainingExerciseEntityRepository.findAll(
      {
        where: {
          sessionId,
          tenantId,
        },
      },
      { order: PAGINATION.ORDER.ASC }
    );
  }
}

module.exports = TrainingExerciseRepository;
