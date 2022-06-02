import { TRelativeDirection } from '@essay/pm-view'

export function calcGapCursor(
  domRef: Element,
  direction: TRelativeDirection,
): DOMRect | null {
  if (domRef) {
    const rect = domRef?.getBoundingClientRect()
    switch (direction) {
      case 'before':
        return new DOMRect(rect.x, rect.y, 2, rect.height)
        break
      case 'after':
        return new DOMRect(rect.right, rect.y, 2, rect.height)
        break

      default:
        throw new Error('错误的位置')

        break
    }
  }
  return null
}
