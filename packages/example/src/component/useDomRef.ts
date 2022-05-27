import { IJSONNode, DOM_TO_NODE_KEY } from '@essay/pm-view'
import { getCurrentInstance, onMounted, onUpdated, Ref, ref, watch } from 'vue'

export function useDomRef<N extends Node>(node: Ref<IJSONNode<any, any>>) {
  const domRef = ref<N | null>(null)

  watch(
    () => [domRef.value, node.value],
    ([domValue, nodeValue]) => {
      if (domValue) {
        Reflect.set(domValue, DOM_TO_NODE_KEY, nodeValue)
      }
    },
  )
  return {
    domRef,
  }
}

export function useTextDomRef(node: Ref<IJSONNode<any, any>>) {
  const { domRef } = useDomRef<Text>(node)

  const instance = getCurrentInstance()

  function setTextNodeRef() {
    if (instance?.vnode.el) {
      domRef.value = instance?.vnode.el as Text
    } else {
      domRef.value = null
    }
  }

  onUpdated(setTextNodeRef)
  onMounted(setTextNodeRef)
  return {
    domRef,
  }
}
