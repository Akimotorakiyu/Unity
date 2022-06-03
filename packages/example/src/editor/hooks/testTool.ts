import { EditorController } from '@essay/pm-view'

export function useTestTool(editor: EditorController) {
  Reflect.set(window, 'editor', editor)

  Reflect.set(window, 'test', {})

  return {}
}
