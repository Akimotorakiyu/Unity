import { defineFunctionComponent } from '@essay/define-function-component'
import { onMounted, onUpdated, ref } from 'vue'
import { VirtualPen } from '@essay/pen'
import { editorPortal } from '../../editor/hooks/useEditor'
export const InputComponent = defineFunctionComponent((props: { rect: DOMRect }) => {
  const inputRef = ref<HTMLInputElement | null>(null)

  const virtualPen = new VirtualPen()

  const editorManager = editorPortal.injector()

  onMounted(() => {
    if (inputRef.value) {
      virtualPen.resetInputElement(inputRef.value)
    }
  })

  virtualPen.event.on('input', (virtualInputEventInfo) => {
    console.log('virtualInputEventInfo', virtualInputEventInfo)

    editorManager.editor.editorMethods.intsertText(virtualInputEventInfo.data || '')
  })

  onUpdated(() => {
    inputRef.value?.focus()
  })

  return {
    render: () => {
      return (
        <input
          ref={inputRef}
          class={`absolute`}
          style={{
            transform: `translateX(${props.rect.x}px)translateY(${props.rect.y}px)`,
            height: `${props.rect.height}px`,
            width: `0`,
          }}
        ></input>
      )
    },
  }
})
