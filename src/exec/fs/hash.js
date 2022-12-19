import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import os from 'os';
import { stdout } from 'process';
import { getAbsolutePath } from '../../lib/fs.js';

export const hash = async (args) => {
  let filePath;

  try {
    filePath = getAbsolutePath(args[0]);

    const content = await readFile(filePath);

    const hash = createHash('sha256').update(content).digest('hex');
    stdout.write(`hash for file: ${hash}${os.EOL}`);
  } catch (err) {
    stdout.write(`Operation failed${os.EOL}`);
    if (err.code === 'ENOENT') {
      stdout.write(`No such file ${filePath}${os.EOL}`);
    }
  }
};
