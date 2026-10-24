const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url")

const map = {
    '/': 'home.txt',
    '/about': 'about.txt',
    '/contact': 'contact.txt',
}

const server = http.createServer((req, res) => {
    const myUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = myUrl.pathname;
    const fileName = map[pathname]
    
    if (!fileName) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 – page not found');
    }
    const filePath = path.join(__dirname, 'pages', fileName);

    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

    readStream.on('open', () => {
        res.writeHead(200, { 'content-type': 'text/plain' });
        readStream.pipe(res);
    })

    readStream.on('error', err => {
        console.error('File read error:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 internal server error');
    });
})

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🚀 File‑based server listening on http://localhost:${PORT}`);
    console.log('Routes:');
    Object.keys(map).forEach(p => console.log(`  ${p} → ${map[p]}`));
});