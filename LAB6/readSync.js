const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.txt');

try{
    const data = fs.readFileSync(filePath, 'utf8');
    console.log('File content', data);
}
catch (err){
    console.error('sync error', err.message);
}