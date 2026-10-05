const fs = require("fs");
const http = require("http");
const path = require("path");

const root = path.resolve(__dirname, "..", "dist");
const port = Number(process.env.PREVIEW_PORT || 4173);
const mime = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

if (!fs.existsSync(root)) {
  console.error("dist/ is missing. Run npm.cmd run build first.");
  process.exit(1);
}

http
  .createServer((request, response) => {
    const requestPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const relative = requestPath.replace(/^\/+/, "");
    let file = path.resolve(root, relative);
    if (requestPath.endsWith("/")) file = path.join(file, "index.html");
    if (!file.startsWith(root + path.sep) && file !== root) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    fs.stat(file, (statError, stat) => {
      if (statError || !stat.isFile()) {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
        return;
      }
      response.writeHead(200, {
        "Content-Type": mime[path.extname(file).toLowerCase()] || "application/octet-stream",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      });
      if (request.method === "HEAD") response.end();
      else fs.createReadStream(file).pipe(response);
    });
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`2S local release preview: http://localhost:${port}/`);
    console.log("Press Ctrl+C to stop.");
  });
