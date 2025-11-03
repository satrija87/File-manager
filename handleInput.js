import {
  cat,
  addNewFile,
  addNewDirectory,
  renameFile,
  copyFile,
  moveFile,
  removeFile,
} from './operations/files.js';
import { hashFile } from './operations/hash.js';
import { compressFile, decompressFile } from './operations/compress.js';
import { logOsInfo } from './operations/os.js';
import { getList, goUpper, goToFolder } from './operations/navigation.js';
import { checkArgs } from './utils/checkArgs.js';

export const handleInput = (input, pathdir) => {
  const [command, ...args] = input.split(' ');

  switch (command) {
    case 'cat':
      if (!checkArgs(args, 1)) return;
      cat(pathdir, args[0]);
      break;
    case 'add':
      if (!checkArgs(args, 1)) return;
      addNewFile(pathdir, args[0]);
      break;
    case 'mkdir':
      if (!checkArgs(args, 1)) return;
      addNewDirectory(pathdir, args[0]);
      break;
    case 'rn':
      if (!checkArgs(args, 2)) return;
      renameFile(pathdir, args[0], args[1]);
      break;
    case 'cp':
      if (!checkArgs(args, 2)) return;
      copyFile(pathdir, args[0], args[1]);
      break;
    case 'mv':
      if (!checkArgs(args, 2)) return;
      moveFile(pathdir, args[0], args[1]);
      break;
    case 'rm':
      if (!checkArgs(args, 1)) return;
      removeFile(pathdir, args[0]);
      break;
    case 'hash':
      if (!checkArgs(args, 1)) return;
      hashFile(pathdir, args[0]);
      break;
    case 'compress':
      if (!checkArgs(args, 2)) return;
      compressFile(pathdir, args[0], args[1]);
      break;
    case 'decompress':
      if (!checkArgs(args, 2)) return;
      decompressFile(pathdir, args[0], args[1]);
      break;
    case 'os':
      if (!checkArgs(args, 1)) return;
      logOsInfo(args[0]);
      break;
    case 'ls':
      getList(pathdir);
      break;
    case 'up':
      return goUpper(pathdir);
      break;
    case 'cd':
      if (!checkArgs(args, 1)) return pathdir;
      pathdir = goToFolder(args[0], pathdir);
      break;
    default:
      console.log('Invalid command. Try again.');
  }
  return pathdir;
};
