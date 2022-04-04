import { Node } from './nodes'
import { Mark } from './mark'

interface ReslovedPath {
  node: Node
  indexInParent: number
  offset: number
}

export class ReslovedPosition {
  constructor(
    public pos: number,
    public path: ReslovedPath[],
    public parentOffset: number,
  ) {}
  get depth() {
    return this.path.length - 1
  }

  resolveDepthUp(parentDepth: number) {
    if (parentDepth < 0) return this.depth + parentDepth
    return parentDepth
  }

  getNode(depth: number) {
    return this.path[this.resolveDepthUp(depth)]
  }

  get parent() {
    return this.getNode(this.depth)
  }

  get root() {
    return this.getNode(0)
  }

  get textOffset() {
    return this.pos - this.path[this.path.length - 1].offset
  }

  getAncestorIndexInAncestorParent(depth: number) {
    return this.path[this.resolveDepthUp(depth)].indexInParent
  }

  getAfterAncestorIndexInAncestorParent(depth: number) {
    const reslovedDepth = this.resolveDepthUp(depth)
    const ancestorIndex = this.getAncestorIndexInAncestorParent(reslovedDepth)
    const isPosInNode = Boolean(this.textOffset)
    const isInGap = !isPosInNode
    // 如果文字位置偏移是 0 ，则说明在缝里，next ancestor 也还这个 ancestor
    return ancestorIndex + (depth === this.depth && isInGap ? 0 : 1)
  }

  static resolve(doc: Node, pos: number) {
    if (pos < 0 || pos > doc.content.size) {
      throw new RangeError('Position ' + pos + ' out of range')
    }

    const path: ReslovedPath[] = []

    let parentOffset = pos
    let offsetByDoc = 0

    for (let node = doc; ; ) {
      const { index, offset } = node.content.findNodeIndexByPos(pos)
      let remian = parentOffset - offset

      path.push({
        node,
        indexInParent: index,
        offset: offsetByDoc + offset,
      })

      if (remian === 0) {
        break
      }
      node = node.content.childNodes[index]
      if (node.isText) {
        break
      }

      parentOffset = remian - 1
      offsetByDoc = offsetByDoc + offset + 1
    }

    return new ReslovedPosition(pos, path, offsetByDoc)
  }
}
