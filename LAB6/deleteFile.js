const fs = require('fs');
const path = require('path');

const tmpPath = path.join(__dirname, 'tempt.txt');

fs.unlink(tmpPath, err => {
    if (err) {
        if (err.code == 'ENOENT') {
            console.warn("File not exists");
        }
        else {
            console.error("Could not delete file", err.message);
        }
        return;
    }
    console.log("File Deleted Successfully");
})