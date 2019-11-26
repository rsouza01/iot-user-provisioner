import { Application } from 'express';

import * as userGet from './user.get'
import * as usersGet from './users.get'
import * as userPost from './user.post'

export function registerRoutes(app: Application) {

  app.route('/user').get(userGet.main);
  app.route('/users').get(usersGet.main);
  app.route('/user').post(userPost.main);
}