import { join, isAbsolute } from 'path';
import { cwd } from 'process';

export const getAbsolutePath = (path) => {
  const isAbsolutePath = isAbsolute(path);
  const currentPath = cwd();

  return isAbsolutePath ? path : join(currentPath, path);
};
