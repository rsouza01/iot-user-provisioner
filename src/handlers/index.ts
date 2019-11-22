import { Application, Request, Response } from 'express';

import * as users from './users';

export function registerRoutes(app: Application) {

    users.registerRoutes(app);
    
    app.get("/", async (req: Request, res: Response, next) => {
        res.send({
            message: 'RESULT'
          });
    });
}
