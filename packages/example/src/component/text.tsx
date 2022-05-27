import { defineFunctionComponent } from '../func/defineFunctionComponent'
import { IJSONNode } from '@essay/pm-view'
import { genComponentName } from './contentNodeComponentMap'
import { useDomRef } from './useDomRef'
import { toRef, createVNode, Text } from 'vue'
export const TextNodeComponent = defineFunctionComponent(
  (props: { node: IJSONNode<any, any> }, ctx) => {
    const { domRef } = useDomRef(toRef(props, 'node'))

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
