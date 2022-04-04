import { Node } from './nodes'

export class Fragment {
  static empty = new Fragment([])
  constructor(public childNodes: Node[]) {}
  get size() {
    const count: number = this.childNodes.reduce((acc, child) => {
      return acc + child.size
    }, 0)
    return count
  }

  static from(childNodes: Node[]) {
    if (childNodes.length) {
      return new Fragment(childNodes)
    } else {
      return Fragment.empty
    }
  }

  findNodeIndexByPos(pos: number, round: boolean = false) {
    if (pos > this.size || pos < 0)
      throw new RangeError(`Position ${pos} outside of fragment (${this})`)

    if (pos == 0)
      return {
        index: 0,
        offset: pos,
      }
    if (pos == this.size)
      return {
        index: this.childNodes.length,
        offset: pos,
      }

    for (let i = 0, curPos = 0; ; i++) {
      let cur = this.childNodes[i],
        end = curPos + cur.size
      if (end >= pos) {
        if (end == pos || round)
          return {
            index: i + 1,
            offset: end,
          }
        return {
          index: i,
          offset: curPos,
        }
      }
      curPos = end
    }
  }
}
