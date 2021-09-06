import { stat } from 'fs/promises';
import { readdir, rename } from 'fs/promises';
import { basename, join } from 'path';

function isSystemFile(name: string) {
  return name.match(/\.DS\_Store$/);
}

export async function getFileSize(path: string) {
  const stats = await stat(path);
  return stats.size;
}

/**
 * Return the whole file list of a folder and its sub-folders
 */
export async function getFileList(path: string) {
  const entries = await readdir(path, { withFileTypes: true });

  const files = entries
    .filter(file => !file.isDirectory() && !isSystemFile(file.name))
    .map(file => join(path, file.name));

  const folders = entries.filter(folder => folder.isDirectory());

  for (const folder of folders) {
    files.push(...await getFileList(join(path, folder.name)));
  }

  return files;
}

export function replaceExtension(path: string, extension: string): string {
  return path.replace(/\.[^.]+$/, `.${extension}`);
}

export async function moveFiles(files: string[], destination: string) {
  if (!destination) {
    throw new Error('destination is empty')
  }
  await Promise.all(files.map(file => rename(file, join(destination, basename(file)))));
}
