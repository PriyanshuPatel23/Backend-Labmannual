const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, 'my-data');

fs.mkdir(dirPath, { recursive: false }, err => {
    if (err) {
        if (err.code === 'EEXIST') {
            console.warn('Folder "my-data" already exists.');
        } else {
            console.error('mkdir error:', err.message);
        }
        return;
    }
    console.log('Folder "my-data" created.');

})