import { EditorController } from '@essay/pm-view'

export function intsertText(editor: EditorController<any>) {
  const tr = editor.state.tr
  tr.insertText('hello world', 1, 1)
  editor.dispatch(tr)
}

export function useTestTool(editor: EditorController<any>) {
  Reflect.set(window, 'editor', editor)

  Reflect.set(window, 'test', {
    intsertText() {
      intsertText(editor)
    },
  })
}
