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

export class TextNode extends Node {
  constructor(
    public type: NodeType,
    public props: Record<string, any>,
    public textContent: string,
    public marks: Mark[],
  ) {
    super(type, props, Fragment.empty, marks)
  }

  get size() {
    return this.textContent.length
  }
}
