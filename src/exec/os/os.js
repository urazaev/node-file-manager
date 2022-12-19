import { chdir, cwd, stdout } from 'process';
import * as OS from 'os';

export const os = (args) => {
  const argument = args[0];

  switch (argument) {
    case '--homedir':
      stdout.write(`home directory: ${cwd()}${OS.EOL}`);
      break;
    case '--cpus':
      const cpus = OS.cpus();
      stdout.write(`overall amount of CPUS: ${cpus.length}${OS.EOL}`);
      stdout.write(`information about each logical CPU core:${OS.EOL}`);
      cpus.forEach((cpu) => {
        stdout.write(`model: ${cpu.model}${OS.EOL}`);
        stdout.write(`clock rate: ${cpu.speed / 1000}GHz${OS.EOL}`);
      });
      break;
    case '--username':
      stdout.write(
        `current system user name: ${OS.userInfo().username}${OS.EOL}`
      );
      break;
    case '--architecture':
      stdout.write(`CPU architecture: ${OS.arch()}${OS.EOL}`);
      break;
    case '--EOL':
      stdout.write(
        `default system End-Of-Line: ${
          OS.platform() === 'win32' ? '\\r\\n' : '\\n'
        }${OS.EOL}`
      );
      break;
    default:
      stdout.write(`invalid input${OS.EOL}`);
  }
};