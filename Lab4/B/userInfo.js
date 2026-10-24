const os = require('os');

const user = os.userInfo();

console.log('Username   :', user.username);
console.log('UID        :', user.uid);
console.log('GID        :', user.gid);
console.log('Home dir   :', user.homedir);
console.log('Shell      :', user.shell);