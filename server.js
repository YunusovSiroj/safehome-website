const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, "data");
const DATA_FILE = path.join(DATA_DIR, "store.json");
const SEED_FILE = path.join(ROOT, "store.seed.json");

// Committed baseline CMS content — parsed once at boot. The Railway container
// disk is not persistent, so data/store.json is wiped on every redeploy; the
// seed guarantees the site never falls back to the hardcoded placeholders.
// Live edits (data/store.json) always override the seed, key by key.
const SEED = (() => {
  try {
    return JSON.parse(fs.readFileSync(SEED_FILE, "utf8"));
  } catch (e) {
    return {};
  }
})();

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function loadStore() {
  let disk = {};
  try {
    disk = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch (e) {
    disk = {};
  }
  return { ...SEED, ...disk };
}

function saveStore(store) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(store));
}

function withCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);

  if (urlPath === "/api/store") {
    withCors(res);
    if (req.method === "OPTIONS") { res.writeHead(204); return res.end(); }
    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(loadStore()));
    }
    if (req.method === "POST") {
      let raw = "";
      req.on("data", (c) => { raw += c; if (raw.length > 8_000_000) req.destroy(); });
      req.on("end", () => {
        let body;
        try { body = JSON.parse(raw); } catch (e) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ ok: false, error: "bad json" }));
        }
        if (!body || typeof body.key !== "string") {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ ok: false, error: "missing key" }));
        }
        const store = loadStore();
        store[body.key] = body.value;
        saveStore(store);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ok: true }));
      });
      return;
    }
    res.writeHead(405);
    return res.end();
  }

  let filePath = urlPath;
  if (filePath === "/") filePath = "/index-v3.html";
  const fullPath = path.join(ROOT, path.normalize(filePath).replace(/^(\.\.[\/\\])+/, ""));
  if (!fullPath.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.readFile(fullPath, (err, data) => {
    if (err) { res.writeHead(404, { "Content-Type": "text/plain" }); return res.end("Not found"); }
    res.writeHead(200, { "Content-Type": MIME[path.extname(fullPath).toLowerCase()] || "application/octet-stream" });
    res.end(data);
  });
}).listen(PORT, () => console.log("Listening on " + PORT));
