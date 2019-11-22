import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';


export async function main(req: Request, res: Response) {
  //return res.status(HttpStatus.BAD_REQUEST).send(undefined);

  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify(
      {
        message: 'Payload should not be empty',
      }
    ));
  return;
}
