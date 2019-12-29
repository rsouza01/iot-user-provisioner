import { Application, Request, Response } from 'express';
import { IoTLogger } from '@iot-stuff/iot-logger';

import Debug from 'debug';
import * as userRoutesRegister from './users';
import * as organizationsRoutesRegister from './organizations';
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

  const registerToEngineMap = new Map([
    [userRoutesRegister, userEngine],
    [organizationsRoutesRegister, userEngine], //TODO: only for marking territory, must be changed later..
  ]);

  const registerToValidatorMap = new Map([
    [userRoutesRegister, userEngine],
    [organizationsRoutesRegister, userEngine], //TODO: only for marking territory, must be changed later..
  ]);


  userRoutesRegister.registerRoutes(app, userRepository, userEngine, iotLogger);
  organizationsRoutesRegister.registerRoutes(app, userRepository, userEngine, iotLogger);

  app.get('/', async (req: Request, res: Response) => {
    res.send({
      message: 'RESULT',
    });
  });
}
