var assert = require("assert");
import {Server, Account, Category} from "../dist/transaction";
import '@babel/polyfill';

const HOST="transactionserver"
const PORT=8000

function createServer() {
  return new Server(`http://${HOST}:${PORT}`);
}

describe("Account", function () {
  it("can be created and deleted", async ()=>{
    const server = createServer();
    const acct = new Account(null, "A fancy name");
    let resp = await acct.save(server);
    assert.ok(resp);
    resp = await acct.delete(server);
    assert.ok(resp);
  });
  it("can be retrieved", async ()=>{
    const server = createServer();
    const created = new Account(null, "A fancy name");
    await created.save(server);
    const retrieved = await server.getAccount(created.id())
    assert.strictEqual(created.name(), retrieved.name());
    const resp = await created.delete(server);
    assert.ok(resp);
  });
});

/*describe("Category", function () {
  it("can be created and deleted", async ()=>{
    const server = createServer();
    const cat = new Category(null, "A fancy name", null);
    let resp = await cat.save(server);
    assert.ok(resp);
    resp = await cat.delete(server);
    assert.ok(resp);
  });
  it("can be retrieved", async ()=>{
    const server = createServer();
    const created = new Category(null, "A fancy name", null);
    await created.save(server);
    const retrieved = await server.getCategory(created.id())
    assert.strictEqual(created.name(), retrieved.name());
    const resp = await created.delete(server);
    assert.ok(resp);
  });
});
*/

