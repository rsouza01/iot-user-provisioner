import { Application } from 'express';

import { IoTLogger } from "@iot-stuff/iot-logger";

import * as userGet from './user.get'
import * as usersGet from './users.get'
import * as userPost from './user.post'

import injectHandlerDependencies from '../../utils/inject-handler-dependencies';
import { UserRepository } from '../../repository/repository';

import Debug from "debug";
const debug = Debug("iot-user-provisioner:user-handlers");

export function registerRoutes(app: Application, userRepository: UserRepository, iotLogger: IoTLogger) {

  debug('Registering user.GET...');
  app.route('/user').get(injectHandlerDependencies(userGet.main, userRepository, iotLogger));
  debug('Registering users.GET...');
  app.route('/users').get(injectHandlerDependencies(usersGet.main, userRepository, iotLogger));
  debug('Registering user.POST...');
  app.route('/user').post(injectHandlerDependencies(userPost.main, userRepository, iotLogger));
}