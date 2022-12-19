import { join } from 'path';
import { cwd, stdout } from 'process';
import os from 'os';
import { appendFile } from 'fs/promises';

export const add = async (args) => {
  const currentPath = cwd();
  let filePath;

  try {
    filePath = join(currentPath, args[0]);

    await appendFile(filePath, '', { flag: 'ax' });
    stdout.write(`New empty file is created${os.EOL}`);
  } catch (err) {
    stdout.write(`Operation failed${os.EOL}`);

    if (err.code === 'EEXIST') {
      stdout.write(`File ${filePath} already exists${os.EOL}`);
    }
  }
};
