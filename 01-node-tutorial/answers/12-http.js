const http = require('http');

http.createServer((req, res) => {
    if (req.url === '/') {
        res.end('test');
    }
}).listen(3000);