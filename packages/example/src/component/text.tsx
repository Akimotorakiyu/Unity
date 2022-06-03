import { defineFunctionComponent } from '@essay/define-function-component'
import { getIdFormJSONNode, IJSONNode } from '@essay/pm-view'

import { toRef, createVNode, Text, getCurrentInstance } from 'vue'
import { editorPortal } from '../editor/hooks/useEditor'

import { genComponentName } from './inner/contentNodeComponentMap'
import { useTextComponentRef } from './inner/useDomRef'

export const TextNodeComponent = defineFunctionComponent(
  (props: { node: IJSONNode<any, any> }, ctx) => {
    const { domRef } = useTextComponentRef(toRef(props, 'node'))

    const id = getIdFormJSONNode(props.node)

    const editorManager = editorPortal.injector()

    getCurrentInstance()

    return {
      render: () => {
        return createVNode(Text, { ref: domRef }, props.node.text, 0)
      },
    }
  },
  {
    inheritAttrs: false,
    name: genComponentName('text'),
  },
)
