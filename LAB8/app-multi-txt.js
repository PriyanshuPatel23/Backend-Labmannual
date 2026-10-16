const express = require('express');
const fs      = require('fs');
const path    = require('path');

const app = express();
const pagesDir = path.join(__dirname, 'pages');

function serveFile(res, fileName) {
  const filePath = path.join(pagesDir, fileName);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(404).type('text/plain').send('File not found');
    } else {
      res.type('text/plain').send(data);
    }
  });
}

app.get('/', (req,res) => serveFile(res, 'home.txt'))
app.get('/about', (req,res) => serveFile(res, 'about.txt'))
app.get('/contact', (req,res) => serveFile(res, 'contact.txt'))

app.use((req, res) => {
  res.status(404).type('text/plain').send('404 – page not found');
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`File‑based Express server listening at http://localhost:${PORT}`);
  console.log('Routes → text files:');
  console.log('  /        → home.txt');
  console.log('  /about   → about.txt');
  console.log('  /contact → contact.txt');
});
