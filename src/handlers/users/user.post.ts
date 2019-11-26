import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';


export async function main(req: Request, res: Response, next) {
  //Empty content - 400
  //Not json - 415
  //Malformed JSON - 400

  if (req.headers['content-length'] === '0') {
    res.status(400);
    res.set('Content-Type', 'application/json');
    res.json({ message: 'Payload should not be empty', });
    return;
  }
  if (req.headers['content-type'] !== 'application/json') {
    res.status(415);
    res.set('Content-Type', 'application/json');
    res.json({ message: 'The "Content-Type" header must always be "application/json"', });
    return;
  }

  if (!Object.prototype.hasOwnProperty.call(req.body, 'email') || !Object.prototype.hasOwnProperty.call(req.body, 'password')) {
    res.status(400);
    res.set('Content-Type', 'application/json');
    res.json({ message: 'Payload must contain at least the email and password fields' });
    return;
  }

  next();  
  // res.status(400);
  // res.set('Content-Type', 'application/json');
  // res.json({ message: 'Payload should be in JSON format', });

}