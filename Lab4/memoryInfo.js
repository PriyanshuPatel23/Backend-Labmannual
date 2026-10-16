const os = require('os');

const bytesToGB = b => (b / (1024 ** 3)).toFixed(2);

console.log("Total Memory :", bytesToGB(os.totalmem()), 'GB');
console.log('Free memory :', bytesToGB(os.freemem()), 'GB');