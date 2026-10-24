const fs = require('fs');
const path = require('path');

const docsPath = path.join(__dirname, 'documents');

fs.readdir(docsPath, (err, files) => {
  if (err) {
    console.error('Unable to read documents folder:', err.message);
    return;
  }
  if (files.length === 0) {
    console.log('documents/ is empty.');
    return;
  }
  console.log('Files in documents : \n');
  files.forEach(f => console.log(f));
});
