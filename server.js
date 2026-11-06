const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 4173;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

http
  .createServer((req, res) => {
    let pathname;
    try {
      pathname = decodeURIComponent((req.url || "/").split("?")[0]);
    } catch {
      res.writeHead(400).end("Bad request");
      return;
    }

    let file = path.join(ROOT, pathname === "/" ? "index.html" : pathname);
    if (file !== ROOT && !file.startsWith(ROOT + path.sep)) {
      res.writeHead(403).end("Forbidden");
      return;
    }

    fs.stat(file, (err, stat) => {
      if (!err && stat.isDirectory()) file = path.join(file, "index.html");

      fs.readFile(file, (readErr, buffer) => {
        if (readErr) {
          res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
          res.end("<h1>404</h1><p>That frame is not in this reel.</p>");
          return;
        }
        res.writeHead(200, {
          "content-type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream",
          "cache-control": "no-cache",
        });
        res.end(buffer);
      });
    });
  })
  .listen(PORT, () => {
    console.log(`softenskill → http://localhost:${PORT}`);
  });
