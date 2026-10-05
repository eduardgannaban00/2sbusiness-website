const assert = require("assert");
const { normalizeWebPath } = require("./verify");

assert.strictEqual(
  normalizeWebPath("resources\\dental\\article\\"),
  "resources/dental/article/"
);
assert.strictEqual(
  normalizeWebPath("resources/roofing/article/"),
  "resources/roofing/article/"
);

console.log("PASS  verifier normalizes Windows and POSIX paths consistently");
