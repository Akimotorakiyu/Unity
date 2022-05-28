import {
  convertPMSelectionToESelection,
  EditorController,
  ISelectionDesc,
} from '@essay/pm-view'
import { Ref, ref, watch } from 'vue'

const emptyRect = new DOMRect()

export function useEditorSelection(
  editor: EditorController<any>,
  idToDomNode: Ref<Map<string, Node>>,
  editorDomRef: Ref<HTMLDivElement | null>,
) {
  const selection = ref<ISelectionDesc | null>(null)

  editor.event.on('state.update', (state) => {
    const editorSelection = convertPMSelectionToESelection(state)
    selection.value = editorSelection
    console.log('editorSelection', editorSelection)
  })

  const selectionDom = ref<{ cursor?: Node } | null>(null)

  watch(selection, () => {
    if (selection.value) {
      selectionDom.value = {
        cursor: idToDomNode.value.get(selection.value.cursor.id),
      }
    } else {
      selectionDom.value = null
    }
  })

  const cursorRect = ref<DOMRect>(emptyRect)

  watch(selectionDom, () => {
    console.log('try update cursorRect ')
    if (selectionDom.value?.cursor && editorDomRef.value && selection.value) {
      const range = new Range()
      range.setStart(
        selectionDom.value.cursor,
        selection.value.cursor.relative === 'forward' ? 1 : 0,
      )

      const rect = range.getBoundingClientRect()
      const container = editorDomRef.value.getBoundingClientRect()
      if (selection.value.cursor.relative === 'forward') {
        cursorRect.value = new DOMRect(
          rect.right - container.left,
          rect.top - container.top,
          2,
          rect.height,
        )
      } else {
        cursorRect.value = new DOMRect(
          rect.left - container.left,
          rect.top - container.top,
          2,
          rect.height,
        )
      }
      console.log('cursorRect', cursorRect.value)
    } else {
      cursorRect.value = emptyRect
    }
  })

  return {
    cursorRect,
  }
}
