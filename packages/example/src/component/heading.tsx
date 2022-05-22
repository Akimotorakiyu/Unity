import { defineFunctionComponent } from '../func/defineFunctionComponent'
import { FragmentContentComponent } from './content'
import { IJSONNode } from '@essay/pm-view'
import { genComponentName } from './contentNodeComponentMap'

export const HeadingNodeComponent = defineFunctionComponent(
  (props: { node: IJSONNode<any, any> }) => {
    return {
      render: () => {
        return (
          <h1 data-type={props.node.type} data-level={props.node.attrs.level}>
            <FragmentContentComponent
              fragment={props.node.content}
            ></FragmentContentComponent>
          </h1>
        )
      },
    }
  },
  {
    inheritAttrs: false,
    name: genComponentName('heading'),
  },
)
