const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const assets = path.join(root, "dist", "assets");
fs.mkdirSync(assets, { recursive: true });

for (const file of ["roi-formulas.js", "main.js"]) {
  fs.copyFileSync(path.join(root, "src", "js", file), path.join(assets, file));
}

console.log("Copied browser JavaScript assets");
