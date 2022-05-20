import { IDomCaret } from './type'
interface _ICaretPosition {
  offsetNode: Node
  offset: number
  getClientRect: DOMRect
}

export function _domCaretFromPoint(x: number, y: number): IDomCaret | null {
  let focusNode: Node
  let focusOffset: number

  if (document.caretRangeFromPoint) {
    // chrome
    const caretRange = document.caretRangeFromPoint(x, y)
    if (caretRange) {
      focusNode = caretRange.startContainer
      focusOffset = caretRange.startOffset
    } else {
      console.warn('鼠标已经不在页面')
      return null
    }
  }
  // @ts-ignore firefox
  else if (document.caretPositionFromPoint) {
    // @ts-ignore firefox
    const caretPosition = document.caretPositionFromPoint(
      x,
      y,
    ) as _ICaretPosition

    if (caretPosition) {
      focusNode = caretPosition.offsetNode
      focusOffset = caretPosition.offset
    } else {
      console.warn('鼠标已经不在页面')
      return null
    }
  } else {
    throw new Error(
      `[This browser supports neither document.caretRangeFromPoint nor document.caretPositionFromPoint.]`,
    )
  }

  return null
}
