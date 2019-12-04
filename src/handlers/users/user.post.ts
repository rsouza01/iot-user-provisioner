import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { UserMongoRepository } from '../../repository/mongoRepo';
import User from '../../domain/user';



export async function main(req: Request, res: Response, next) {

  if (!Object.prototype.hasOwnProperty.call(req.body, 'email') || !Object.prototype.hasOwnProperty.call(req.body, 'password')) {
    res.status(400);
    res.set('Content-Type', 'application/json');
    return res.json({ message: 'Payload must contain at least the email and password fields' });
  }
  if (typeof req.body.email !== 'string' || typeof req.body.password !== 'string') {
    res.status(400);
    res.set('Content-Type', 'application/json');
    return res.json({ message: 'The email and password fields must be of type string' });
  }

  if (!/^[\w.+]+@\w+\.\w+$/.test(req.body.email)) {
    res.status(400);
    res.set('Content-Type', 'application/json');
    return res.json({ message: 'The email field must be a valid email.' });
  }

  

  /*
  const userRepository = new UserMongoRepository();

  const user = {
    email: 'user@xyz.com',
    password: '123ABC'
  } as User;

  userRepository.insert(user);
  */

  console.log('>>>>>>>>>>> CREATION');
  res.status(HttpStatus.CREATED);
  res.set('Content-Type', 'text/plain');
  res.send('123');
  return;
}