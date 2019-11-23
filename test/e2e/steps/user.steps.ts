import { binding, given, then, when } from 'cucumber-tsflow';
import assert from 'assert';

import superagent from 'superagent';

/**PAGE 153 */

@binding()
export class UserCreateSteps {

  private response: any;
  private responsePayload: any;
  private request: any;

  @when(/the client creates a POST request to \/user/)
  public createPost() {
    const url =  `${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}/user`;
    console.log('URL: ' + url);
    
    this.request = superagent('POST',url);
    this.request = superagent('POST', 'localhost:8080/user');
  }

  @when(/attaches a generic empty payload/)
  public attachGenericPayload() {
    return undefined;
  }

  @when(/sends the request/)
  public sendRequest(callback) {
    this.request.then((response) => {
      this.response = response.res;
      callback();
    })
      .catch((errResponse) => {
        this.response = errResponse.response;
        callback();
      });
  }

  @then(/our API should respond with a 400 HTTP status code/)
  public checkHTTPResponse() {
    assert.equal(this.response.statusCode, 400);
  }

  @then(/the payload of the response should be a JSON object/)
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

  @then(/contains a message property which says "Payload should not be empty"/)
  public checkPayloadMessage() {
    if (this.responsePayload.message !== 'Payload should not be empty') {
      throw new Error();
    }
  }

}
