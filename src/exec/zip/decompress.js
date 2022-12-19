import { createReadStream, createWriteStream } from 'fs';
import os from 'os';
import zlib from 'zlib';
import { stdout } from 'process';
import { getAbsolutePath } from '../../lib/fs.js';
import { access, stat } from 'fs/promises';
import { dirname } from 'path';

export const decompress = async (args) => {
  let filePath, destPath, newFilePath, isDirectory;

  try {
    filePath = getAbsolutePath(args[0]);

    isDirectory = (await stat(filePath)).isDirectory();
    if (isDirectory) throw new Error();

    destPath = getAbsolutePath(dirname(args[1]));
    await access(destPath);

    newFilePath = getAbsolutePath(args[1]);

    return new Promise((resolve, reject) => {
      const readStream = createReadStream(filePath);
      const writeStream = createWriteStream(newFilePath, {
        flags: 'wx',
      });

      readStream.on('error', (err) => reject(err));
      writeStream.on('error', (err) => reject(err));

      const brotli = zlib.createBrotliDecompress();

      const stream = readStream.pipe(brotli).pipe(writeStream);

      stream.on('finish', () => {
        stdout.write(
          `file ${filePath} is decompressed to ${newFilePath}${os.EOL}`
        );
        readStream.close();
        writeStream.close();
        stream.close();
        resolve();
      });
    }).catch((err) => {
      stdout.write(`Operation failed${os.EOL}`);

      if (err.code === 'EPERM') {
        stdout.write(`Operation not permitted${os.EOL}`);
      }

      if (err.code === 'ENOENT') {
        const file = err.message.slice(err.message.indexOf("'"));
        stdout.write(`No such file or directory ${file} ${os.EOL}`);
      }

      if (err.code === 'EEXIST') {
        stdout.write(`File ${newFilePath} already exists${os.EOL}`);
      }
    });
  } catch (err) {
    stdout.write(`Operation failed${os.EOL}`);

    if (err.code === 'ENOENT') {
      const file = err.message.slice(err.message.indexOf("'"));
      stdout.write(`No such file or directory ${file} ${os.EOL}`);
    }

    if (isDirectory) {
      stdout.write(`Path ${filePath} is a directory not a file${os.EOL}`);
    }
  }
};
