import { createReadStream, createWriteStream } from 'fs';
import { writeFile, mkdir, rename, unlink, stat, rm } from 'fs/promises';
import { cwd } from 'process';
import { join, basename } from 'path';
import { pipeline } from 'stream/promises';
import { stdin, stdout } from 'process';
import path from 'path';

export const cat = async (pathdir, filepath) => {
  try {
    const fullpath = join(pathdir, filepath);
    const readStream = createReadStream(fullpath, { encoding: 'utf-8' });
    await pipeline(readStream, stdout, { end: false });
    stdout.write('\n');
  } catch {
    console.log('Operation failed');
  }
};
export const addNewFile = async (pathdir, file) => {
  try {
    const fullpath = join(pathdir, file);
    await writeFile(fullpath, '');
  } catch {
    console.log('Operation failed');
  }
};
export const addNewDirectory = async (pathdir, name) => {
  try {
    const fullpath = join(pathdir, name);
    await mkdir(fullpath);
  } catch {
    console.log('Operation failed');
  }
};
export const renameFile = async (pathdir, name, newname) => {
  try {
    const fullpath = join(pathdir, name);
    const fullNewpath = join(pathdir, newname);
    await rename(fullpath, fullNewpath);
  } catch {
    console.log('Operation failed');
  }
};
export const copyFile = async (pathdir, src, desc) => {
  try {
    const srcPath = join(pathdir, src);
    const descPath = join(pathdir, desc);
    const readStream = createReadStream(srcPath);
    const writeStream = createWriteStream(descPath);
    await pipeline(readStream, writeStream);
  } catch {
    console.log('Operation failed');
  }
};

export const moveFile = async (pathdir, src, desc) => {
  try {
    await copyFile(pathdir, src, desc);
    const srcPath = join(pathdir, src);
    await unlink(srcPath);
  } catch {
    console.log('Operation failed');
  }
};
export const removeFile = async (pathdir, file) => {
  try {
    const fullpath = join(pathdir, file);
    await rm(fullpath);
  } catch {
    console.log('Operation failed');
  }
};
