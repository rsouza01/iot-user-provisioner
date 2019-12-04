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

  it.only('Create user successfully', async () => {

    const request = superagent('POST', `${server}${path}`);

    let response;

    const payload = getValidPayload();

    await request
      .send(JSON.stringify(payload))
      .set('Content-Type', 'application/json')
      .then((res) => {
        expect(res).not.to.be.undefined;
        expect(res.text).not.to.be.undefined;
      })
      .catch((error) => {
        expect(error).to.be.undefined;
        expect(true).to.be.false;
      });

  });
});