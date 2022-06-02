import { defineFunctionComponent } from '@essay/define-function-component'
import { IJSONNode } from '@essay/pm-view'

import { FragmentContentComponent } from './inner/contentComponent'
import { genComponentName } from './inner/contentNodeComponentMap'
import { useDomRef } from './inner/useDomRef'
import { toRef } from 'vue'
import { editorPortal } from '../editor/hooks/useEditor'
import { CursorComponent } from '../editor/cursorComponent/cursor'
import { getIdFormJSONNode } from '../../../PM/view/src/jsonNode'

export const PargraphNodeComponent = defineFunctionComponent(
  (props: { node: IJSONNode<any, any> }) => {
    const { domRef } = useDomRef(toRef(props, 'node'))

    const id = getIdFormJSONNode(props.node)

    const editorManager = editorPortal.injector()

    const selection = editorManager.editorSelection.selection

    return {
      render: () => {
        return (
          <p
            ref={domRef}
            data-type={props.node.type}
            id={props.node.attrs.id}
            class={`deal-empty`}
          >
            {selection.value?.cursor.id === id &&
              selection.value?.cursor.side === 'inside' &&
              selection.value.cursor.relative === 'before' && (
                <CursorComponent></CursorComponent>
              )}
            <FragmentContentComponent
              fragment={props.node.content}
            ></FragmentContentComponent>
            {selection.value?.cursor.id === id &&
              selection.value?.cursor.side === 'inside' &&
              selection.value.cursor.relative === 'after' && (
                <CursorComponent></CursorComponent>
              )}
          </p>
        )
      },
    }
  },
  {
    inheritAttrs: false,
    name: genComponentName('pargraph'),
  },
)
