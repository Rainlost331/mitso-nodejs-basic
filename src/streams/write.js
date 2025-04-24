import { createWriteStream } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const write = async () => {
    const filePath = join(__dirname, 'files', 'fileToWrite.txt');
    const writeStream = createWriteStream(filePath);
    
    process.stdin.pipe(writeStream);
    
    return new Promise((resolve, reject) => {
        writeStream.on('error', reject);
        writeStream.on('finish', resolve);
    });
};

await write();