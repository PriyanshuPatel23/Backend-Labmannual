const os = require('os');

const cpus = os.cpus();
console.log('Number of CPU cores:', cpus.length);
cpus.forEach((cpus, idx) => {
    console.log(`Core #${idx + 1} model : ${cpus.model}`)
})

const nets = os.networkInterfaces();
console.log('\nNetwork Interfaces');
for (const [name, infos] of Object.entries(nets)) {
    console.log(`- ${name}`);
    infos.forEach(info => {
        console.log(`Family : ${info.family}`)
        console.log(`Address : ${info.address}`)
        console.log(`NetMask : ${info.netmask}`)
        console.log(`Mac : ${info.mac}`)
        console.log(`Internal : ${info.internal}`)
        if (info.scopeId !== undefined) console.log(`scopeId : ${info.scopeId}`);
    })
}