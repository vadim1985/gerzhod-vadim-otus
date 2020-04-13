class VisualJSON {
  #obj = {};
  constructor(obj) {
    this.#obj = obj;
  }

  prefix(variable) {
    switch (variable) {
      case 'array': return '├── ';
      case 'object': return '└── ';
      case 'space': return '   ';
      default: return '';
    }
  }

  prepare(tree = this.#obj, level = 0, parentPre = '', treeStr = '') {
    if (typeof tree !== 'object') return '';
    if (Array.isArray(tree)) {
      tree.forEach((child, index) => {
        let pre = `${parentPre}${tree[index + 1] ? this.prefix('array') : this.prefix('object')}`;
        treeStr += `${pre}${child.name}\n`;
        if (child.items) {
          treeStr += this.prepare(child.items, level + 1, `${parentPre}${(tree[index + 1] ? '│' : ' ') + this.prefix('space')}`);
        }
      });
    } else {
      treeStr = `${tree.name}\n`;
      if (tree.items) {
        treeStr += this.prepare(tree.items, level + 1);
      }
    }
    return treeStr;
  }

  show() {
    console.log(this.prepare());
  }
}

module.exports = VisualJSON;