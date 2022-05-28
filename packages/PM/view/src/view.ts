import { Node as PMNode, Schema } from 'prosemirror-model'
import { EditorState, TextSelection, Transaction } from 'prosemirror-state'
import { getEditorNodeByDomNode } from './const'
import { EditorEvent } from './event'
import { getIdFormJSONNode, IJSONNode } from './jsonNode'
import { addUniqueMark } from './schema'
import { pointToRange } from './util'

class EditorPoint {
  constructor(public readonly x: number, public readonly y: number) {
    this.domRange = pointToRange(this.x, this.y)
  }

  domRange: Range | null = null

  get domNode() {
    return this.domRange ? this.domRange.startContainer : null
  }

  get editorNode() {
    return this.domNode ? getEditorNodeByDomNode(this.domNode) : null
  }

  get domOffset() {
    return this.domRange ? this.domRange.startOffset : null
  }
}

function findNodeById(id: string, doc: PMNode) {
  let resNode: PMNode | null = null
  let resPos = 0

  doc.nodesBetween(0, doc.nodeSize - 2, (node, pos) => {
    if (getIdFormJSONNode(node.toJSON() as IJSONNode<any, any>) === id) {
      resNode = node
      resPos = pos
    }
  })

  if (resNode) {
    return {
      node: resNode as PMNode,
      pos: resPos,
    }
  } else {
    return null
  }
}

export class EditorController<S extends Schema> {
  readonly event: EditorEvent = new EditorEvent()
  constructor(public state: EditorState<S>) {}
  dom: HTMLDivElement | null = null

  init(dom: HTMLDivElement) {
    dom.addEventListener('click', this.onClick)
    dom.addEventListener('pointerdown', this.onPointerDown)
    this.dom = dom
  }

  readonly onClick = (event: MouseEvent) => {
    console.log('event', event)
    this.dealSelection(new EditorPoint(event.x, event.y))
  }

  dealSelection(point: EditorPoint) {
    if (point.domRange) {
      const node = point.editorNode!
      const id = getIdFormJSONNode(node)

      const res = findNodeById(id, this.state.doc)
      console.log('set selection', id, res)

      if (res) {
        const tr = this.state.tr
        tr.setSelection(
          new TextSelection(
            this.state.doc.resolve(res.pos),
            this.state.doc.resolve(res.pos),
          ),
        )
        this.dispatch(tr)
      }
    }
  }

  readonly onPointerDown = (event: PointerEvent) => {}

  unInit() {
    if (this.dom) {
      const dom = this.dom

      dom.removeEventListener('click', this.onClick)
      dom.removeEventListener('pointerdown', this.onPointerDown)

      this.dom = null
    }
  }

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
  domAtPos(pos: number, side?: number): { node: PMNode; offset: number } {
    throw new Error('Method not implemented.')
  }
  nodeDOM(pos: number): PMNode | null | undefined {
    throw new Error('Method not implemented.')
  }
  posAtDOM(node: PMNode, offset: number, bias?: number | null): number {
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
