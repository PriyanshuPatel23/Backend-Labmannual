const fs = require('fs');
const path = require('path');

const outPath = path.join(__dirname, 'output.txt');

const content = `First line written at ${new Date().toISOString()}\n`

fs.writeFile(outPath, content, 'utf8', err => {
    if(err){
        console.error('write failed', err.message);
        return;
    }
    console.log("Output text created with content")
})