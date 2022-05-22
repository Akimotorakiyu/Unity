import { baseKeymap, toggleMark } from 'prosemirror-commands'
import { redo, undo } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { Schema } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'
import { history } from 'prosemirror-history'

export const mySchema = new Schema({
  nodes: {
    doc: {
      content: 'block math block+',
    },
    heading: {
      attrs: {
        id: {},
        level: {
          default: '1',
        },
        align: {
          default: 'left',
        },
      },
    },
    pargraph: {
      group: 'block',
      attrs: {
        id: {},
      },
      content: 'text*',
      parseDOM: [{ tag: 'p' }],
      toDOM() {
        const p = document.createElement('p')
        return {
          dom: p,
          contentDOM: p,
        }
      },
    },
    text: {},
  },
  marks: {
    bold: {
      parseDOM: [{ tag: 'b' }],
      toDOM() {
        const b = document.createElement('b')
        return {
          dom: b,
          contentDOM: b,
        }
      },
    },
  },
})

export const boldCommand = toggleMark(mySchema.marks.bold)

export function createInitState() {
  const initState = EditorState.create({
    schema: mySchema,
    plugins: [
      keymap(baseKeymap),
      history(),
      keymap({
        'Mod-z': undo,
        'Shift-Mod-z': redo,
        'Mod-b': boldCommand,
      }),
    ],
  })

  return initState
}
