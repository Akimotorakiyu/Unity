import { IJSONNode } from '@essay/pm-view'
import { ref, ComponentInternalInstance } from 'vue'
import { TEditorComponentVNode } from '../cursorComponent/cursor'

export interface IViewInfo {
  componentInstance: TEditorComponentVNode | null
  domNode: Node | null
}

export function useIdToNodeMap() {
  const idToViewInfo = ref(new Map<string, IViewInfo>())
  const idToDataNode = ref(new Map<string, IJSONNode<any, any>>())
  return {
    idToViewInfo,
    idToDataNode,
  }
}
