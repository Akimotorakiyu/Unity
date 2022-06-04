import { nextTick, onMounted } from 'vue'
import { defineFunctionComponent } from '@essay/define-function-component'
import { editorPortal, useEditor } from './hooks/useEditor'
import { ContentComponent } from '../component/inner/contentComponent'
import '../component/index'
import { CursorComponent } from '../component/inner/cursor'
import { InputComponent } from '../component/inner/input'

export const Editor = defineFunctionComponent(() => {
  const editorManager = useEditor()
  const { editor, doc, editorDomRef } = editorManager

  editorPortal.provider(editorManager)

  onMounted(() => {
    nextTick(() => {
      editor.event.emit('editor.onMounted')
    })
  })

  return {
    render: () => {
      return (
        <div>
          <div>
            <h1 class={` px-4 m-4 font-medium text-lg`}>Editor</h1>
          </div>
          <div class={`px-4 m-4 text-gray-600`}></div>
          <div contenteditable class={` shadow-md shadow-gray-400 m-4 rounded-md relative`}>
            <div ref={editorDomRef} contenteditable={false} tabindex="-1" onClick={() => {}} onPointerdown={() => {}}>
              <div class={` absolute`}>
                <CursorComponent rect={editorManager.editorSelection.cursorRect.value} />
                <InputComponent rect={editorManager.editorSelection.cursorRect.value} />
              </div>
              <ContentComponent node={doc.value} />
            </div>
          </div>
        </div>
      )
    },
  }
})
