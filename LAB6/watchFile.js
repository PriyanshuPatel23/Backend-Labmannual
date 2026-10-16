const fs = require('fs');
const path = require('path');

const watchPath = path.join(__dirname, 'watchme.txt');

if (!fs.existsSync(watchPath)) {
  fs.writeFileSync(watchPath, 'Initial content\n', 'utf8');
  console.log('Created watchme.txt (initial content).');
}

console.log('Watching watchme.txt for changes...');

fs.watch(watchPath, (eventType, filename) => {
  if (eventType === 'change') {
    console.log('File Changed');
  }
});
