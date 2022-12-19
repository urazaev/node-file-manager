import {add} from './fs/add.js';
import {cat} from './fs/cat.js';
import {cp} from './fs/cp.js';
import {hash} from './fs/hash.js';
import {mv} from './fs/mv.js';
import {rm} from './fs/rm.js';
import {rn} from './fs/rn.js';
import {os} from './os/os.js';
import {cd} from './pwd/cd.js';
import {ls} from './pwd/ls.js';
import {up} from './pwd/up.js';
import {compress} from './zip/compress.js';
import {decompress} from './zip/decompress.js';

export const commands = [
  {
    command: up,
    argsCount: 0,
  },
  {
    command: cd,
    argsCount: 1,
  },
  {
    command: ls,
    argsCount: 0,
  },
  {
    command: cat,
    argsCount: 1,
  },
  {
    command: add,
    argsCount: 1,
  },
  {
    command: rm,
    argsCount: 1,
  },
  {
    command: rn,
    argsCount: 2,
  },
  {
    command: cp,
    argsCount: 2,
  },
  {
    command: mv,
    argsCount: 2,
  },
  {
    command: os,
    argsCount: 1,
  },
  {
    command: hash,
    argsCount: 1,
  },
  {
    command: compress,
    argsCount: 2,
  },
  {
    command: decompress,
    argsCount: 2,
  },
];
