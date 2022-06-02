import {
  convertPMSelectionToESelection,
  EditorController,
  ISelectionDesc,
} from '@essay/pm-view'
import { nextTick, Ref, ref } from 'vue'
import { IViewInfo } from './useIdToNodeMap'

const emptyRect = new DOMRect()

export function useEditorSelection(
  editor: EditorController<any>,
  idToDomNode: Ref<Map<string, IViewInfo>>,
  editorDomRef: Ref<HTMLDivElement | null>,
) {
  const selection = ref<ISelectionDesc | null>(null)

  const cursorRect = ref<DOMRect>(emptyRect)

  function calcAndUpdateCursorRect() {
    const editorSelection = convertPMSelectionToESelection(editor.state)
    selection.value = editorSelection
    console.log('editorSelection', editorSelection)
    const instance = idToDomNode.value.get(editorSelection.cursor.id)

    if (instance && editorDomRef.value) {
      const container = editorDomRef.value.getBoundingClientRect()
      const rect =
        instance.componentInstance?.calcCursorRect(
          editorSelection.cursor.relative,
          editorSelection.cursor.side,
        ) || emptyRect
      cursorRect.value = new DOMRect(
        rect.left - container.left,
        rect.top - container.top,
        2,
        rect.height,
      )
    } else {
      cursorRect.value = emptyRect
    }
  }

  editor.event.on('editor.onMounted', () => {
    calcAndUpdateCursorRect()
  })

  editor.event.on('state.update', (state) => {
    nextTick(() => {
      calcAndUpdateCursorRect()
    })
  })

  return {
    selection,
    cursorRect,
  }
}
