import fs from 'fs';
import path from 'path';

export default class CastableFile {
  constructor(_path) {
    this.path = _path;
    this.basename = path.basename(_path);
    this.stat = fs.statSync(_path);
    this.isCasting = false;
  }

  isDirectory() {
    return this.stat.isDirectory();
  }

  size() {
    return this.stat.size;
  }
}
