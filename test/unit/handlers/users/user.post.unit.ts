import { expect } from 'chai';
import 'mocha';

import superagent from 'superagent';

const getValidPayload = () => {
  return {
    email: 'e@ma.il',
    password: 'password',
  };
}

const server: string = 'http://localhost:8080';
const path: string = '/user';

describe('User - POST Handler', () => {

  it.only('Create instance', async () => {

    const request = superagent('POST', `${server}${path}`);

    let response;

    const payload = getValidPayload();

    console.log('>>>>>>> PAYLOAD: ', payload);

    await request
      .send(JSON.stringify(payload))
      .set('Content-Type', 'application/json')
      .then((res) => {
        response = res;
        console.log('>>>>>>>>>>> RESPONSE OK');
      })
      .catch((error) => {
        console.log('>>>>>>>>>>> ERROR: ', error);
      });

      console.log('>>>>>>>>>>> responsePayload.statusCode: ', response ? response.statusCode : 0);
    });
});