import { EditorController } from '@essay/pm-view'
import { ref, watch } from 'vue'

export function useEditorDomRef(editor: EditorController<any>) {
  const editorDomRef = ref<HTMLDivElement | null>(null)

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

  return {
    editorDomRef,
  }
}
