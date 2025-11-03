import path from 'path';
import fs from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream';

export const compressFile = (pathdir, src, desc) => {
  const srcPath = path.join(pathdir, src);
  const descPath = path.join(pathdir, desc);

  const brotli = zlib.createBrotliCompress();
  const readStream = fs.createReadStream(srcPath);
  const writeStream = fs.createWriteStream(descPath);

  pipeline(readStream, brotli, writeStream, (err) => {
    if (err) console.log('Operation failed');
  });
};

export const decompressFile = (pathdir, src, desc) => {
  const srcPath = path.join(pathdir, src);
  const descPath = path.join(pathdir, desc);

  const brotli = zlib.createBrotliDecompress();
  const readStream = fs.createReadStream(srcPath);
  const writeStream = fs.createWriteStream(descPath);

  pipeline(readStream, brotli, writeStream, (err) => {
    if (err) console.log('Operation failed');
  });
};
