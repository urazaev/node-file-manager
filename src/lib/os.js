import * as os from 'node:os';

export const osInfo = async (cmd) => {
  switch (cmd) {
    case 'EOL':
      console.log('EOL (default system End-Of-Line): ', JSON.stringify(os.EOL));
      break;
    case 'cpus':
      console.log(os.cpus());
      break;
    case 'homedir':
      console.log('Home directory: ', os.homedir());
      break;
    case 'username':
      console.log('System user name: ', os.userInfo().username);
      break;
    case 'CPU architecture':
      console.log(os.arch());
      break;
    default:
      console.log('Invalid input');
  }
}