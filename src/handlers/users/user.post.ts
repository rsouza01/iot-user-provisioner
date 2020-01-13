import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { v4 as uuid } from 'uuid';
import Debug from 'debug';

import { IoTLogger } from '@iot-stuff/iot-logger';

import * as defaultLogger from '@iot-stuff/iot-logger';
import User from '../../domain/user';
import { UserRepository } from '../../repository/repository';

import ValidationError from '../../validators/errors/validation-error';
import UserEngine from '../../engines/user';
import Engine from '../../engines/engine';


const debug = Debug('iot-user-provisioner:user.post');

export async function main(
  req: Request,
  res: Response,
  repository: UserRepository,
  engine: Engine,
  logger: IoTLogger,
  validator: Function,
  ValidationError,
) {
  const userEngine = engine as UserEngine;

  return userEngine
    .create(req, repository, validator, ValidationError)
    .then(
      (result) => {
        logger.info(
          `user.CREATE.resolve - Result = ${JSON.stringify(result)}`,
        );
        res.status(HttpStatus.CREATED);
        res.set('Content-Type', 'text/plain');
        return res.send(result._id);
      },
      (err) => {
        if (err instanceof ValidationError) {
          logger.info(
            `Error: ${JSON.stringify(err, Object.getOwnPropertyNames(err))}`,
          );

          res.status(HttpStatus.BAD_REQUEST);
          res.set('Content-Type', 'application/json');
          return res.json({ message: err.message });
        }
        throw err;
      },
    )
    .catch((err) => {
      logger.info(
        `Error: ${JSON.stringify(err, Object.getOwnPropertyNames(err))}`,
      );

      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.set('Content-Type', 'application/json');
      return res.json({ message: 'Internal Server Error' });
    });
}
