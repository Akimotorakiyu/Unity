import { onMounted } from 'vue'
import { defineFunctionComponent } from '@essay/define-function-component'
import { editorPortal, useEditor } from './hooks/useEditor'
import { ContentComponent } from '../component/inner/contentComponent'
import '../component/index'

export const Editor = defineFunctionComponent(() => {
  const editorManager = useEditor()
  const { editor, doc, editorDomRef } = editorManager

  editorPortal.provider(editorManager)

  onMounted(() => {
    editor.event.emit('editor.onMounted')
  })

  return {
    render: () => {
      return (
        <div>
          <div>
            <h1 class={` px-4 m-4 font-medium text-lg`}>Editor</h1>
          </div>
          <div class={`px-4 m-4 text-gray-600`}>
            <button
              class={` bg-green-400 px-2 py-1 rounded-lg text-white`}
              onClick={() => {
                editorManager.test.intsertText()
              }}
            >
              添加文字
            </button>
          </div>
          <div
            contenteditable
            class={` shadow-md shadow-gray-400 m-4 rounded-md relative`}
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
