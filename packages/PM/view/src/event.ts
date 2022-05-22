import { EventPrototype } from '@essay/event-proto'
import { EditorState, Transaction } from 'prosemirror-state'

// @ref: https://km.sankuai.com/collabpage/1307365871
export interface ICommentBroadcastChange {
  eventType: 1 | 2 | 3 // 1 - create 2 - edit 3 - delete
  contentId: string
  discussionId: string
  quoteId: string
  commentId: string
  content: string
  operatorUid: string
  operatorMis: string
  images: string // JSON
  createTime?: number
  creatorMis?: string
  modifierMis: string
  modifyTime: number
}

type TEditorEvent = {
  'state.update': [
    newState: EditorState,
    oldState: EditorState,
    tr?: Transaction,
  ]
}

export class EditorEvent extends EventPrototype<TEditorEvent> {}
