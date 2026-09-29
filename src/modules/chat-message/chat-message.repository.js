const EntityRepository = require('@forge/forge-ws-common/classes/entity.repository');

const { TABLE_CONFIG } = require('./constants');

class ChatMessageRepository {
  constructor({ dbPool }) {
    this.chatMessageEntityRepository = new EntityRepository({
      dbPool,
      tableName: TABLE_CONFIG.TABLE_NAME,
      columns: TABLE_CONFIG.COLUMNS,
    });
  }

  async findChatMessagesByUserId({ tenantId, userId }) {
    const sql = `
      SELECT *
      FROM "${TABLE_CONFIG.TABLE_NAME}"
      WHERE "tenantId" = $1
        AND "userId" = $2
      ORDER BY "createdAt" ASC
    `;

    const { rows } = await this.chatMessageEntityRepository.query(sql, [tenantId, userId]);

    return rows;
  }

  // Returns the newest `limit` messages, oldest first
  async findLatestChatMessagesByUserId({ tenantId, userId, limit }) {
    const sql = `
      SELECT *
      FROM "${TABLE_CONFIG.TABLE_NAME}"
      WHERE "tenantId" = $1
        AND "userId" = $2
      ORDER BY "createdAt" DESC
      LIMIT $3
    `;

    const { rows } = await this.chatMessageEntityRepository.query(sql, [tenantId, userId, limit]);

    return rows.reverse();
  }

  async createChatMessage(data) {
    return this.chatMessageEntityRepository.create(data);
  }
}

module.exports = ChatMessageRepository;
