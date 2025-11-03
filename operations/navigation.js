import { readdir } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { cwd as processCwd, chdir } from 'node:process';
import { stat, access } from 'node:fs/promises';
import { constants } from 'node:fs';

export const getList = async (dir) => {
  const items = await readdir(dir, { withFileTypes: true });

  const files = items
    .filter((i) => i.isFile())
    .map((i) => ({ name: i.name, type: 'File' }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const directories = items
    .filter((i) => i.isDirectory())
    .map((i) => ({ name: i.name, type: 'Directory' }))
    .sort((a, b) => a.name.localeCompare(b.name));

  console.table([...directories, ...files]);
};

export const goUpper = (dir) => {
  const root = path.parse(dir).root;
  const parent = path.resolve(dir, '..');

  if (parent === dir || parent.length < root.length) return dir;

  return parent;
};

export const goToFolder = async (folder, cwd) => {
  const target = path.isAbsolute(folder) ? folder : path.resolve(cwd, folder);

  const stats = await stat(target).catch(() => {
    throw new Error('Invalid path');
  });

  if (!stats.isDirectory()) {
    throw new Error('Not a directory');
  }

  return target;
};
