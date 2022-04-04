import { OrderedMap } from '@essay/ordered-map'
import { MarkType } from './nodes'
import { NodeType } from './nodeType'
import { MarkSpec, NodeSpec } from './spec'

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
