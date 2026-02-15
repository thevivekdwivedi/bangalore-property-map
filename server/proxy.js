// Lightweight Node.js backend proxy for GTFS-RT feeds (CORS bypass)
// Run: node server/proxy.js

import http from 'node:http';
import https from 'node:https';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PORT = process.env.PORT || 3000;
const DULT_BASE = 'https://tdh.dult-karnataka.com';

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

function proxyRequest(targetUrl, res) {
  https.get(targetUrl, { timeout: 10000 }, (upstream) => {
    const chunks = [];
    upstream.on('data', c => chunks.push(c));
    upstream.on('end', () => {
      const body = Buffer.concat(chunks).toString();
      res.writeHead(upstream.statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(body);
    });
  }).on('error', (err) => {
    res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Upstream fetch failed', message: err.message }));
  });
}

async function serveStatic(filePath, res) {
  try {
    const ext = extname(filePath);
    const mime = MIME_TYPES[ext] || 'application/octet-stream';
    const content = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': mime });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // API proxy routes
  if (url.pathname === '/api/gtfs-rt') {
    return proxyRequest(`${DULT_BASE}/api/bmrcl/vehicle-positions`, res);
  }
  if (url.pathname === '/api/gtfs-rt/bmtc') {
    return proxyRequest(`${DULT_BASE}/api/bmtc/vehicle-positions`, res);
  }

  // Static file serving - serve from project root
  const projectRoot = resolve(__dirname, '..');
  let filePath;
  if (url.pathname === '/' || url.pathname === '/index.html') {
    filePath = resolve(projectRoot, 'bangalore_metro_map_highlighted.html');
  } else {
    filePath = resolve(projectRoot, url.pathname.slice(1));
  }

  // Security: prevent directory traversal
  if (!filePath.startsWith(projectRoot)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  await serveStatic(filePath, res);
});

server.listen(PORT, () => {
  console.log(`Namma Metro proxy server running at http://localhost:${PORT}`);
  console.log(`GTFS-RT proxy: http://localhost:${PORT}/api/gtfs-rt`);
});
