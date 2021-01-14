var assert = require("assert");
import {Server, Account} from "../dist/transaction";
import '@babel/polyfill';

describe("Account", function () {
  it("works", async ()=>{
    const server = new Server("http://127.0.0.1:8000");
    const acct = new Account("A fancy name");
    const resp = await acct.save(server);
    assert.ok(resp);
  });
});
