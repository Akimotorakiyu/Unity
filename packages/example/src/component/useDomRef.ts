import { IJSONNode, DOM_TO_NODE_KEY, getIdFormJSONNode } from '@essay/pm-view'
import { onUnmounted, Ref, ref, watch } from 'vue'
import { editorPortal } from '../editor/hooks/useEditor'

export function useDomRef<N extends Node>(
  editorNode: Ref<IJSONNode<any, any>>,
) {
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
    editorManager.idToDomMap.idToDomNode.value.delete(
      getIdFormJSONNode(editorNode.value),
    )
  })

  watch(
    () => domRef.value,
    (domValue) => {
      if (domValue) {
        Reflect.set(domValue, DOM_TO_NODE_KEY, editorNode.value)
        editorManager.idToDomMap.idToDomNode.value.set(
          getIdFormJSONNode(editorNode.value),
          domValue,
        )
        // console.log('up domValue', domRef.value, getEditorNodeByDomNode(domValue))
      } else {
        editorManager.idToDomMap.idToDomNode.value.delete(
          getIdFormJSONNode(editorNode.value),
        )
      }
    },
  )

  return {
    domRef,
  }
}
