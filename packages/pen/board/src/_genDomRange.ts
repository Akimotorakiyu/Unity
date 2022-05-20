import { IDomCaret } from './type'
import { checkCaretDirection } from './_checkCaretDirection'

export function _genDomRange(anchor: IDomCaret, focus: IDomCaret) {
  const direction = checkCaretDirection(anchor, focus)
  const range = new Range()

  if (direction === 1) {
    range.setStart(anchor.node, anchor.offset)
    range.setEnd(focus.node, focus.offset)
  } else {
    range.setStart(anchor.node, anchor.offset)
    range.setEnd(focus.node, focus.offset)
  }
  return range
}
