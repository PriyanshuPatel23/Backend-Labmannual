const http = require('http');
const url = require('url');

const routes = {
    '/':          '<h1>Home</h1><p>Welcome to our site.</p>',
  '/about':     '<h1>About</h1><p>We are a demo site.</p>',
  '/contact':   '<h1>Contact</h1><p>email@example.com</p>',
  '/services':  '<h1>Services</h1><p>We offer X, Y, Z.</p>',
  '/faq':       '<h1>FAQ</h1><p>Frequently asked questions.</p>',
}

const server = http.createServer((req,res) => {
    const pathname = url.parse(req.url).pathname;
    const content = routes[pathname] || '<h1>404 - not found</h1>'

    const status = routes[pathname] ? 200 : 400;
    res.writeHead(status, {'content-type': 'text/html'})
    res.end(content);
})

const port = 3000;
server.listen(port, () => {
    console.log(`🚀 Multi‑page server listening on http://localhost:${port}`);
    console.log('Available pages: /, /about, /contact, /services, /faq');
})