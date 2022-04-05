import { Fragment } from './fragment'
import { NodeType } from './nodeType'
import { ReslovedPosition } from './pos'
import { Mark } from './mark'

export class Node {
  constructor(
    public type: NodeType,
    public props: Record<string, any>,
    public content: Fragment,
    public marks: Mark[],
  ) {}

  get size() {
    return this.isLeaf ? 1 : 2 + this.content.size
  }

  get isLeaf() {
    return this.type.isLeaf
  }

  get isText() {
    return this.type.isText
  }

  resolve(pos: number) {
    return ReslovedPosition.resolve(this, pos)
  }
}
