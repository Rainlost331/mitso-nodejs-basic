import { Worker, isMainThread } from 'worker_threads';
import { cpus } from 'os';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const performCalculations = async () => {
    if (!isMainThread) return;

    const cpuCount = cpus().length;
    const workers = [];
    const results = new Array(cpuCount).fill(null);

    for (let i = 0; i < cpuCount; i++) {
        const worker = new Worker(`${__dirname}/worker.js`, {
            workerData: 10 + i
        });
        
        workers.push(worker);
        
        worker.on('message', (result) => {
            results[i] = result;
            checkCompletion();
        });
        
        worker.on('error', () => {
            results[i] = { status: 'error', data: null };
            checkCompletion();
        });
        
        worker.on('exit', (code) => {
            if (code !== 0) {
                results[i] = { status: 'error', data: null };
                checkCompletion();
            }
        });
    }

    function checkCompletion() {
        if (results.every(result => result !== null)) {
            console.log(results);
            workers.forEach(worker => worker.terminate());
        }
    }
};

await performCalculations();