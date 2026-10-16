const path = require('path');

const paths = [
    'folder/subfolder',
    '/usr/local/bin',
    './relative.txt',
    'C:\\Windows\\system32',
]

paths.forEach(p => {
    console.log(`"${p}" -> ${path.isAbsolute(p) ? 'absolute' : 'relative'} `);
})