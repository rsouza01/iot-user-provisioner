import Debug from 'debug';
import mongoose from 'mongoose';
import { UserRepository } from './repository';
import User from '../domain/user';

const debug = Debug('iot-user-provisioner:dynamodb-repo');

export default class UserDynamoDBRepository implements UserRepository {

  async insert(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(user);
    });
  }
}
