const FS = require('fs');
const PATH = require('path');
const VisualJSON = require('./VisualJSON');

class VisualDirectory {
  #depth;
  #path;
  constructor(path, depth) {
    this.#depth = depth;
    this.#path = this._getPath(path);
  }

  _getPath(path) {
    const re = /[\\]$/g;
    return re.test(path) ? path : `${path}\\`;
  }

  _isTheEnd(path) {
    if (!this.#depth) return false;
    return PATH.normalize(path).replace(`${this.#path}`, '').split('\\').length > this.#depth;
  }

  directoryJSON(path = this.#path) {
    const name = PATH.basename(path);
    const item = { name };
    let stats;
    try { stats = FS.statSync(path); }
    catch (e) { return null; }
    if (this._isTheEnd(path)) return item;
    if (stats.isDirectory()) {
      let dirData = FS.readdirSync(path);
      item.items = dirData.map(child => this.directoryJSON(PATH.join(path, child)));
    }
    return item;
  }

  directoryTree() {
    const visualJSON = new VisualJSON(this.directoryJSON());
    visualJSON.show();
  }

}

module.exports = VisualDirectory;