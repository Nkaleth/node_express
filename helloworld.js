const http = require('http');
const fs = require('fs');// import the built-in from Node.js (file system)
// This module provides an interface for working with the file system on your computer or server.

const port = process.env.PORT || 3000;

const serveStaticFile = (res, path, contentType, responseCode = 200) => {
  fs.readFile(__dirname + path, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('500- Internal Error');
    }
    res.writeHead(responseCode, { 'Content-type': contentType });
    res.end(data);
  });
};

const server = http.createServer((req, res) => {
  // normalize url by removing querystring, optional trailing slash, and
  // making lowercase
  const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLocaleLowerCase();
  switch (path) {
    case '':
      serveStaticFile(res, '/public/home.html', 'text/html');
      break;
    case '/about':
      serveStaticFile(res, '/public/about.html', 'text/html');
      break;
    case '/img/logo.png':
      serveStaticFile(res, '/public/img/logo.png', 'image/png');
      break;
    default:
      serveStaticFile(res, '/public/404.html', 'text/html', 404);
      break;
  }
});

server.listen(port, () => console.log(`server started on port ${port}; ` + 'press Ctrl-C to terminate...'));
