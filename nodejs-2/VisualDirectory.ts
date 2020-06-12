import * as fs from 'fs';
import * as PATH from 'path';
import { VisualJSON } from "./VisualJSON";
import { IItem } from './interfaces';

export class VisualDirectory {
  private readonly depth: number;
  private readonly path: string;
  constructor(path: string, depth: number) {
    this.depth = depth;
    this.path = this.getPath(path);
  }

  private getPath(path: string): string {
    const re: RegExp = /[\\]$/g;
    return re.test(path) ? path : `${path}\\`;
  }

  private isTheEnd(path: string): boolean {
    if (!this.depth) return false;
    return PATH.normalize(path).replace(`${this.path}`, '').split('\\').length > this.depth;
  }

  directoryJSON(path: string = this.path): IItem {
    const name = PATH.basename(path);
    const item: IItem = { name };
    let stats: fs.Stats;
    try { stats = fs.statSync(path); }
    catch (e) { return null; }
    if (this.isTheEnd(path)) return item;
    if (stats.isDirectory()) {
      let dirData: string[] = fs.readdirSync(path);
      item.items = dirData.map(child => this.directoryJSON(PATH.join(path, child)));
    }
    return item;
  }

  directoryTree() {
    const visualJSON = new VisualJSON(this.directoryJSON());
    visualJSON.show();
  }

}