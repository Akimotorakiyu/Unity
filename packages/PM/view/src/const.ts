import { IJSONNode } from './jsonNode'

export const DOM_TO_NODE_KEY = '__node__'

export function getEditorNodeByDomNode(domNode: Node) {
  // console.log("domNode",domNode,Reflect.get(domNode, DOM_TO_NODE_KEY))

  let currentDomNode: Node | null = domNode
  while (currentDomNode) {
    const editorNode = Reflect.get(
      currentDomNode,
      DOM_TO_NODE_KEY,
    ) as IJSONNode<any, any>

    if (editorNode) {
      return editorNode
    } else {
      currentDomNode = currentDomNode.parentNode
    }
  }

  return null
}
