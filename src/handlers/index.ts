import { Application, Request, Response } from 'express';
import { IoTLogger } from '@iot-stuff/iot-logger';

import Debug from 'debug';
import * as users from './users';
import * as organizations from './organizations';
import UserEngine from '../engines/user';
import { UserRepository } from '../repository/repository';

import { RepositoryFactory, RepositoryType } from '../repository/repositoryFactory';


const debug = Debug('iot-user-provisioner:handlers');

export function registerRoutes(
  app: Application,
  iotLogger: IoTLogger) {
  debug('Registering routes...');

  const userRepository = RepositoryFactory.getRepository(RepositoryType.User) as UserRepository;
  const userEngine: UserEngine = new UserEngine({}, iotLogger);

  users.registerRoutes(app, userRepository, userEngine, iotLogger);
  organizations.registerRoutes(app, userRepository, userEngine, iotLogger);

  app.get('/', async (req: Request, res: Response) => {
    res.send({
      message: 'RESULT',
    });
  });
}
