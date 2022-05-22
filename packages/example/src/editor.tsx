import { ref } from 'vue'
import { defineFunctionComponent } from './func/defineFunctionComponent'
import { createEditor } from './pm/editor'

function useEditor() {
  const editor = createEditor()
  const doc = ref(editor.state.doc.toJSON())

  editor.event.on('state.update', (state) => {
    doc.value = state.doc.toJSON()
  })

  return {
    editor,
    doc,
  }
}

export const Editor = defineFunctionComponent(() => {
  const { editor, doc } = useEditor()
  editor
  doc
  return {
    render: () => {
      return <div>editor</div>
    },
  }
})
