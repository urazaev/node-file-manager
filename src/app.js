// import process from 'process';
import process from 'process';

import os from 'os'
import * as readline from "readline/promises";
import {determinateCommand, echoInitialMessage} from "./lib/input.js";

const userName = process.argv?.find((arg) => (arg.startsWith('--username')))?.slice(11)
  || 'Unknown user';

process.stdout.write(`Welcome to the File Manager, ${userName}!${os.EOL}`);

let currentPath = os.homedir();
process.chdir(currentPath);
echoInitialMessage(currentPath);

const cl = readline.createInterface(
  {
    input: process.stdin,
    output: process.stdout
  }
)

cl.on('line', async (lineCmd) => {
  if (lineCmd) {
    const lineArgs = lineCmd?.trim().match(/"(.*?)"(?: |$)|[^ ]+/g);
    const [cmd, ...args] = lineArgs;


    if (lineCmd === '.exit') {
      cl.close();
      return;
    }

    try {
      const exec = determinateCommand(cmd, args);
      await exec(args);
    } catch (err) {
      process.stdout.write(`${err.message}${os.EOL}`);
    }

  }
  echoInitialMessage(process.cwd())
  cl.prompt();
});

cl.on('close', () => {
  process.stdout.write(
    `Thank you for using File Manager, ${userName}, goodbye!${os.EOL}`
  )
  process.exit()
})
