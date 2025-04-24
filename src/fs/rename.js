import { rename as fsRename, access, constants } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const renameFile = async () => {
    const oldPath = join(__dirname, 'files', 'wrongFilename.txt');
    const newPath = join(__dirname, 'files', 'properFilename.md');

    try {
        await access(oldPath, constants.F_OK);
        try {
            await access(newPath, constants.F_OK);
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code !== 'ENOENT') throw err;
            await fsRename(oldPath, newPath);
        }
    } catch (err) {
        if (err.code === 'ENOENT' || err.message === 'FS operation failed') {
            throw new Error('FS operation failed');
        }
        throw err;
    }
};

await renameFile();