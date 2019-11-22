import { binding, given, then, when } from 'cucumber-tsflow';
import { assert } from 'chai';

import superagent from 'superagent';

@binding()
export class UserCreateSteps {

  private request: any;
  private result: any;
  private error: any;

  @when(/the client creates a POST request to \/user/)
  public createPost() {
    this.request = superagent('POST', 'localhost:8080/user');
  }

  @when(/attaches a generic empty payload/)
  public attachGenericPayload() {
    return undefined;
  }

  @when(/sends the request/)
  public sendRequest(callback) {
    this.request.then((response) => {
      this.result = response.res;
      callback();
    })
      .catch((errResponse) => {
        this.error = errResponse.response;
        callback();
      });
  }

  @then(/our API should respond with a 400 HTTP status code/)
  public checkHTTPResponse() {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>', this.error.statusCode);
    
    if (this.error.statusCode !== 400) {
      throw new Error();
    }
  }

  @then(/the payload of the response should be a JSON object/)
  public checkPayloadContentType() {
  }

  @then(/contains a message property which says "Payload should not be empty"/)
  public checkPayloadMessage() {
  }

}
