type TCaretPositionFromPoint = (
  x: number,
  y: number,
) => { offsetNode: Node; offset: number }

export function pointToRange(x: number, y: number): Range | null {
  if (document.caretRangeFromPoint) {
    // chrome
    const caretRange = document.caretRangeFromPoint(x, y)
    if (caretRange) {
      return caretRange
    } else {
      console.warn('鼠标已经不在页面')
      return null
    }
  } else if (
    (document as unknown as { caretPositionFromPoint: TCaretPositionFromPoint })
      .caretPositionFromPoint
  ) {
    //firefox
    const caretPosition = (
      document as unknown as { caretPositionFromPoint: TCaretPositionFromPoint }
    ).caretPositionFromPoint(x, y)
    const range = new Range()
    range.setStart(caretPosition.offsetNode, caretPosition.offset)
  }
  throw new Error(
    `"[This browser supports neither document.caretRangeFromPoint nor document.caretPositionFromPoint.]`,
  )
}
