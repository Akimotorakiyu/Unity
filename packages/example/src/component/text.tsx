import { defineFunctionComponent } from '../func/defineFunctionComponent'
import { getIdFormJSONNode, IJSONNode } from '@essay/pm-view'
import { genComponentName } from './contentNodeComponentMap'
import { useDomRef } from './useDomRef'
import { toRef, createVNode, Text } from 'vue'
import { editorPortal } from '../editor/hooks/useEditor'
import { CursorComponent } from '../editor/cursorComponent/cursor'
export const TextNodeComponent = defineFunctionComponent(
  (props: { node: IJSONNode<any, any> }, ctx) => {
    const { domRef } = useDomRef(toRef(props, 'node'))

    const id = getIdFormJSONNode(props.node)

    const editorManager = editorPortal.injector()

    const selection = editorManager.editorSelection.selection

    return {
      render: () => {
        return (
          <>
            {selection.value?.cursor.id === id &&
              selection.value?.cursor.side === 'outside' &&
              selection.value.cursor.relative === 'before' && (
                <CursorComponent></CursorComponent>
              )}
            {createVNode(Text, { ref: domRef }, props.node.text, 0)}

            {selection.value?.cursor.id === id &&
              selection.value?.cursor.side === 'outside' &&
              selection.value.cursor.relative === 'after' && (
                <CursorComponent></CursorComponent>
              )}
          </>
        )
      },
    }
  },
  {
    inheritAttrs: false,
    name: genComponentName('text'),
  },
)
