const cors = require('cors');
const express = require('express');

const { ROUTING } = require('@forge/forge-ws-common/constants');
const openapiSetupHandler = require('@forge/forge-ws-common/handlers/openapi-setup.handler');
const tenantSetupHandler = require('@forge/forge-ws-common/handlers/tenant-setup.handler');
const { errorMiddleware } = require('@forge/forge-ws-common/middlewares');
const { createDatabasePool } = require('@forge/forge-ws-common/utils/database-pool.util');

const config = require('./config');
const AuthController = require('./modules/auth/auth.controller');
const AuthService = require('./modules/auth/auth.service');
const SessionController = require('./modules/session/session.controller');
const SessionRepository = require('./modules/session/session.repository');
const SessionService = require('./modules/session/session.service');
const TenantRepository = require('./modules/tenant/tenant.repository');
const TenantService = require('./modules/tenant/tenant.service');
const TrainingExerciseController = require('./modules/training-exercise/training-exercise.controller');
const TrainingExerciseRepository = require('./modules/training-exercise/training-exercise.repository');
const TrainingExerciseService = require('./modules/training-exercise/training-exercise.service');
const TrainingSessionController = require('./modules/training-session/training-session.controller');
const TrainingSessionRepository = require('./modules/training-session/training-session.repository');
const TrainingSessionService = require('./modules/training-session/training-session.service');
const UserController = require('./modules/user/user.controller');
const UserRepository = require('./modules/user/user.repository');
const UserService = require('./modules/user/user.service');
const openapi = require('./openapi');

const expressApp = express();

const startServer = (app) => {
  const dbPool = createDatabasePool({ connectionString: config.connectionString });

  app.use(cors());
  app.use(express.json());

  const repository = {
    session: new SessionRepository({ dbPool }),
    tenant: new TenantRepository({ dbPool }),
    trainingExercise: new TrainingExerciseRepository({ dbPool }),
    trainingSession: new TrainingSessionRepository({ dbPool }),
    user: new UserRepository({ dbPool }),
  };

  const service = {
    auth: new AuthService(repository),
    session: new SessionService(repository),
    tenant: new TenantService(repository),
    trainingExercise: new TrainingExerciseService(repository),
    trainingSession: new TrainingSessionService(repository),
    user: new UserService(repository),
  };

  const rootRouter = express.Router();

  rootRouter.use(
    ...openapiSetupHandler({
      openapi: openapi({ domainUrl: config.domainUrl, version: config.version }),
      siteTitle: 'Forge Service API',
    })
  );

  // Every service rootRouter MUST include tenantSetupHandler (before any other handlers)
  // and follow routes signature using ROUTING.TENANT_BASE_PATH

  rootRouter.use(
    ...tenantSetupHandler({
      getTenantById: ({ id }) => service.tenant.getTenantById({ id }),
    })
  );

  rootRouter.use(`${ROUTING.TENANT_BASE_PATH}/auth`, new AuthController(service).getRouter());
  rootRouter.use(
    `${ROUTING.TENANT_BASE_PATH}/sessions`,
    new SessionController(service).getRouter()
  );
  rootRouter.use(
    `${ROUTING.TENANT_BASE_PATH}/training-sessions`,
    new TrainingSessionController(service).getRouter()
  );
  rootRouter.use(
    `${ROUTING.TENANT_BASE_PATH}/training-sessions/:sessionId/exercises`,
    new TrainingExerciseController(service).getRouter()
  );
  rootRouter.use(`${ROUTING.TENANT_BASE_PATH}/users`, new UserController(service).getRouter());

  app.use(`/v${config.version}`, rootRouter);
  app.use(errorMiddleware);

  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Forge Service is listening on port ${config.port}`);
  });
};

startServer(expressApp);
