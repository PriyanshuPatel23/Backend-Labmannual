const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end('<h1>Hello, World!</h1>');
})

const port = 3000;
server.listen(port, () => {
    console.log('Hello world sever listening on localhost 3000')
})