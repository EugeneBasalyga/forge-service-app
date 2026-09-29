const { paths: authPaths, schemas: authSchemas } = require('../modules/auth/openapi');
const { paths: sessionPaths, schemas: sessionSchemas } = require('../modules/session/openapi');
const {
  paths: trainingExercisePaths,
  schemas: trainingExerciseSchemas,
} = require('../modules/training-exercise/openapi');
const {
  paths: trainingSessionPaths,
  schemas: trainingSessionSchemas,
} = require('../modules/training-session/openapi');
const { paths: userPaths, schemas: userSchemas } = require('../modules/user/openapi');

const schemas = require('./schemas');

const openapi = ({ domainUrl, version }) => ({
  openapi: '3.1.0',
  info: {
    version: '1.0.0',
    title: 'Forge service',
    contact: {
      name: 'Forge',
    },
  },
  servers: [
    {
      url: `${domainUrl}/v${version}/tenants/{tenantId}`,
      variables: {
        tenantId: {
          default: null,
          description: 'Tenant id (UUID)',
        },
      },
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      ...schemas,
      ...authSchemas,
      ...sessionSchemas,
      ...trainingExerciseSchemas,
      ...trainingSessionSchemas,
      ...userSchemas,
    },
  },
  paths: {
    ...authPaths,
    ...sessionPaths,
    ...trainingSessionPaths,
    ...trainingExercisePaths,
    ...userPaths,
  },
});

module.exports = openapi;
