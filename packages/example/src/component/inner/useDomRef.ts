import {
  IJSONNode,
  DOM_TO_NODE_KEY,
  getIdFormJSONNode,
  TRelativeSide,
  TRelativeDirection,
} from '@essay/pm-view'
import { getCurrentInstance, onUnmounted, Ref, ref, watch } from 'vue'
import { TEditorComponentVNode } from '../../editor/cursorComponent/cursor'
import { editorPortal } from '../../editor/hooks/useEditor'
import { calcGapCursor } from '../util/calcCursorRect'

export function useCursorPlaceholderRef() {
  const beforePlacehoderVnodeRef = ref<TEditorComponentVNode | null>(null)
  const afterPlacehoderVnodeRef = ref<TEditorComponentVNode | null>(null)

  return {
    beforePlacehoderVnodeRef,
    afterPlacehoderVnodeRef,
  }
}

function calcCursorRect(
  direction: TRelativeDirection,
  side: TRelativeSide,
  placeholderRef: ReturnType<typeof useCursorPlaceholderRef>,
  domValue: Element,
) {
  if (side === 'inside') {
    if (direction === 'before') {
      return (
        placeholderRef.beforePlacehoderVnodeRef.value?.calcCursorRect() || null
      )
    } else if (direction === 'after') {
      return (
        placeholderRef.afterPlacehoderVnodeRef.value?.calcCursorRect() || null
      )
    } else {
      throw new Error('错误的位置')
    }
  } else if (side === 'outside') {
    calcGapCursor(domValue, direction)
  } else {
    throw new Error('错误的位置')
  }

  return null
}

function calcTextCursorRect(
  direction: TRelativeDirection,
  side: TRelativeSide,
  textNode: Text,
): DOMRect | null {
  if (textNode) {
    const range = new Range()
    range.setStart(textNode, direction === 'before' ? 0 : 1)
    const rect = range.getBoundingClientRect()
    return new DOMRect(rect.x, rect.y, 2, rect.height)
  } else {
    return null
  }
}

export function useTextComponentRef(editorNode: Ref<IJSONNode<any, any>>) {
  const componentRef = useComponentRef(editorNode)

  const { domRef } = componentRef

  const editorManager = editorPortal.injector()

  watch(
    () => domRef.value,
    (domValue) => {
      if (domValue) {
        Reflect.set(domValue, DOM_TO_NODE_KEY, editorNode.value)
        editorManager.idToDomMap.idToViewInfo.value.set(
          getIdFormJSONNode(editorNode.value),
          {
            domNode: domValue,
            componentInstance: {
              calcCursorRect(
                direction?: TRelativeDirection,
                side?: TRelativeSide,
              ) {
                return calcTextCursorRect(
                  direction!,
                  side!,
                  domRef.value as Text,
                )
              },
            },
          },
        )
        // console.log('up domValue', domRef.value, getEditorNodeByDomNode(domValue))
      } else {
        editorManager.idToDomMap.idToViewInfo.value.delete(
          getIdFormJSONNode(editorNode.value),
        )
      }
    },
  )

  return componentRef
}

export function useContainerComponentRef<T extends Node>(
  editorNode: Ref<IJSONNode<any, any>>,
) {
  const { domRef } = useComponentRef<T>(editorNode)

  const placeholderRef = useCursorPlaceholderRef()

  const editorManager = editorPortal.injector()

  watch(
    () => domRef.value,
    (domValue) => {
      if (domValue) {
        Reflect.set(domValue, DOM_TO_NODE_KEY, editorNode.value)
        editorManager.idToDomMap.idToViewInfo.value.set(
          getIdFormJSONNode(editorNode.value),
          {
            domNode: domValue,
            componentInstance: {
              calcCursorRect(
                direction?: TRelativeDirection,
                side?: TRelativeSide,
              ) {
                return calcCursorRect(
                  direction!,
                  side!,
                  placeholderRef,
                  domRef.value as Element,
                )
              },
            },
          },
        )
        // console.log('up domValue', domRef.value, getEditorNodeByDomNode(domValue))
      } else {
        editorManager.idToDomMap.idToViewInfo.value.delete(
          getIdFormJSONNode(editorNode.value),
        )
      }
    },
  )

  return {
    placeholderRef,
    domRef,
  }
}

function useComponentRef<N extends Node>(editorNode: Ref<IJSONNode<any, any>>) {
  const domRef = ref<N | null>(null)
  const editorManager = editorPortal.injector()

  watch(
    () => editorNode.value,
    (nodeValue) => {
      if (domRef.value) {
        Reflect.set(domRef.value, DOM_TO_NODE_KEY, nodeValue)
        // console.log('up editorNode',domRef.value, getEditorNodeByDomNode(domRef.value))
      }
    },
  )

  onUnmounted(() => {
    editorManager.idToDomMap.idToViewInfo.value.delete(
      getIdFormJSONNode(editorNode.value),
    )
  })

  return {
    domRef,
  }
}
