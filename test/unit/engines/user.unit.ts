import assert from 'assert';
import { stub } from 'sinon';
import * as sinon from 'sinon';
import ValidationError from "../../../src/validators/errors/validation-error";
import UserEngine from "../../../src/engines/user";
import { UserRepository } from "../../../src/repository/repository";
import { NullRepository } from "../../../src/repository/nullRepo";
import User from '../../../src/domain/user';


describe('User Create Engine', function () {
  let req;
  let db;
  let validator;
  const dbInsertResult = {};

  const repository: UserRepository = new NullRepository();
  sinon.stub(repository, 'insert') .returns(Promise.resolve(dbInsertResult));

  const logger = {
    info: () => console.log()
  };

  let userEngine = new UserEngine(undefined, logger);

  beforeEach(function () {
    req = {
      body: {
        email: 'req.body.email',
        password: 'req.body.password',
        }
    };
  });

  describe.only('When invoked and validator returns with undefined', function () {
    let promise;

    beforeEach(function () {
      validator = stub().returns(undefined);

      promise = userEngine.create(req, repository, validator, ValidationError);
      return promise;
    });

    describe('should call the validator', function () {
      it('once', function () {
        assert(validator.calledOnce);
      });

      it('with req as the only argument', function () {
        assert(validator.calledWithExactly(req));
      });
    });

    it('should relay the promise returned by UserRepository.insert()', function () {

      promise.then(res => {
        assert.strictEqual(res, dbInsertResult)
      });
    });
  });

  describe('When validator returns with an instance of ValidationError', function () {
    it('should reject with the ValidationError returned from validator', function () {
      const validationError = new ValidationError();
      validator = stub().returns(validationError);

      return userEngine
        .create(req, repository, validator, ValidationError)
        .catch(err => assert.strictEqual(err, validationError));
    });
  });
});
