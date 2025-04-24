import { parentPort, workerData } from 'worker_threads';

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
    if (!parentPort) {
        throw new Error('This script must be run as a worker thread');
    }

    try {
        const result = nthFibonacci(workerData);
        parentPort.postMessage({ status: 'resolved', data: result });
    } catch (err) {
        parentPort.postMessage({ status: 'error', data: null });
    }
};

sendResult();