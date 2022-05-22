import { createInitState } from './schema'
import { EditorController } from '@essay/pm-view'
export function createEditor() {
  const editor = new EditorController(createInitState())
  return editor
}
