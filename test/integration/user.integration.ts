import assert from 'assert';
import { Request } from 'express';
import * as defaultLogger from '@iot-stuff/iot-logger';
//import elasticsearch from 'elasticsearch';
import { NullRepository } from "../../src/repository/nullRepo";
import createUserValidator from '../../src/validators/users/create';
import ValidationError from "../../src/validators/errors/validation-error";
import UserEngine from "../../src/engines/user";
import validate from '../../src/validators/users/create';

const iotLogger = defaultLogger.getIoTDefaultLogger(
  process.env.APP_NAME,
  process.env.APP_VERSION,
  process.env.APP_LOG_FILE,
);

describe('User Create Engine', function () {
  describe('When invoked with invalid req', function () {
    it('should return promise that rejects with an instance of ValidationError', function () {

      const req = {} as Request;
      const repository = new NullRepository();
      const userEngine: UserEngine = new UserEngine({}, iotLogger);

      userEngine
        .create(req, repository, validate, ValidationError)
        .catch(err => assert(err instanceof ValidationError));
    });
  });

  describe('When invoked with valid req', function () {
    it('should return a success object containing the user ID', function () {
      const repository = new NullRepository();
      const userEngine: UserEngine = new UserEngine({}, iotLogger);

      const req = {
        body: {
          email: 'e@ma.il',
          password: 'password',
          profile: {},
        },
      } as Request;;
      userEngine
        .create(req, repository, validate, ValidationError)
        .then((result) => {
          assert.equal(typeof result._id, 'string');
        });
    });
  });
});
