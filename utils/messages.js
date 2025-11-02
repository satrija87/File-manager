export function showWelcomeMessage(username) {
  console.log(`Welcome to the File Manager, ${username}!`);
}

export function showExitMessage(username) {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
}

export function showCurrentDirectory(cwd) {
  console.log(`You are currently in ${cwd}`);
}
