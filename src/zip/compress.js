import { createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const compress = async () => {
    const sourceFile = join(__dirname, 'files', 'fileToCompress.txt');
    const archiveFile = join(__dirname, 'files', 'archive.gz');
    
    const readStream = createReadStream(sourceFile);
    const writeStream = createWriteStream(archiveFile);
    const gzip = createGzip();
    
    readStream.pipe(gzip).pipe(writeStream);
    
    return new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
        readStream.on('error', reject);
    });
};

await compress();