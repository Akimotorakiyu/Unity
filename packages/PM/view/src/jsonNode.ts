import { PMNode } from './Pm'

export interface IJSONNode<
  Type extends string,
  Attrs extends Record<string, string> & { id: string },
> {
  type: Type
  content: IJSONNode<any, any>[]
  attrs: Attrs
  text?: string
  marks?: {
    type: string
    attrs: Record<string, string>
  }[]
  domNode?: Node
}

export function getIdFormJSONNode(jsonNode: IJSONNode<any, any>) {
  if (jsonNode.type !== 'text') {
    return jsonNode.attrs.id
  } else {
    return getUniqueMarkFromJSONNode(jsonNode).attrs.id
  }
}

export function getIJSONNodeFromPMNode(pmNode: PMNode) {
  const jsonNode = pmNode.toJSON() as IJSONNode<any, any>
  return jsonNode
}

function getUniqueMarkFromJSONNode(jsonNode: IJSONNode<any, any>) {
  if (jsonNode.type === 'text') {
    const uniqueMarks = jsonNode.marks!.filter((mark) => {
      return mark.type === 'unique'
    })

    if (uniqueMarks.length !== 1) {
      throw new Error(`one node should has one uniqueMark`)
    }

    return uniqueMarks[0]
  } else {
    throw new Error(`can't get unique mark from ${jsonNode.type}`)
  }
}
