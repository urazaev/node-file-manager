import { chdir, stdout } from 'process';
import os from 'os';
import { getAbsolutePath } from '../../lib/fs.js';

export const cd = (args) => {
  const currentPath = getAbsolutePath(args[0]);
  try {
    chdir(currentPath);
  } catch (err) {
    stdout.write(`Operation failed${os.EOL}`);

    if (err.code === 'ENOENT') {
      stdout.write(`no such path ${currentPath}${os.EOL}`);
    }
  }
};
