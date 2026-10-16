const { exec } = require('child_process');

exec('node -v', (error, stdout, stderr) => {
    if(error){
        console.error(`exec error: ${error.message}`);
        return;
    }
    if(stderr){
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log(`Current Node Version: ${stdout.trim()}`);
})