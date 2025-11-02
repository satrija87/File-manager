import os from 'os';

const getCpus = () => {
  const arrCpu = os.cpus();

  console.log(`Overall amount of CPUS: ${arrCpu.length}`);
  const res = arrCpu.map((cpu) => ({
    Model: cpu.model,
    Speed: (cpu.speed / 1000).toFixed(2) + 'GHz',
  }));

  console.table(res);
};

export const logOsInfo = (arg) => {
  switch (arg) {
    case '--EOL':
      console.log(`EOL: ${JSON.stringify(os.EOL)}`);
      break;
    case '--cpus':
      getCpus();
      break;
    case '--homedir':
      console.log(`Home directory: ${os.homedir()}`);
      break;
    case '--username':
      console.log(`System user name: ${os.userInfo().username} `);
      break;
    case '--architecture':
      console.log(`CPU architecture: ${os.arch()}`);
      break;
    default:
      console.log('Invalid input');
      break;
  }
};
