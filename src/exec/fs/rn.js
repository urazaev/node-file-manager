import { getAbsolutePath } from '../../lib/fs.js';
import { rename, stat } from 'fs/promises';
import { stdout } from 'process';
import os from 'os';

export const rn = async (args) => {
  let filePath;
  let newFilePath;
  let isDirectory;

  try {
    filePath = getAbsolutePath(args[0]);
    newFilePath = getAbsolutePath(args[1]);

    isDirectory = (await stat(filePath)).isDirectory();
    if (isDirectory) throw new Error();

    await rename(filePath, newFilePath);
    stdout.write(`File has been renamed${os.EOL}`);
  } catch (err) {
    stdout.write(`Operation failed${os.EOL}`);

    if (err.code === 'ENOENT') {
      stdout.write(`No such file ${filePath}${os.EOL}`);
    }

    if (isDirectory) {
      stdout.write(`Path ${filePath} is a directory not a file${os.EOL}`);
    }

    stdout.write(err.message);
  }
};
