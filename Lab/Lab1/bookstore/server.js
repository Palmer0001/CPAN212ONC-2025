const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const filePath = getFilePath(req.url);

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, 'pages', '404.html'), (err, content404) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content404, 'utf-8');
                });
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            const extname = path.extname(filePath);
            const contentType = getContentType(extname);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

function getFilePath(url) {
    if (url === '/' || url === '/index') return path.join(__dirname, 'pages', 'index.html');
    if (url === '/about') return path.join(__dirname, 'pages', 'about.html');
    if (url === '/contact') return path.join(__dirname, 'pages', 'contact.html');
    return path.join(__dirname, 'pages', '404.html');
}

function getContentType(ext) {
    switch (ext) {
        case '.html': return 'text/html';
        case '.js': return 'application/javascript';
        default: return 'text/plain';
    }
}

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});