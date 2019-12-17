import { Request, Response } from 'express';
import { IoTLogger } from "@iot-stuff/iot-logger";
import * as HttpStatus  from 'http-status-codes';
import { UserRepository } from '../../repository/repository';


export function main(req: Request, res: Response, userRepository: UserRepository, iotLogger: IoTLogger) {
  return res.status(HttpStatus.NOT_IMPLEMENTED).send({});
}

