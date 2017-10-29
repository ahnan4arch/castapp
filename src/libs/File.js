import fs from 'fs';
import path from 'path';

export default class File {
  constructor(_path) {
    this.path = _path;
    this.basename = path.basename(_path);
    this.stat = fs.statSync(_path);
  }

  isDirectory() {
    return this.stat.isDirectory();
  }

  size() {
    return this.stat.size;
  }
}
