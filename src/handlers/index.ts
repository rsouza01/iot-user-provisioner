import { Application, Request, Response } from 'express';
import { IoTLogger } from '@iot-stuff/iot-logger';

import Debug from 'debug';
import * as users from './users';
import { UserRepository } from '../repository/repository';
import UserEngine from '../engines/user';

const debug = Debug('iot-user-provisioner:handlers');

export function registerRoutes(app: Application, userRepository: UserRepository, engine: UserEngine, iotLogger: IoTLogger) {
  debug('Registering routes...');

   
  users.registerRoutes(app, userRepository, engine, iotLogger);

  app.get('/', async (req: Request, res: Response, next) => {
    res.send({
      message: 'RESULT',
    });
  });
}
