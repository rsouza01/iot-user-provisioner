import { Request, Response } from 'express';
import * as HttpStatus  from 'http-status-codes';


export function main(req: Request, res: Response) {
  return res.status(HttpStatus.NOT_IMPLEMENTED).send({});
}

