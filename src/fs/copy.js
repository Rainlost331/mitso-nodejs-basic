import { cp, access, constants } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const copy = async () => {
    const sourceDir = join(__dirname, 'files');
    const targetDir = join(__dirname, 'files_copy');

    try {
        await access(sourceDir, constants.F_OK);
        try {
            await access(targetDir, constants.F_OK);
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code !== 'ENOENT') throw err;
            await cp(sourceDir, targetDir, { recursive: true, force: false });
        }
    } catch (err) {
        if (err.code === 'ENOENT' || err.message === 'FS operation failed') {
            throw new Error('FS operation failed');
        }
        throw err;
    }
};

await copy();