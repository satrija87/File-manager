import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import path from 'path';

export const hashFile = (pathdir, file) => {
  try {
    const fullpath = path.join(pathdir, file);
    const input = createReadStream(fullpath);
    const hash = createHash('sha256');

    input.on('data', (chunk) => hash.update(chunk));

    input.on('end', () => {
      console.log(hash.digest('hex'));
    });

    input.on('error', () => {
      console.log('Operation failed');
    });
  } catch {
    console.log('Operation failed');
  }
};
