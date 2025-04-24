import { createReadStream } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const read = async () => {
    const filePath = join(__dirname, 'files', 'fileToRead.txt');
    const readStream = createReadStream(filePath, 'utf-8');
    
    readStream.pipe(process.stdout);
    
    return new Promise((resolve, reject) => {
        readStream.on('error', reject);
        readStream.on('end', resolve);
    });
};

await read();