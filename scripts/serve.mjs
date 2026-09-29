import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";

const root = path.resolve("out");
const port = Number(process.env.PORT || 3000);
const compressedFiles = new Map();
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".pdf": "application/pdf" };

try { await stat(path.join(root, "index.html")); } catch { console.error("No static export found. Run npm run build first."); process.exit(1); }

const server = http.createServer(async (request, response) => {
  if (!["GET", "HEAD"].includes(request.method)) {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    let file = path.resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(`${root}${path.sep}`)) {
      response.writeHead(403).end("Forbidden"); return;
    }
    let status = 200;
    try {
      const info = await stat(file);
      if (info.isDirectory()) file = path.join(file, "index.html");
      await stat(file);
    } catch { file = path.join(root, "404.html"); status = 404; }
    let content = await readFile(file);
    const headers = { "Content-Type": types[path.extname(file)] || "application/octet-stream", "X-Content-Type-Options": "nosniff", "Cache-Control": file.includes(`${path.sep}_next${path.sep}static${path.sep}`) ? "public, max-age=31536000, immutable" : "no-cache", "Vary": "Accept-Encoding" };
    if (/\.(html|css|js|json|svg|txt|xml)$/.test(file) && request.headers["accept-encoding"]?.includes("gzip")) {
      const modified = (await stat(file)).mtimeMs;
      const cached = compressedFiles.get(file);
      if (cached?.modified === modified) content = cached.content;
      else { content = gzipSync(content); compressedFiles.set(file, { modified, content }); }
      headers["Content-Encoding"] = "gzip";
    }
    response.writeHead(status, headers);
    response.end(request.method === "HEAD" ? undefined : content);
  } catch { response.writeHead(400).end("Bad request"); }
});

server.listen(port, "127.0.0.1", () => console.log(`Static portfolio: http://127.0.0.1:${port}`));
