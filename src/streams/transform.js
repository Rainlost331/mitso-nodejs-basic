import { Transform } from 'stream';

const transform = async () => {
    const reverseTransform = new Transform({
        transform(chunk, encoding, callback) {
            const reversedText = chunk.toString().split('').reverse().join('');
            this.push(reversedText);
            callback();
        }
    });
    
    process.stdin
        .pipe(reverseTransform)
        .pipe(process.stdout);
    
    return new Promise((resolve, reject) => {
        process.stdin.on('error', reject);
        process.stdout.on('error', reject);
        process.stdout.on('finish', resolve);
    });
};

await transform();