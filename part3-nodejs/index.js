const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// load environment variables from .env file
dotenv.config();

const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/login' && req.method === 'GET') {
    const loginData = {
      username: process.env.USERNAME, password: process.env.PASSWORD};

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(loginData));
  } 

  else if (parsedUrl.pathname === '/users' && req.method === 'GET') {
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unable to read users data' }));
        return;
       }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  } 
  
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
