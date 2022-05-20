import { IDomCaret } from './type'

type TDirection = -1 | 0 | 1

export function checkCaretDirection(
  anchor: IDomCaret,
  focus: IDomCaret,
): TDirection {
  const range = document.createRange()
  range.setStart(anchor.node, anchor.offset)
  return range.comparePoint(focus.node, focus.offset) as TDirection
}
