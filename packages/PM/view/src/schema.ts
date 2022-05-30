// import { baseKeymap } from 'prosemirror-commands'
// import { redo, undo } from 'prosemirror-history'
// import { keymap } from 'prosemirror-keymap'
import { Node, Schema } from 'prosemirror-model'
import { EditorState, Transaction } from 'prosemirror-state'
// import { history } from 'prosemirror-history'
import { genNanoDomId } from '@essay/nanoid'

export const mySchema = new Schema({
  nodes: {
    doc: {
      attrs: {
        id: {
          default: () => genNanoDomId(),
        },
      },
      content: 'block+',
    },
    pargraph: {
      group: 'block',
      attrs: {
        id: {
          default: () => genNanoDomId(),
        },
        align: {
          default: 'left',
        },
      },
      content: 'text*',
      parseDOM: [
        {
          tag: 'p',
        },
      ],
      toDOM() {
        const p = document.createElement('p')
        return {
          dom: p,
          contentDOM: p,
        }
      },
    },
    heading: {
      attrs: {
        id: {
          default: () => genNanoDomId(),
        },
        level: {
          default: '1',
        },
        align: {
          default: 'left',
        },
      },
    },

    text: {
      attrs: {
        id: {
          default: () => genNanoDomId(),
        },
      },
    },
  },
  marks: {
    unique: {
      excludes: '',
      inclusive: false,
      attrs: {
        id: {
          default: () => genNanoDomId(),
        },
      },
      parseDOM: [{ tag: 'b' }],
      toDOM() {
        const unique = document.createElement('unique')
        return {
          dom: unique,
          contentDOM: unique,
        }
      },
    },
  },
})

export const addUniqueMark = function (tr: Transaction) {
  tr.doc.nodesBetween(0, tr.doc.nodeSize - 2, (node, pos) => {
    if (node.type.name === 'text' && !hasUniqueMark(node)) {
      _addUniqueMarkOnRange(pos, node, tr)
    }
  })
}

function _addUniqueMarkOnRange(from: number, node: Node, tr: Transaction) {
  for (let index = 0; index < node.nodeSize; index++) {
    const start = from + index

    tr.addMark(
      start,
      start + 1,
      mySchema.marks.unique.create({ id: genNanoDomId() }),
    )
  }
}

function getUniqueMarkFromNode(node: Node) {
  return node.marks.filter((mark) => {
    return mark.type.name === 'unique'
  })
}

function hasUniqueMark(node: Node) {
  if (node.type.name === 'text') {
    const uniqueMark = getUniqueMarkFromNode(node)
    if (uniqueMark.length === 1) {
      if (node.nodeSize > 1) {
        throw new Error('一个带 uniqueMark 的节点的长度不应大于1')
      }
      return true
    } else if (uniqueMark.length === 0) {
      return false
    } else {
      throw new Error('一个文本节点只应有一个 uniqueMark')
    }
  } else {
    throw new Error('不应该从除text节点意外节点中检查 UniqueMark')
  }
}

export function createInitState() {
  const initState = EditorState.create({
    schema: mySchema,
    plugins: [
      // keymap(baseKeymap),
      // history(),
      // keymap({
      //   'Mod-z': undo,
      //   'Shift-Mod-z': redo,
      // }),
    ],
  })

  return initState
}
