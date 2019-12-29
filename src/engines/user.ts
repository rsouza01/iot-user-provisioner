import { Request } from 'express';
import { v4 as uuid } from 'uuid';
import Debug from 'debug';

import * as defaultLogger from '@iot-stuff/iot-logger';
import { IoTLogger } from '@iot-stuff/iot-logger';
import User from '../domain/user';
import { UserRepository } from '../repository/repository';
import ValidationError from '../validators/errors/validation-error';

import Engine from './engine';

const debug = Debug('iot-user-provisioner:UserEngine');

export default class UserEngine implements Engine {
  iotLogger: IoTLogger;

  constructor(context, iotLogger: IoTLogger) {
    this.iotLogger = iotLogger;
  }

  public async create(req: Request, userRepository: UserRepository, validator: Function): Promise<any> {

    const validationResults = validator(req);

    if (validationResults instanceof ValidationError) {
      return Promise.reject(validationResults);
    }

    const user = {
      _id: uuid(),
      email: req.body.email,
      password: req.body.password,
    } as User;

    return userRepository
      .insert(user)
      .then((data) => {
        this.iotLogger.info(`User saved - data: ${JSON.stringify(data)}`);
        return Promise.resolve(user);
      })
      .catch((error: Error) => {
        this.iotLogger.error(`Insert Rejected - error: ${JSON.stringify(error)}`);
        return Promise.reject(error);
      });
  }
}
