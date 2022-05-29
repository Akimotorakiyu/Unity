import { Node as PMNode, ResolvedPos } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'
import { getIdFormJSONNode, getIJSONNodeFromPMNode } from './jsonNode'
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

export function getCurrentPMNode(pos: ResolvedPos) {
  return pos.parent.child(pos.index())
}

type TDirection = -1 | 0 | 1

export type TRelativeDirection = 'after' | 'before'
export type TRelativeSide = 'inside' | 'outside'

interface ICursorDesc {
  id: string
  relative: TRelativeDirection
  side: TRelativeSide
}

function getFoucsPMNodeFromSelection(
  $head: ResolvedPos,
  direction: TDirection,
): ICursorDesc {
  switch (direction) {
    case 1:
      if ($head.nodeBefore) {
        return {
          id: getIdFormJSONNode(getIJSONNodeFromPMNode($head.nodeBefore)),
          relative: 'after',
          side: 'outside',
        }
      } else {
        // 位于父节点首位
        return {
          id: getIdFormJSONNode(getIJSONNodeFromPMNode($head.parent)),
          relative: 'before',
          side: 'inside',
        }
        // throw new Error('未获取到位置')
      }
      break
    case 0:
      if ($head.nodeBefore) {
        return {
          id: getIdFormJSONNode(getIJSONNodeFromPMNode($head.nodeBefore)),
          relative: 'after',
          side: 'outside',
        }
      } else if ($head.nodeAfter) {
        return {
          id: getIdFormJSONNode(getIJSONNodeFromPMNode($head.nodeAfter)),
          relative: 'before',
          side: 'outside',
        }
      } else {
        // 父节点为空节点，返回父节点
        return {
          id: getIdFormJSONNode(getIJSONNodeFromPMNode($head.parent)),
          relative: 'before',
          side: 'inside',
        }

        // throw new Error('未匹配到的')
      }
      break
    case -1:
      if ($head.nodeAfter) {
        return {
          id: getIdFormJSONNode(getIJSONNodeFromPMNode($head.nodeAfter)),
          relative: 'before',
          side: 'outside',
        }
      } else {
        // 位于父节点末尾
        return {
          id: getIdFormJSONNode(getIJSONNodeFromPMNode($head.parent)),
          relative: 'after',
          side: 'inside',
        }
        throw new Error('未匹配到的位置')
      }
      break
    default:
      throw new Error('未匹配到的位置')
      break
  }
}

export interface ISelectionDesc {
  cursor: ICursorDesc
  from: ICursorDesc
  to: ICursorDesc
}

export function convertPMSelectionToESelection(
  state: EditorState,
): ISelectionDesc {
  const { anchor, head, $head, $from, $to } = state.selection

  const direction: TDirection = head === anchor ? 0 : head > anchor ? 1 : -1

  const cursorDesc = getFoucsPMNodeFromSelection($head, direction)

  switch (direction) {
    case 1:
      return {
        cursor: cursorDesc,
        from: getFoucsPMNodeFromSelection($from, direction),
        to: cursorDesc,
      }

      break
    case 0:
      return {
        cursor: cursorDesc,
        from: cursorDesc,
        to: cursorDesc,
      }
      break
    case -1:
      return {
        cursor: cursorDesc,
        from: cursorDesc,
        to: getFoucsPMNodeFromSelection($to, direction),
      }

      break

    default:
      throw new Error('未匹配到的位置')

      break
  }
}
