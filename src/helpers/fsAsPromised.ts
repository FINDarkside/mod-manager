import fs from 'fs';
import util from 'util';

export default {
  lstat: util.promisify(fs.lstat),
  readdir: util.promisify(fs.readdir)
}