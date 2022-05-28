import { IJSONNode } from '@essay/pm-view'
import { ref } from 'vue'

export function useIdToNodeMap() {
  const idToDomNode = ref(new Map<string, Node>())
  const idToDataNode = ref(new Map<string, IJSONNode<any, any>>())
  return {
    idToDomNode,
    idToDataNode,
  }
}
