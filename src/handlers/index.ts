import { Application, Request, Response } from 'express';
import { IoTLogger } from '@iot-stuff/iot-logger';

import Debug from 'debug';
import * as users from './users';
import { UserRepository } from '../repository/repository';

const debug = Debug('iot-user-provisioner:handlers');

export default function registerRoutes(
  app: Application,
  userRepository: UserRepository,
  iotLogger: IoTLogger) {
  debug('Registering routes...');

  users.registerRoutes(app, userRepository, iotLogger);

  app.get('/', async (req: Request, res: Response, next) => {
    res.send({
      message: 'RESULT',
    });
  });
}
