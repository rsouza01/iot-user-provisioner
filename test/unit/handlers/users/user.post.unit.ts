import { expect } from "chai";
import "mocha";

import superagent from "superagent";

const getValidPayload = () => {
  return {
    email: "e@ma.il",
    password: "password"
  };
};

const server = `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}/user`;

describe("User - POST Handler", () => {
  it.skip("Create user successfully", async () => {
    const request = superagent("POST", server);

    let response;

    const payload = getValidPayload();

    await request
      .send(JSON.stringify(payload))
      .set("Content-Type", "application/json")
      .then(res => {
        expect(res).not.to.be.undefined;
        expect(res.text).not.to.be.undefined;
      })
      .catch(error => {
        expect(error).to.be.undefined;
        expect(true).to.be.false;
      });
  });
});
