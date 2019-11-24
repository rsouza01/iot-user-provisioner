import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';



export async function main(req: Request, res: Response) {
  //Empty content - 400
  //Not json - 415
  //Malformed JSON - 400

  console.log('HEADERS: ', req.headers);
  console.log('BODY: ', req.body);

  console.log('content-length: ', req.headers['content-lenght']);
  console.log('content-type: ', req.headers['content-type']);


  if (!req.headers || !req.headers['content-lenght'] || req.headers['content-lenght'] === '0') {
    //res.writeHead(HttpStatus.BAD_REQUEST, { 'content-Type': 'application/json' });
    res.writeHead(500, { 'content-Type': 'application/json' });
    res.end(
      JSON.stringify(
        {
          message: 'Payload should not be empty',
        }
      ));
    return;
  }

  if (!(req.headers && req.headers['content-type'] && req.headers['content-type'] !== 'application/json')) {
    //res.writeHead(410, { 'content-Type': 'application/json' });
    res.writeHead(501, { 'content-type': 'application/json' });
    res.end(
      JSON.stringify(
        {
          message: 'The \"content-Type\" header must always be \"application/json\"',
        }
      ));
    return;
  }

  if (!(req.headers && req.headers['content-type'] && req.headers['content-type'] === 'application/json')) {
    //res.writeHead(HttpStatus.BAD_REQUEST, { 'content-Type': 'application/json' });
    res.writeHead(502, { 'content-Type': 'application/json' });
    res.end(
      JSON.stringify(
        {
          message: 'Payload should be in JSON format',
        }
      ));
    return;
  }




  res.writeHead(201, { 'content-Type': 'application/json' })
  .end({});
  return;

}
