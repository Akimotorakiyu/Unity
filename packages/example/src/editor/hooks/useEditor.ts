import { convertPMSelectionToESelection, IJSONNode } from '@essay/pm-view'
import { ref, watch } from 'vue'
import { createEditor } from '../pm/editor'
import { createPortal } from '../util/Portal'
import { useTestTool } from './testTool'
import { useEditorDomRef } from './useEditorDomRef'
import { useEditorSelection } from './useEditorSelection'
import { useIdToNodeMap } from './useIdToNodeMap'

export function useEditor() {
  const editor = createEditor()

  const { editorDomRef } = useEditorDomRef(editor)

  const idToDomMap = useIdToNodeMap()

  const doc = ref<IJSONNode<any, any>>(
    editor.state.doc.toJSON() as IJSONNode<any, any>,
  )

  // const selection = ref<>(editor.state.selection.toJSON() as any)

  editor.event.on('state.update', (state) => {
    console.log('update', state.doc.toJSON(), state.selection.toJSON())
    doc.value = state.doc.toJSON() as IJSONNode<any, any>

    const editorSelection = convertPMSelectionToESelection(state)
    console.log('editorSelection', editorSelection)
  })

  const editorSelection = useEditorSelection(
    editor,
    idToDomMap.idToDomNode,
    editorDomRef,
  )

  const test = useTestTool(editor)

  const manager = {
    editor,
    doc,
    editorDomRef,
    idToDomMap,
    editorSelection,
    test,
  }

  Reflect.set(window, 'manager', manager)

  return manager
}

export const editorPortal = createPortal<ReturnType<typeof useEditor>>()
