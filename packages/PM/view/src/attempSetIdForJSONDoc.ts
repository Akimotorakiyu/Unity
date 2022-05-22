import { genNanoDomId } from '@essay/nanoid'
import { Node } from 'prosemirror-model'

export function attempSetIdForJSONDoc(node: Node) {
  if (!node.attrs.id) {
    node.attrs.id = genNanoDomId()
  }

  node.content?.content.forEach((childNode) => {
    attempSetIdForJSONDoc(childNode)
  })
}
