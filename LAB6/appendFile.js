const fs = require('fs');
const path = require('path');
const outPath = path.join(__dirname, 'output.txt');
const extra   = `Appended at ${new Date().toISOString()}\n`;
fs.appendFile(outPath, extra, 'utf8', err => {
  if (err) {
    console.error('Append failed:', err.message);
    return;
  }
  console.log('Text appended to output.txt');
});