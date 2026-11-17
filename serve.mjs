// Zero-dependency static server for the Forge Harness website preview.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".");
const MIME = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".webp": "image/webp" };

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let rel = urlPath === "/" ? "index.html" : urlPath.slice(1);
  const abs = path.resolve(root, rel);
  if (!abs.startsWith(root)) { res.writeHead(403); res.end(); return; }
  fs.readFile(abs, (err, data) => {
    if (err) { res.writeHead(404); res.end("not found"); return; }
    res.writeHead(200, { "content-type": MIME[path.extname(abs).toLowerCase()] ?? "application/octet-stream", "cache-control": "no-cache" });
    res.end(data);
  });
}).listen(47899, "127.0.0.1", () => console.log("Forge Harness website → http://127.0.0.1:47899"));
