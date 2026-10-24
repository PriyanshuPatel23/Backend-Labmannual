const path = require('path');

const messy = '"//folder//subfolder////file.txt'

const clean = path.normalize(messy);

console.log("Original:", messy);
console.log("Cleaned:", clean);