import express from 'express';

import Debug from 'debug';

import * as defaultLogger from '@iot-stuff/iot-logger';
import { IoTLogger } from '@iot-stuff/iot-logger';
import * as handlers from './handlers';
import * as middleware from './middleware';
import { errorHandler } from './middleware/errorHandler';
import { RepositoryFactory, RepositoryType } from './repository/repositoryFactory';
import { UserRepository } from './repository/repository';
import UserEngine from './engines/user';


const debug = Debug(process.env.APP_NAME || 'iot-user-provisioner');

debug('Starting server....');

const app = express();

const PORT = process.env.SERVER_PORT || 3000;

const userRepository = RepositoryFactory.getRepository(RepositoryType.User) as UserRepository;

const iotLogger = defaultLogger.getIoTDefaultLogger(
  process.env.APP_NAME,
  process.env.APP_VERSION,
  process.env.APP_LOG_FILE,
);

const userEngine: UserEngine = new UserEngine({}, iotLogger);

middleware.registerMiddleware(app);
handlers.registerRoutes(app, userRepository, userEngine, iotLogger);

app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => {
    debug(`Server successfully started at ${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`);
  });
}

export default app;
