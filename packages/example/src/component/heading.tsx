import { defineFunctionComponent } from '@essay/define-function-component'
import { IJSONNode } from '@essay/pm-view'

import { toRef } from 'vue'
import { FragmentContentComponent } from './inner/contentComponent'
import { genComponentName } from './inner/contentNodeComponentMap'
import { useContainerComponentRef } from './inner/useDomRef'

export const HeadingNodeComponent = defineFunctionComponent(
  (props: { node: IJSONNode<any, any> }) => {
    const { domRef, placeholderRef } =
      useContainerComponentRef<HTMLParagraphElement>(toRef(props, 'node'))

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
