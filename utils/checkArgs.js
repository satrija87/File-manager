export const checkArgs = (args, n) => {
  if (args.length < n) {
    console.log('Invalid input');
    return false;
  }
  if (args.length > n) {
    console.log('Invalid input: too many argument(s)');
    return false;
  }
  return true;
};
