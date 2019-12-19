import Debug from 'debug';
import mongoose from 'mongoose';
import { UserRepository } from './repository';
import User from '../domain/user';

const debug = Debug('iot-user-provisioner:postgres-repo');

export class UserPostgresRepository implements UserRepository {
  constructor() {
  }

  async insert(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(user);
    });
  }
}
