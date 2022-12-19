import { createReadStream } from 'fs';
import { stdout } from 'process';
import os from 'os';
import { getAbsolutePath } from '../../lib/fs.js';

export const cat = async (args) => {
  try {
    const filePath = getAbsolutePath(args[0]);

    const stream = createReadStream(filePath, { encoding: 'utf-8' });

    return new Promise((resolve, reject) => {
      let fileContent = '';
      stream.on('data', (chunk) => (fileContent += chunk));
      stream.on('end', () => {
        resolve(fileContent);
      });
      stream.on('error', (error) => reject(error));
    })
      .then((content) => {
        stdout.write(`file content:${os.EOL}`);
        stdout.write(content);
        stdout.write(os.EOL);
      })
      .catch((err) => {
        stdout.write(`Operation failed${os.EOL}`);
        
        if (err.code === 'ENOENT') {
          stdout.write(`no such file ${filePath}${os.EOL}`);
        }
      });
  } catch {
    stdout.write(`Operation failed${os.EOL}`);
  }
};
