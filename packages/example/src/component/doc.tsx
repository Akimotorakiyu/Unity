import { defineFunctionComponent } from '../func/defineFunctionComponent'
import { IJSONNode } from '@essay/pm-view'
import { FragmentContentComponent } from './content'
import { genComponentName } from './contentNodeComponentMap'

export const DocNodeComponent = defineFunctionComponent(
  (props: { node: IJSONNode<any, any> }) => {
    return {
      render: () => {
        return (
          <div data-type={props.node.type}>
            <FragmentContentComponent
              fragment={props.node.content}
            ></FragmentContentComponent>
          </div>
        )
      },
    }
  },
  {
    inheritAttrs: false,
    name: genComponentName('doc'),
  },
)
