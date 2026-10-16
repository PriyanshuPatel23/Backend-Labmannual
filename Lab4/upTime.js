const os = require('os');

const secs = os.uptime();
const hrs = (secs / 3600).toFixed(2);

console.log(`uptime : ${secs} seconds`);
console.log(`uptime : ${hrs} hours`);