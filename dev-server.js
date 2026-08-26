/**
 * Yerel önizleme sunucusu — sadece geliştirme için.
 *
 * Site tamamen statiktir ve Vercel tarafından doğrudan servis edilir;
 * bu dosya üretimde kullanılmaz. Bağımlılığı yoktur, `npm install`
 * gerektirmez: node dev-server.js
 */

'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;
const ROOT = __dirname;

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.pdf': 'application/pdf',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain; charset=utf-8',
    '.xml': 'application/xml; charset=utf-8',
    '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
    // Sorgu dizesini at, yolu çöz
    let rel = decodeURIComponent(req.url.split('?')[0]);
    if (rel === '/') rel = '/index.html';

    // Dizin dışına çıkmayı engelle
    const filePath = path.join(ROOT, path.normalize(rel));
    if (!filePath.startsWith(ROOT)) {
        res.writeHead(403).end('Forbidden');
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            // Bilinmeyen yol → SPA girişine düş
            fs.readFile(path.join(ROOT, 'index.html'), (e2, html) => {
                if (e2) { res.writeHead(404).end('Not Found'); return; }
                res.writeHead(200, { 'Content-Type': MIME['.html'] }).end(html);
            });
            return;
        }
        res.writeHead(200, {
            'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
            // Geliştirmede önbellek istemiyoruz — düzenleme anında görünsün
            'Cache-Control': 'no-cache, no-store, must-revalidate'
        }).end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Önizleme çalışıyor: http://localhost:${PORT}`);
});
