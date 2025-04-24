import { writeFile, access, constants } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const create = async () => {
    const filePath = join(__dirname, 'files', 'fresh.txt');
    const content = 'I am fresh and young';

    try {
        await access(filePath, constants.F_OK);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await writeFile(filePath, content);
        } else {
            throw new Error('FS operation failed');
        }
    }
};

await create();