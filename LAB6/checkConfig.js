const fs = require('fs');
const path = require('path');

const cfgpath = path.join(__dirname, 'config.json');

if (fs.existsSync(cfgpath)) {
    console.log('exists')
} else {
    console.log('not found')
}