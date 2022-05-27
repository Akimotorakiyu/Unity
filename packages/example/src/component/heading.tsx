import { defineFunctionComponent } from '../func/defineFunctionComponent'
import { FragmentContentComponent } from './content'
import { IJSONNode } from '@essay/pm-view'
import { genComponentName } from './contentNodeComponentMap'
import { useDomRef } from './useDomRef'
import { toRef } from 'vue'

export const HeadingNodeComponent = defineFunctionComponent(
  (props: { node: IJSONNode<any, any> }) => {
    const { domRef } = useDomRef(toRef(props, 'node'))

    return {
      render: () => {
        return (
          <h1
            ref={domRef}
            data-type={props.node.type}
            data-level={props.node.attrs.level}
            id={props.node.attrs.id}
            class={`deal-empty`}
          >
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
