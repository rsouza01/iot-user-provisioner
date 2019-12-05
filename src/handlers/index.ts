import { Application, Request, Response } from 'express';

import * as users from './users';
import { UserRepository } from '../repository/repository';

import Debug from "debug";
const debug = Debug("iot-user-provisioner:handlers");

export function registerRoutes(app: Application, userRepository: UserRepository) {

    debug('Registering routes...');
    
    users.registerRoutes(app, userRepository);
    
    app.get("/", async (req: Request, res: Response, next) => {
        res.send({
            message: 'RESULT'
          });
    });
}
