import { Request, Response } from "express";
import * as HttpStatus from "http-status-codes";
import User from "../../domain/user";
import { UserRepository } from "../../repository/repository";
import { v4 as uuid } from "uuid";

import * as defaultLogger from "@iot-stuff/iot-logger";
import ValidationError from "../../validators/validator-error";
import validate from "../../validators/users/create";

export async function main(
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
      const iotLogger = defaultLogger.getIoTDefaultLogger(
        "ApplicationName",
        "1",
        "filename.log"
      );
      iotLogger.info(`User saved - data: ${JSON.stringify(user)}`);

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
