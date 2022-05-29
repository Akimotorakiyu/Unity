import {
  convertPMSelectionToESelection,
  EditorController,
  ISelectionDesc,
} from '@essay/pm-view'
import { Ref, ref } from 'vue'

export function useEditorSelection(
  editor: EditorController<any>,
  idToDomNode: Ref<Map<string, Node>>,
  editorDomRef: Ref<HTMLDivElement | null>,
) {
  const selection = ref<ISelectionDesc | null>(null)

  editor.event.on('editor.onMounted', () => {
    const editorSelection = convertPMSelectionToESelection(editor.state)
    selection.value = editorSelection
    console.log('editorSelection', editorSelection)
  })

  editor.event.on('state.update', (state) => {
    const editorSelection = convertPMSelectionToESelection(state)
    selection.value = editorSelection
    console.log('editorSelection', editorSelection)
  })

  return {
    selection,
  }
}
