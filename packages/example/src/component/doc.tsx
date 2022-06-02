import { defineFunctionComponent } from '@essay/define-function-component'
import { IJSONNode } from '@essay/pm-view'

import { toRef } from 'vue'
import { FragmentContentComponent } from './inner/contentComponent'
import { genComponentName } from './inner/contentNodeComponentMap'
import { useContainerComponentRef } from './inner/useDomRef'

export const DocNodeComponent = defineFunctionComponent(
  (props: { node: IJSONNode<any, any> }) => {
    const { domRef, placeholderRef } =
      useContainerComponentRef<HTMLParagraphElement>(toRef(props, 'node'))

    return {
      render: () => {
        return (
          <div
            ref={domRef}
            data-type={props.node.type}
            id={props.node.attrs.id}
            class={` p-4`}
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
