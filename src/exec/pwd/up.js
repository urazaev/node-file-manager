import { sep as separator } from 'path';
import { chdir, cwd } from 'process';

export const up = () => {
  let currentPath = cwd();
  let separatorExist = currentPath.lastIndexOf(separator);

  if (separatorExist !== -1) {
    currentPath = currentPath.slice(0, separatorExist);

    separatorExist = currentPath.lastIndexOf(separator);
    chdir(`${currentPath}${separatorExist === -1 ? separator : ''}`);
  }
};
