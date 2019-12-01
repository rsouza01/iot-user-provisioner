import { binding, given, then, when } from 'cucumber-tsflow';
import assert from 'assert';

import superagent from 'superagent';

import { getValidPayload, convertStringToArray } from './utils';


@binding()
export class UserCreateSteps {

  private response: any;
  private responsePayload: any;
  private request: any;

  private requestPayload: any;
  private userType: string = '';

  @when(/the client creates a (GET|POST|PATCH|PUT|DELETE|OPTIONS|HEAD) request to ([/\w-:.]+)$/)
  public createPost(method, path) {
    this.request = superagent(method, `http://localhost:8080${path}`);
  }

  @when(/^attaches a valid (.+) payload$/)
  public attachGenericValidPayload(payloadType: string) {
    this.requestPayload = getValidPayload(payloadType);

    this.request
      .send(JSON.stringify(this.requestPayload))
      .set('Content-Type', 'application/json');
  }

  @when(/^attaches a generic (.+) payload$/)
  public attachGenericPayload(payloadType: string) {

    switch (payloadType) {
      case 'malformed': this.request.send('{"email": "dan@danyll.com", name: }').set('Content-Type', 'application/json'); break;
      case 'non-JSON': this.request.send('<?xml version="1.0" encoding="UTF-8" ?><email>dan@danyll.com</email>').set('Content-Type', 'text/xml'); break;
      case 'empty': default:
    }
  };

  @when(/^sends the request$/)
  public sendRequest(callback) {
    this.request.then((response) => {
      this.response = response.res; callback();
    })
      .catch((error) => {
        this.response = error.response; callback();
      });
  }

  @when(/^without a (?:"|')([\w-]+)(?:"|') header set$/)
  public checkRequestHeader(headerName: string) {
    this.request.unset(headerName);
  }


  @when(/^attaches an? (.+) payload where the ([a-zA-Z0-9, ]+) fields? (?:is|are)(\s+not)? a ([a-zA-Z]+)$/)
  public attachPayloadWrongTypeField(payloadType: string, fields, invert, type) {
    const typeKey = type.toLowerCase();
    const invertKey = invert ? 'not' : 'is';
    const sampleValues = {
      string: {
        is: 'string',
        not: 10,
      },
    };

    this.requestPayload = getValidPayload(payloadType);
    const fieldsToModify = convertStringToArray(fields);

    fieldsToModify.forEach((field) => {
      this.requestPayload[field] = sampleValues[typeKey][invertKey];
    });
    this.request
      .send(JSON.stringify(this.requestPayload))
      .set('Content-Type', 'application/json');
  }


  @when(/^attaches an? (.+) payload where the ([a-zA-Z0-9, ]+) fields? (?:is|are) exactly (.+)$/)
  public attachPayloadEmailField(payloadType: string, fields, value) {
    this.requestPayload = getValidPayload(payloadType);
    const fieldsToModify = convertStringToArray(fields);
    fieldsToModify.forEach((field) => {
      this.requestPayload[field] = value;
    });
    this.request
      .send(JSON.stringify(this.requestPayload))
      .set('Content-Type', 'application/json');
  };

  @when(/^attaches an? (.+) payload which is missing the ([a-zA-Z0-9, ]+) fields?$/)
  public attachPayload(payloadType, missingFields) {
    this.requestPayload = getValidPayload(payloadType);
    const fieldsToDelete = convertStringToArray(missingFields);

    fieldsToDelete.forEach(field => delete this.requestPayload[field]);

    this.request
      .send(JSON.stringify(this.requestPayload))
      .set('Content-Type', 'application/json');
  }

  @then(/^our API should respond with a ([1-5]\d{2}) HTTP status code$/)
  public checkHTTPResponse(statusCode: number) {
    assert.equal(this.response.statusCode, statusCode);
  }

  @then(/^the payload of the response should be an? ([a-zA-Z0-9, ]+)$/)
  public checkPayloadContentType(payloadType: string) {
    const contentType = this.response.headers['Content-Type'] ||
      this.response.headers['content-type'];
    if (payloadType === 'JSON object') {
      // Check Content-Type header
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response not of Content-Type application / json');
      }
      // Check it is valid JSON
      try {
        this.responsePayload = JSON.parse(this.response.text);
      } catch (e) {
        throw new Error('Response not a valid JSON object');
      }
    } else if (payloadType === 'string') {
      // Check Content-Type header
      if (!contentType || !contentType.includes('text/plain')) {
        throw new Error('Response not of Content-Type text/plain');
      }
      // Check it is a string
      this.responsePayload = this.response.text;
      if (typeof this.responsePayload !== 'string') {
        throw new Error('Response not a string');
      }
    }
  };

  @then(/^contains a message property which says (?:"|')(.*)(?:"|')$/)
  public thenPayloadMessageShouldBe(message: string) {
    assert.equal(this.responsePayload.message, message);
  }

  @then(/^the payload object should be added to the database, grouped under the "([a-zA-Z]+)" type$/)
  public checkDataSavedDatabase(type, callback) {
    this.userType = type;
    callback();
  };

  @then(/^the newly-created user should be deleted$/)
  public deleteCreatedUser() {
  };
}
