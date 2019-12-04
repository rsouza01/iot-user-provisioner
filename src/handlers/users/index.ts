import { Application } from 'express';

import * as userGet from './user.get'
import * as usersGet from './users.get'
import * as userPost from './user.post'

import injectHandlerDependencies from '../../utils/inject-handler-dependencies';
import { UserRepository } from '../../repository/repository';

export function registerRoutes(app: Application, userRepository: UserRepository) {

  app.route('/user').get(injectHandlerDependencies(userGet.main, userRepository));
  app.route('/users').get(injectHandlerDependencies(usersGet.main, userRepository));
  app.route('/user').post(injectHandlerDependencies(userPost.main, userRepository));
}