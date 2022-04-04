import { OrderedMap } from '@essay/ordered-map'
import { ReslovedPosition } from './pos'
const computeAttrs = (
  defaultAttrs: Record<
    string,
    {
      default: any
    }
  >,
  attrs: Record<string, any>,
) => {
  const newAttrs: Record<string, any> = {}
  Object.entries(defaultAttrs).forEach(([key, value]) => {
    const isGiven = attrs[key] !== undefined
    if (isGiven) {
      newAttrs[key] = attrs[key]
    } else {
      const isGivenDefault = defaultAttrs[key]?.default === undefined
      if (isGivenDefault) {
        newAttrs[key] = defaultAttrs[key]?.default
      } else {
        throw new Error(`No value supplied for attribute ${key}`)
      }
    }
  })

  return newAttrs
}
interface MarkSpec {
  group: string
  defaultAttrs: Record<
    string,
    {
      default: any
    }
  >
  toDom: () => {
    dom: HTMLElement
    contentContainer: HTMLElement
  }
  parseDOm: (dom: HTMLElement) => {
    dom: HTMLElement
    contentContainer: HTMLElement
  }
}

interface NodeSpec {
  checkChildNodeSpecIsAllowed?: (nodeSpec: NodeSpec) => boolean
  checkMarkSpecIsAllowed?: (markSpec: MarkSpec) => boolean

  group: string
  defaultAttrs: Record<
    string,
    {
      default: any
    }
  >
  toDom: () => {
    dom: HTMLElement
    contentContainer: HTMLElement
  }
  parseDOm: (dom: HTMLElement) => {
    dom: HTMLElement
    contentContainer: HTMLElement
  }
}

class NodeType {
  constructor(
    public name: string,
    public schema: Schema,
    public spec: NodeSpec,
  ) {}

  get isLeaf() {
    return Boolean(this.spec.checkChildNodeSpecIsAllowed)
  }

  get isText() {
    return this.name === 'text'
  }

  static compile(markSpeces: OrderedMap<NodeSpec>, schema: Schema) {
    const { mapping } = markSpeces.content.reduce(
      (acc, [key, value]) => {
        acc.mapping[key] = new NodeType(key, schema, value)
        return acc
      },
      {
        mapping: {} as Record<string, NodeType>,
      },
    )

    return mapping
  }

  create(attrs: Record<string, any>, childNodes: Node[], marks: Mark[]) {
    return new Node(
      this,
      computeAttrs(this.spec.defaultAttrs, attrs),
      Fragment.from(childNodes),
      Mark.reRankMarks(marks),
    )
  }
}

class MarkType {
  constructor(
    public name: string,
    public rank: number,
    public schema: Schema,
    public spec: MarkSpec,
  ) {}

  static compile(markSpeces: OrderedMap<MarkSpec>, schema: Schema) {
    const { mapping } = markSpeces.content.reduce(
      (acc, [key, value]) => {
        acc.mapping[key] = new MarkType(key, acc.rank++, schema, value)
        return acc
      },
      {
        rank: 0,
        mapping: {} as Record<string, MarkType>,
      },
    )

    return mapping
  }

  create(attrs: Record<string, any>) {
    return new Mark(this, computeAttrs(this.spec.defaultAttrs, attrs))
  }
}

export class Mark {
  constructor(public type: MarkType, public props: Record<string, any>) {}
  static none: Mark[] = []

  static reRankMarks(marks: Mark[]) {
    if (marks.length) {
      return Mark.none
    } else {
      const copy = marks.slice()
      copy.sort((a, b) => a.type.rank - b.type.rank)
      return copy
    }
  }
}

class Fragment {
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

export class Schema {
  marks: Record<string, MarkType>
  nodes: Record<string, NodeType>
  topNodeType: NodeType
  constructor(
    public spec: {
      nodes: OrderedMap<NodeSpec>
      marks: OrderedMap<MarkSpec>
      topNodeName?: string
    },
  ) {
    this.marks = MarkType.compile(spec.marks, this)
    this.nodes = NodeType.compile(spec.nodes, this)
    this.topNodeType = this.nodes[spec.topNodeName || 'doc']
  }
}

export class Slice {
  constructor(
    public content: Fragment,
    public openStart: number,
    public openEnd: number,
  ) {}

  get size() {
    return this.content.size - this.openStart - this.openEnd
  }
}
