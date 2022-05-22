export interface IJSONNode<
  Type extends string,
  Attrs extends Record<string, string>,
> {
  type: Type
  content: IJSONNode<any, any>[]
  attrs: Attrs
  text?: string
  marks?: {
    type: string
    attrs: Record<string, string>
  }[]
}

export function getIdFormNode(node: IJSONNode<any, any>) {
  if (node.type !== 'text') {
    return node.attrs.id
  } else {
    return getUniqueMark(node).attrs.id
  }
}

function getUniqueMark(node: IJSONNode<any, any>) {
  if (node.type === 'text') {
    const uniqueMarks = node.marks!.filter((mark) => {
      return mark.type === 'unique'
    })

    if (uniqueMarks.length !== 1) {
      throw new Error(`one node should has one uniqueMark`)
    }

    return uniqueMarks[0]
  } else {
    throw new Error(`can't get unique mark from ${node.type}`)
  }
}
