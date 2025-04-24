import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const calculateHash = async () => {
    const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');
    
    try {
        const fileContent = await readFile(filePath);
        const hash = createHash('sha256').update(fileContent).digest('hex');
        console.log(hash);
    } catch (err) {
        console.error('Error calculating hash:', err.message);
        throw err;
    }
};

await calculateHash();