import { EditorController, createInitState } from '@essay/pm-view'
export function createEditor() {
  const editor = new EditorController(createInitState())
  return editor
}
