const os = require('os');

console.log('OS name : ', os.type());
console.log('Release :', os.release());
console.log('Platform :', os.platform());
console.log('Architecture :', os.arch());