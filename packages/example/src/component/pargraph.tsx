import { defineFunctionComponent } from '../func/defineFunctionComponent'
import { FragmentContentComponent } from './content'
import { IJSONNode } from '@essay/pm-view'
import { genComponentName } from './contentNodeComponentMap'

export const PargraphNodeComponent = defineFunctionComponent(
  (props: { node: IJSONNode<any, any> }) => {
    return {
      render: () => {
        return (
          <p data-type={props.node.type}>
            <FragmentContentComponent
              fragment={props.node.content}
            ></FragmentContentComponent>
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
