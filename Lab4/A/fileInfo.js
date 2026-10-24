const path = require('path');

const fullPath = __filename;
const dirName = __dirname;
const baseName = path.basename(fullPath);
const extName = path.extname(fullPath);

console.log('Directory :', dirName);
console.log('File name :', baseName);
console.log('Extension :', extName);
console.log('Full path :', fullPath);