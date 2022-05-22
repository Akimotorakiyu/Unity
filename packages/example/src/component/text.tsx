import { defineFunctionComponent } from '../func/defineFunctionComponent'
import { IJSONNode } from '@essay/pm-view'
import { genComponentName } from './contentNodeComponentMap'

export const TextNodeComponent = defineFunctionComponent(
  (props: { node: IJSONNode<any, any> }) => {
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
