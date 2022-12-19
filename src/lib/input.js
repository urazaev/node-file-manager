import { commands } from '../exec/commands.js';
import os from 'os';
import {stdout} from 'process'

export const echoInitialMessage = (path) => {
  stdout.write(`You are currently in ${path}${os.EOL}`)
  stdout.write(` > `)
}

export const determinateCommand = (cmd, args) => {
  const result = commands.find(
    (item) =>
      item.command.name === cmd && item.argsCount === args.length
  );

  if (!result) {
    throw new Error('Invalid input');
  }

  return result.command.bind(null, args);

}