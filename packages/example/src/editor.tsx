import { ref } from 'vue'
import { ContentComponent } from './component'
import { defineFunctionComponent } from './func/defineFunctionComponent'
import { createEditor } from './pm/editor'
import { EditorController, IJSONNode } from '@essay/pm-view'

function intsertText(editor: EditorController<any>) {
  const tr = editor.state.tr
  tr.insertText('hello world', 1, 1)
  editor.dispatch(tr)
}

function useTestTool(editor: EditorController<any>) {
  Reflect.set(window, 'test', {
    intsertText() {
      intsertText(editor)
    },
  })
}

function useEditor() {
  const editor = createEditor()
  const doc = ref<IJSONNode<any, any>>(
    editor.state.doc.toJSON() as IJSONNode<any, any>,
  )

  editor.event.on('state.update', (state) => {
    console.log('update', state.doc.toJSON())
    doc.value = state.doc.toJSON() as IJSONNode<any, any>
  })

  Reflect.set(window, 'editor', editor)

  useTestTool(editor)

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
      console.log('doc', doc.value)

      return (
        <div>
          editor
          <ContentComponent node={doc.value}></ContentComponent>
        </div>
      )
    },
  }
})
