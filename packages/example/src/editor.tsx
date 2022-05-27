import { onMounted, ref, watch } from 'vue'
import { ContentComponent } from './component'
import { defineFunctionComponent } from './func/defineFunctionComponent'
import { createEditor } from './pm/editor'
import {
  attempSetIdForJSONDoc,
  EditorController,
  IJSONNode,
} from '@essay/pm-view'

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
  const editorDomRef = ref<HTMLDivElement | null>(null)
  const editor = createEditor()

  watch(
    () => editorDomRef.value,
    (dom) => {
      if (dom) {
        editor.init(dom)
      } else {
        editor.unInit()
      }
    },
  )

  attempSetIdForJSONDoc(editor.state.doc)

  const doc = ref<IJSONNode<any, any>>(
    editor.state.doc.toJSON() as IJSONNode<any, any>,
  )

  editor.event.on('state.update', (state) => {
    console.log('update', state.doc.toJSON(), state.selection.toJSON())
    attempSetIdForJSONDoc(editor.state.doc)
    doc.value = state.doc.toJSON() as IJSONNode<any, any>
  })

  Reflect.set(window, 'editor', editor)

  useTestTool(editor)

  return {
    editor,
    doc,
    editorDomRef,
  }
}

export const Editor = defineFunctionComponent(() => {
  const { editor, doc, editorDomRef } = useEditor()
  editor
  doc

  onMounted(() => {
    editor.event.emit('editor.onMounted')
  })

  return {
    render: () => {
      console.log('doc', doc.value)

      return (
        <div>
          <div>
            <h1 class={` p-4 m-4 font-medium text-lg`}>Editor</h1>
          </div>
          <div
            contenteditable
            class={` shadow-md shadow-gray-400 m-4 rounded-md`}
          >
            <div
              ref={editorDomRef}
              contenteditable={false}
              tabindex="-1"
              onClick={() => {}}
              onPointerdown={() => {}}
            >
              <ContentComponent node={doc.value}></ContentComponent>
            </div>
          </div>
        </div>
      )
    },
  }
})
