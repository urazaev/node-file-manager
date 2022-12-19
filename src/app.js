import process from 'node:process';
import {homedir} from 'os'


const CMD_REGEX = /^([^ ]+)(\s+(([^ "]+)|"([^"]+)"))?(\s+(([^ "]+)|"([^"]+)"))?/;
const argv = process.argv;
const userName = process.argv?.find((arg) => (arg.startsWith('--username')))?.slice(11)
  || 'Unknown user'
let currentPath = homedir();


const pathEcho = (info) => {
  return console.log("You are currently in ", info);
}

process.on('exit', () => console.log(`Thank you for using File Manager, ${userName}, goodbye!`))

console.log(`Welcome to the File Manager, ${userName}!`);


const inputsEcho = (cmd) => {
  const cmdStringify = cmd.toString();
  if (cmdStringify.includes('.exit')) process.exit(0);

  operation(cmdStringify).finally(() =>
    pathEcho(currentPath))
}

await process.stdin.on("data", inputsEcho);

const operation = async (cmd) => {
  const cmdArray = cmd.trim().match(CMD_REGEX)

  console.log(cmdArray)
}