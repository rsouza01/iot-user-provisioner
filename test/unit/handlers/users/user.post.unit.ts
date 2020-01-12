import "mocha";
import { expect } from "chai";
import assert from 'assert';
//import { spy, stub } from 'sinon';
import * as sinon from 'sinon';
import { Request, Response } from "express";

import * as userPost from "../../../../src/handlers/users/user.post"
import ValidationError from "../../../../src/validators/errors/validation-error";
import { UserRepository } from "../../../../src/repository/repository";
import UserEngine from "../../../../src/engines/user";
import { ENGINE_METHOD_ALL } from "constants";

const USER_ID = 'USER_ID';
const VALIDATION_ERROR_MESSAGE = 'VALIDATION_ERROR_MESSAGE';

const generateUserEngineCreateStubs = {
  success: () => sinon.stub().resolves(Promise.resolve({_id: USER_ID})),
  genericError: () => sinon.stub().rejects(new Error()),
  validationError: () => sinon.stub().rejects(new ValidationError(VALIDATION_ERROR_MESSAGE)),
};

function generateResMock(sandbox) {
  return {
    status: sandbox.spy(),
    set: sandbox.spy(),
    json: sandbox.spy(),
    send: sandbox.spy(),
  };
}

describe("User - POST Handler", () => {

  const sandbox = sinon.createSandbox();

  const repository = {} as UserRepository;
  const req = {} as Request;
  let res;

  const logger = {
    info: () => { console.log()}
  };

  let validator;

  beforeEach(function () {
    res = generateResMock(sandbox);
  });

  describe("When create resolves with the new user's ID", function () {
    let engine = {
      create : sandbox.spy(generateUserEngineCreateStubs.success())
    }

    beforeEach(function () {
      return userPost.main(req, res, repository, engine, logger, validator, ValidationError);
    });

    afterEach(function () {
      sandbox.restore()
    });

    it('should call res.status() once', function () {
      assert(res.status.calledOnce);
    });
  });

  describe("When create rejects by validation", function () {
    let engine = {
      create : sandbox.spy(generateUserEngineCreateStubs.validationError())
    }

    beforeEach(function () {
      return userPost.main(req, res, repository, engine, logger, validator, ValidationError);
    });

    afterEach(function () {
      sandbox.restore()
    });

    it('should call res.status() once', function () {
      assert(res.status.calledOnce);
    });
  });


});
