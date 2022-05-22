import { Schema } from 'prosemirror-model'
import { EditorState, Transaction } from 'prosemirror-state'
import { EditorEvent } from './event'
import { addUniqueMark } from './schema'

export class EditorController<S extends Schema> {
  event: EditorEvent = new EditorEvent()
  constructor(public state: EditorState<S>) {}

  dispatch(tr: Transaction) {
    addUniqueMark(tr)
    const newState = this.state.apply(tr)
    this.update(newState, tr)
  }

  update(newState: EditorState<S>, tr?: Transaction) {
    const oldState = this.state
    this.state = newState

    this.event.emit('state.update', newState, oldState, tr)
  }

  editable: boolean = true
  composing: boolean = false

  posAtCoords(coords: {
    left: number
    top: number
  }): { pos: number; inside: number } | null | undefined {
    throw new Error('Method not implemented.')
  }
  coordsAtPos(
    pos: number,
    side?: number,
  ): { left: number; right: number; top: number; bottom: number } {
    throw new Error('Method not implemented.')
  }
  domAtPos(pos: number, side?: number): { node: Node; offset: number } {
    throw new Error('Method not implemented.')
  }
  nodeDOM(pos: number): Node | null | undefined {
    throw new Error('Method not implemented.')
  }
  posAtDOM(node: Node, offset: number, bias?: number | null): number {
    throw new Error('Method not implemented.')
  }
  endOfTextblock(
    dir: 'up' | 'down' | 'left' | 'right' | 'forward' | 'backward',
    state?: EditorState<any>,
  ): boolean {
    throw new Error('Method not implemented.')
  }
  destroy(): void {
    throw new Error('Method not implemented.')
  }

  isDestroyed: boolean = false
}
