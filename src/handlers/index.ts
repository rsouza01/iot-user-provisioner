import { Application, Request, Response } from 'express';

import * as users from './users';
import { UserRepository } from '../repository/repository';

export function registerRoutes(app: Application, userRepository: UserRepository) {

    users.registerRoutes(app, userRepository);
    
    app.get("/", async (req: Request, res: Response, next) => {
        res.send({
            message: 'RESULT'
          });
    });
}
