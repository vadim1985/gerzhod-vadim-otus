import { IItem } from "./interfaces";

enum objectVariable {
  array = 'array',
  object = 'object',
  space = 'space'
}

export class VisualJSON {
  private readonly obj:IItem;
  constructor(obj:IItem) {
    this.obj = obj;
  }

  prefix(variable: objectVariable) {
    switch (variable) {
      case 'array': return '├── ';
      case 'object': return '└── ';
      case 'space': return '   ';
      default: return '';
    }
  }

  prepare(tree:IItem[] | IItem = this.obj, level: number = 0, parentPre: string = '', treeStr: string = '') {
    if (typeof tree !== 'object') return '';
    if (Array.isArray(tree)) {
      tree.forEach((child, index) => {
        let pre = `${parentPre}${tree[index + 1] ? this.prefix(objectVariable.array) : this.prefix(objectVariable.object)}`;
        treeStr += `${pre}${child.name}\n`;
        if (child.items) {
          treeStr += this.prepare(child.items, level + 1, `${parentPre}${(tree[index + 1] ? '│' : ' ') + this.prefix(objectVariable.space)}`);
        }
      });
    } else {
      treeStr = `${tree?.name}\n`;
      if (tree?.items) {
        treeStr += this.prepare(tree.items, level + 1);
      }
    }
    return treeStr;
  }

  show() {
    console.log(this.prepare());
  }
}