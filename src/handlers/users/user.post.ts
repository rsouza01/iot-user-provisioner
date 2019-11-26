import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';



export async function main(req: Request, res: Response) {
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
  
  res.status(400);
  res.set('Content-Type', 'application/json');
  res.json({ message: 'Payload should be in JSON format', });
}