import { defineFunctionComponent } from '../func/defineFunctionComponent'
import { FragmentContentComponent } from './content'
import { IJSONNode } from '@essay/pm-view'
import { genComponentName } from './contentNodeComponentMap'
import { useDomRef } from './useDomRef'
import { toRef } from 'vue'

export const PargraphNodeComponent = defineFunctionComponent(
  (props: { node: IJSONNode<any, any> }) => {
    const { domRef } = useDomRef(toRef(props, 'node'))

    return {
      render: () => {
        return (
          <p
            ref={domRef}
            data-type={props.node.type}
            id={props.node.attrs.id}
            class={`deal-empty`}
          >
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
