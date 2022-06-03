import { EventPrototype } from '@essay/event-proto'
import { EditorState, Transaction } from 'prosemirror-state'

type TEditorEvent = {
  'state.update': [newState: EditorState, oldState: EditorState, tr?: Transaction]
  'editor.onMounted': []
}

export class EditorEvent extends EventPrototype<TEditorEvent> {}
