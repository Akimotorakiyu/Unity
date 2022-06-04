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

    if (virtualInputEventInfo.status === 'normal' || virtualInputEventInfo.status === 'end') {
      editorManager.editor.editorMethods.intsertText(virtualInputEventInfo.data || '')
    }
  })

  onUpdated(() => {
    inputRef.value?.focus()
  })

  return {
    render: () => {
      return (
        <input
          ref={inputRef}
          class={`absolute opacity-0 pointer-events-none w-[2px]`}
          style={{
            transform: `translateX(${props.rect.x}px)translateY(${props.rect.y}px)`,
            height: `${props.rect.height}px`,
          }}
        ></input>
      )
    },
  }
})
