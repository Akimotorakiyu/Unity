import { IDomCaret } from './type'

export function _recoverDomSelection(anchor: IDomCaret, focus: IDomCaret) {
  const selection = getSelection()
  selection?.collapse(anchor.node, anchor.offset)
  selection?.extend(focus.node, focus.offset)
}
