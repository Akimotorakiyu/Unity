import { defineFunctionComponent } from '@essay/define-function-component'
import { IJSONNode, TRelativeDirection, TRelativeSide } from '@essay/pm-view'

import { FragmentContentComponent } from './inner/contentComponent'
import { genComponentName } from './inner/contentNodeComponentMap'
import { toRef } from 'vue'
import { editorPortal } from '../editor/hooks/useEditor'
import { getIdFormJSONNode } from '../../../PM/view/src/jsonNode'
import { useContainerComponentRef } from './inner/useDomRef'
import { CursorPlaceholderComponent } from './inner/cursor'

export const PargraphNodeComponent = defineFunctionComponent(
  (props: { node: IJSONNode<any, any> }) => {
    const { domRef, placeholderRef } =
      useContainerComponentRef<HTMLParagraphElement>(toRef(props, 'node'))

    const id = getIdFormJSONNode(props.node)

    const editorManager = editorPortal.injector()

    const selection = editorManager.editorSelection.selection

    return {
      render: () => {
        return (
          <p ref={domRef} data-type={props.node.type} id={props.node.attrs.id}>
            <CursorPlaceholderComponent
              ref={placeholderRef.beforePlacehoderVnodeRef}
            />
            <FragmentContentComponent
              fragment={props.node.content}
            ></FragmentContentComponent>
            <CursorPlaceholderComponent
              ref={placeholderRef.beforePlacehoderVnodeRef}
            />
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
