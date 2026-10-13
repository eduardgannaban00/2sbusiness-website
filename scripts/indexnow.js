/* Manual, opt-in IndexNow notifier. It never runs during build. */
const https = require("https");
const key = process.env.INDEXNOW_KEY;
const urls = process.argv.slice(2);

if (!key || !/^[A-Za-z0-9-]{8,128}$/.test(key) || urls.length === 0) {
  console.error("Usage: INDEXNOW_KEY=<verification-key> node scripts/indexnow.js <canonical-url> [...url]");
  process.exit(1);
}

const parsed = urls.map((value) => new URL(value));
if (parsed.some((url) => url.origin !== "https://2sbusinesssupport.com" || !url.pathname.endsWith("/"))) {
  console.error("Only canonical https://2sbusinesssupport.com/ URLs ending in / may be submitted.");
  process.exit(1);
}

const body = JSON.stringify({ host: "2sbusinesssupport.com", key, keyLocation: `https://2sbusinesssupport.com/${key}.txt`, urlList: urls });
const request = https.request({ hostname: "api.indexnow.org", path: "/IndexNow", method: "POST", headers: { "Content-Type": "application/json; charset=utf-8", "Content-Length": Buffer.byteLength(body) } }, (response) => {
  let data = "";
  response.on("data", (chunk) => { data += chunk; });
  response.on("end", () => { console.log(`IndexNow response: HTTP ${response.statusCode}${data ? ` ${data.slice(0, 200)}` : ""}`); process.exit(response.statusCode >= 200 && response.statusCode < 300 ? 0 : 1); });
});
request.on("error", (error) => { console.error(`IndexNow request failed: ${error.message}`); process.exit(1); });
request.end(body);
