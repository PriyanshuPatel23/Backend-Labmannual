const { spawn } = require('child_process');

const isWin = process.platform === 'win32';
const cmd = isWin ? 'cmd' : 'ls';
const args = isWin ? ['/c', 'dir'] : ['-la'];

const child = spawn(cmd, args, { stdio: 'inherit' });

child.on('error', err => console.error('spawn error:', err));

child.on('close', code => console.log(`Command exited with code ${code}`))