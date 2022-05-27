import { defineFunctionComponent } from '../func/defineFunctionComponent'
import { IJSONNode } from '@essay/pm-view'
import { genComponentName } from './contentNodeComponentMap'
import { useTextDomRef } from './useDomRef'
import { toRef } from 'vue'
export const TextNodeComponent = defineFunctionComponent(
  (props: { node: IJSONNode<any, any> }, ctx) => {
    const { domRef } = useTextDomRef(toRef(props, 'node'))

    return {
      render: () => {
        return <>{props.node.text}</>
      },
    }
  },
  {
    inheritAttrs: false,
    name: genComponentName('text'),
  },
)
