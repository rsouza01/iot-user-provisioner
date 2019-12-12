import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import User from '../../domain/user';
import { UserRepository } from '../../repository/repository';
import { v4 as uuid } from "uuid";

import * as defaultLogger from '@iot-stuff/iot-logger';

export async function main(req: Request, res: Response, userRepository: UserRepository) {
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

  const user = {
    _id: uuid(),
    email: req.body.email,
    password: req.body.password
  } as User;

 
  userRepository.insert(user)
    .then((data) => {

      const iotLogger = defaultLogger.getIoTDefaultLogger('ApplicationName', '1', 'filename.log');
      iotLogger.info(`User saved - data: ${JSON.stringify(user)}`);

      res.status(HttpStatus.CREATED);
      res.set('Content-Type', 'text/plain');
      res.send(user._id);
    })
    .catch((error: Error) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.set('Content-Type', 'application/json'); 
      res.json({ message: 'Internal Server Error' });      
    });

    return;
}