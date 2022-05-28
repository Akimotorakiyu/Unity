import { onMounted } from 'vue'
import { ContentComponent } from '../component'
import { defineFunctionComponent } from '../func/defineFunctionComponent'
import { CursorComponent } from './cursorComponent/cursor'
import { editorPortal, useEditor } from './hooks/useEditor'

export const Editor = defineFunctionComponent(() => {
  const editorManager = useEditor()
  const { editor, doc, editorDomRef } = editorManager

  editorPortal.provider(editorManager)

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
            class={` shadow-md shadow-gray-400 m-4 rounded-md relative`}
          >
            <div
              ref={editorDomRef}
              contenteditable={false}
              tabindex="-1"
              onClick={() => {}}
              onPointerdown={() => {}}
            >
              <div class={`absolute`}>
                <CursorComponent
                  rect={editorManager.editorSelection.cursorRect.value}
                ></CursorComponent>
              </div>
              <ContentComponent node={doc.value}></ContentComponent>
            </div>
          </div>
        </div>
      )
    },
  }
})
