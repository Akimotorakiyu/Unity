import { Schema } from 'prosemirror-model'
import { EditorState, Transaction } from 'prosemirror-state'

export class EEditorView<S extends Schema> {
  constructor(public dom: HTMLDivElement, public state: EditorState<S>) {}

  dispatch(tr: Transaction) {
    const newState = this.state.apply(tr)
    this.update(newState)
  }

  update(newState: EditorState<S>) {
    this.state = newState
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
