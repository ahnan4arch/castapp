import fs from 'fs';
import path from 'path';

export default class File {
  constructor(_path) {
    this.path = _path;
    this.basename = path.basename(_path) || path.sep;
    this.stat = fs.statSync(_path);
  }

  isDirectory() {
    return this.stat.isDirectory();
  }

  size() {
    return this.stat.size;
  }

  files() {
    if (!this.isDirectory()) {
      return [];
    }

    const files = fs.readdirSync(this.path)
      .map(_path => path.resolve(this.path, _path))
      .map(_path => new File(_path));
    return files;
  }

  parents() {
    const directories = path.dirname(this.path)
      .split(path.sep)
      .map((dir, i, dirs) => dirs.slice(0, i + 1).join(path.sep))
      .map(dir => dir ? dir : path.sep)
      .filter((dir, i, dirs) => dirs.indexOf(dir) === i)
      .map(dir => new File(dir));
    return directories;
  }
}
