import { IJSONNode, DOM_TO_NODE_KEY } from '@essay/pm-view'
import { Ref, ref, watch } from 'vue'

export function useDomRef<N extends Node>(
  editorNode: Ref<IJSONNode<any, any>>,
) {
  const domRef = ref<N | null>(null)

  watch(
    () => editorNode.value,
    (nodeValue) => {
      if (domRef.value) {
        Reflect.set(domRef.value, DOM_TO_NODE_KEY, nodeValue)
        // console.log('up editorNode',domRef.value, getEditorNodeByDomNode(domRef.value))
      }
    },
  )

  watch(
    () => domRef.value,
    (domValue) => {
      if (domValue) {
        Reflect.set(domValue, DOM_TO_NODE_KEY, editorNode.value)
        // console.log('up domValue', domRef.value, getEditorNodeByDomNode(domValue))
      }
    },
  )

  return {
    domRef,
  }
}
