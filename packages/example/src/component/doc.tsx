import { defineFunctionComponent } from '../func/defineFunctionComponent'
import { IJSONNode } from '@essay/pm-view'
import { FragmentContentComponent } from './content'
import { genComponentName } from './contentNodeComponentMap'
import { useDomRef } from './useDomRef'
import { toRef } from 'vue'

export const DocNodeComponent = defineFunctionComponent(
  (props: { node: IJSONNode<any, any> }) => {
    const { domRef } = useDomRef(toRef(props, 'node'))
    return {
      render: () => {
        return (
          <div
            ref={domRef}
            data-type={props.node.type}
            id={props.node.attrs.id}
          >
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
