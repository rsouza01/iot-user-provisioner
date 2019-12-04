import { Request, Response } from 'express';
import * as HttpStatus  from 'http-status-codes';
import { UserRepository } from '../../repository/repository';


export function main(req: Request, res: Response, userRepository: UserRepository) {
  return res.status(HttpStatus.NOT_IMPLEMENTED).send({});
}

