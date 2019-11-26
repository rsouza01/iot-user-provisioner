import { binding, given, then, when } from 'cucumber-tsflow';
import assert from 'assert';

import superagent from 'superagent';

@binding()
export class UserCreateSteps {

  private response: any;
  private responsePayload: any;
  private request: any;

  @when(/the client creates a (GET|POST|PATCH|PUT|DELETE|OPTIONS|HEAD) request to ([/\w-:.]+)$/)
  public createPost(method, path) {
    this.request = superagent(method, `http://localhost:8080${path}`);
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


  @when(/^attaches an? (.+) payload which is missing the ([a-zA-Z0-9, ]+) fields?$/)
  public attachPayload(payloadType, missingFields) {
    const payload = {
      email: 'e@ma.il',
      password: 'password',
    };
    const fieldsToDelete = missingFields.split(',').map(s => s.trim()).filter(s => s !== '');

    fieldsToDelete.forEach(field => delete payload[field]);

    this.request
      .send(JSON.stringify(payload))
      .set('Content-Type', 'application/json');
  }

  @then(/^our API should respond with a ([1-5]\d{2}) HTTP status code$/)
  public checkHTTPResponse4XX(statusCode: number) {
    assert.equal(this.response.statusCode, statusCode);
  }

  @then(/^the payload of the response should be a JSON object$/)
  public checkPayloadContentType() {
    // Check Content-Type header 
    const contentType = this.response.headers['Content-Type'] || this.response.headers['content-type'];

    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response not of Content-Type application/json');
    }
    // Check it is valid JSON 
    try {
      this.responsePayload = JSON.parse(this.response.text);
    } catch (e) {
      throw new Error('Response not a valid JSON object');
    }
  };

  @then(/^contains a message property which says (?:"|')(.*)(?:"|')$/)
  public thenPayloadMessageShouldBe(message: string) {
    assert.equal(this.responsePayload.message, message);
  }
}
