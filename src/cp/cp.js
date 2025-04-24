import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const spawnChildProcess = async (args) => {
    const scriptPath = join(__dirname, 'files', 'script.js');
    const child = spawn('node', [scriptPath, ...args], {
        stdio: ['pipe', 'pipe', 'inherit', 'ipc']
    });

    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);

    child.on('exit', (code, signal) => {
        if (code !== null) {
            console.log(`Child process exited with code ${code}`);
        } else {
            console.log(`Child process terminated by signal ${signal}`);
        }
    });

    child.on('error', (err) => {
        console.error('Child process error:', err);
    });

    return child;
};

await spawnChildProcess(['--arg1', '--arg2', 'value']);