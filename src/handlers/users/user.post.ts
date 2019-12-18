import { Request, Response } from "express";
import * as HttpStatus from "http-status-codes";
import { v4 as uuid } from "uuid";
import Debug from "debug";

import { IoTLogger } from "@iot-stuff/iot-logger";

import User from "../../domain/user";
import { UserRepository } from "../../repository/repository";

import * as defaultLogger from "@iot-stuff/iot-logger";
import ValidationError from "../../validators/validator-error";
import validate from "../../validators/users/create";
import UserEngine from "../../engines/user";

const debug = Debug("iot-user-provisioner:user.post");

export async function main(
  req: Request,
  res: Response,
  userRepository: UserRepository,
  iotLogger: IoTLogger  
) {

  const userEngine = new UserEngine({}, iotLogger);

  userEngine.create(req, userRepository)
    .then((result) => {
      iotLogger.info(`user.CREATE.resolve - Result = ${JSON.stringify(result)}`);
      res.status(HttpStatus.CREATED);
      res.set('Content-Type', 'text/plain');
      return res.send(result._id);
    }, (err) => {
      if (err instanceof ValidationError) {
        iotLogger.info(`Error: ${JSON.stringify(err, Object.getOwnPropertyNames(err))}`);

        res.status(HttpStatus.BAD_REQUEST);
        res.set('Content-Type', 'application/json');
        return res.json({ message: err.message });
      }
      return undefined;
    })
    .catch(err => {
      iotLogger.info(`Error: ${JSON.stringify(err, Object.getOwnPropertyNames(err))}`);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.set('Content-Type', 'application/json');
      return res.json({ message: 'Internal Server Error' });
    });

    return;
}

export async function _main(
  req: Request,
  res: Response,
  userRepository: UserRepository
) {

  const validationResults = validate(req);

  if (validationResults instanceof ValidationError) {
    res.status(HttpStatus.BAD_REQUEST);
    res.set("Content-Type", "application/json");
    return res.json({ message: validationResults.message });
  }

  const user = {
    _id: uuid(),
    email: req.body.email,
    password: req.body.password
  } as User;

  userRepository
    .insert(user)
    .then(data => {
      res.status(HttpStatus.CREATED);
      res.set("Content-Type", "text/plain");
      res.send(user._id);
    })
    .catch((error: Error) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.set("Content-Type", "application/json");
      res.json({ message: "Internal Server Error" });
    });

  return;
}
