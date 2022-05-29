import { EditorController } from '@essay/pm-view'

export function _intsertText(editor: EditorController<any>) {
  const tr = editor.state.tr
  tr.insertText(
    'hello world',
    editor.state.selection.from,
    editor.state.selection.to,
  )
  editor.dispatch(tr)
}

export function useTestTool(editor: EditorController<any>) {
  Reflect.set(window, 'editor', editor)

  const intsertText = () => {
    _intsertText(editor)
  }

  Reflect.set(window, 'test', { intsertText })

  return {
    intsertText,
  }
}
