import { Request } from "express";
import { v4 as uuid } from "uuid";

import User from "../domain/user";
import { UserRepository } from "../repository/repository";
import ValidationError from "../validators/validator-error";

import validate from "../validators/users/create";
import * as defaultLogger from "@iot-stuff/iot-logger";
import { IoTLogger } from "@iot-stuff/iot-logger";

export default class UserEngine {

    iotLogger: IoTLogger;

    constructor(context, iotLogger: IoTLogger) {
        this.iotLogger = iotLogger;
    }

    public async create(req: Request, userRepository: UserRepository): Promise<any> {
        const validationResults = validate(req);
    
        if (validationResults instanceof ValidationError) {
            return Promise.reject(validationResults);
        }

        const user = {
            _id: uuid(),
            email: req.body.email,
            password: req.body.password
        } as User;

        userRepository
            .insert(user)
            .then(data => {
                this.iotLogger.info(`User saved - data: ${JSON.stringify(user)}`);
                return Promise.resolve(user);
            })
            .catch((error: Error) => {
                return Promise.reject(error);
            });
    }
}
