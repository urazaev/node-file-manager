import { access, stat } from 'fs/promises';
import { basename, join } from 'path';
import { stdout } from 'process';
import { getAbsolutePath } from '../../lib/fs.js';
import os from 'os';
import { createReadStream, createWriteStream } from 'fs';

export const cp = async (args) => {
  let filePath, newFilePath;
  let isDirectory;

  try {
    filePath = getAbsolutePath(args[0]);

    const filename = basename(filePath);

    await access(getAbsolutePath(args[1]));
    newFilePath = join(getAbsolutePath(args[1]), filename);

    isDirectory = (await stat(filePath)).isDirectory();
    if (isDirectory) throw new Error();

    return new Promise((resolve, reject) => {
      const readableStream = createReadStream(filePath);
      const writableStream = createWriteStream(newFilePath, {
        flags: 'wx',
      });

      let content = '';
      readableStream.on('data', (chunk) => {
        if (chunk) {
          content += chunk;
        }
      });

      writableStream.on('error', (err) => {
        reject(err);
      });

      readableStream.on('error', (err) => {
        reject(err);
      });

      readableStream.on('end', () => {
        writableStream.write(content);
        writableStream.close();
        readableStream.close();
        resolve(`file ${filePath} is copied${os.EOL}`);
      });
    })
      .then((content) => {
        stdout.write(content);
      })
      .catch((err) => {
        stdout.write(`Operation failed${os.EOL}`);

        if (err.code === 'EPERM') {
          stdout.write(`Operation not permitted${os.EOL}`);
        }

        if (err.code === 'EEXIST') {
          stdout.write(`File ${newFilePath} already exists${os.EOL}`);
        }

        if (isDirectory) {
          stdout.write(`Path ${filePath} is a directory not a file${os.EOL}`);
        }
      });
  } catch (err) {
    stdout.write(`Operation failed${os.EOL}`);

    if (err.code === 'ENOENT') {
      const file = err.message.slice(err.message.indexOf("'"));
      stdout.write(`No such file or directory ${file} ${os.EOL}`);
    }
  }
};
