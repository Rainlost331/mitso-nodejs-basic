import { readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const read = async () => {
    const filePath = join(__dirname, 'files', 'fileToRead.txt');

    try {
        const content = await readFile(filePath, { encoding: 'utf8' });
        console.log(content);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('FS operation failed');
        }
        throw err;
    }
};

await read();