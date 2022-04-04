import { OrderedMap } from '@essay/ordered-map'
import { Fragment } from './fragment'
import { Schema } from './schema'
import { Node } from './nodes'
import { Mark } from './mark'
import { NodeSpec } from './spec'

export const computeAttrs = (
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
export class NodeType {
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
