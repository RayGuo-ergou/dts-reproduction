import { existsSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const _dirname = dirname(fileURLToPath(import.meta.url));
let iter = 0;

/**
 * Find the base directory
 */
function getBaseDir(dir: string, target: string = '', limit: number = 10) {
  iter++;
  if (iter > limit) {
    throw new Error('Cannot find the base directory');
  }
  const baseDir = resolve(dir, target);
  if (existsSync(baseDir)) {
    return baseDir;
  }

  return getBaseDir(resolve(dir, '..'));
}

const baseDir = getBaseDir(_dirname);
const componentBaseDir = getBaseDir(_dirname, './src/components');

const directories = readdirSync(componentBaseDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// make it array of object key is dir name is resolve path
const componentEntries = directories.reduce((acc, dir) => {
  acc[dir] = resolve(componentBaseDir, dir);
  return acc;
}, {} as Record<string, string>);

const entries = {
  ...componentEntries,
  libs: resolve(baseDir, './src/lib'),
  index: resolve(baseDir, './src/index.ts'),
};

export { baseDir, directories, entries };
