var assert = require("assert");
import todo from "../dist/transaction";

describe("Package", function () {
  it("works", ()=>{
    assert.equal(todo(), 42);
  });
});
