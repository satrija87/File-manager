import { stdin, stdout } from 'process';
import os from 'os';
import { handleInput } from './handleInput.js';
import { showCurrentDirectory, showExitMessage, showWelcomeMessage } from './utils/messages.js';
import { createInterface } from 'readline/promises';

let userName;
const argv = process.argv.slice(2);
for (let arg of argv) {
  if (arg.startsWith('--username=')) {
    let index = arg.indexOf('=');
    userName = arg.slice(index + 1);
  }
}
if (!userName) {
  console.error('Please write: npm run start -- --username=your_username');
  process.exit(1);
}
let cwd = os.homedir();

showWelcomeMessage(userName);
showCurrentDirectory(cwd);

const rl = createInterface({ input: stdin, output: stdout });
rl.on('SIGINT', () => {
  showExitMessage(userName);
  process.exit(0);
});

rl.on('line', async (line) => {
  try {
    if (line === '.exit') {
      showExitMessage(userName);
      process.exit(0);
    }
    cwd = await handleInput(line, cwd);
    showCurrentDirectory(cwd);
  } catch (err) {
    console.log('Operation failed', err.message);
  }
});
