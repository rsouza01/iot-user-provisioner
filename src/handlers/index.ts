import { Application, Request, Response } from 'express';

export function registerRoutes(app: Application) {

    app.get("/", async (req: Request, res: Response, next) => {
        res.send({
            message: 'RESULT'
          });
    });
}
