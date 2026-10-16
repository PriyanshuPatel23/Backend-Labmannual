const fs = require('fs');
const path = require('path');

const src = path.join(__dirname,'source.txt');
const dst = path.join(__dirname, 'backup.txt');

fs.copyFile(src, dst, err => {
    if(err){
        console.error('Copy Failed', err.message);
        return;
    }
    console.log("Copy success")
})