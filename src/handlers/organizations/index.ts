import { Application } from 'express';

import { IoTLogger } from '@iot-stuff/iot-logger';

import Debug from 'debug';

import injectHandlerDependencies from '../../utils/inject-handler-dependencies';
import { UserRepository } from '../../repository/repository';
import UserEngine from '../../engines/user';

const debug = Debug('iot-user-provisioner:user-handlers');

export function registerRoutes(
  app: Application,
  userRepository: UserRepository,
  engine: UserEngine,
  iotLogger: IoTLogger,
) {

}
