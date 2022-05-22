import { defineFunctionComponent } from '../func/defineFunctionComponent'
import {
  contentNodeComponentMap,
  genComponentName,
} from './contentNodeComponentMap'
import { getIdFormNode, IJSONNode } from '@essay/pm-view'

export const ContentComponent = defineFunctionComponent(
  (props: { node: IJSONNode<any, any> }) => {
    const RealComponent = contentNodeComponentMap.get(props.node.type)!

    if (!RealComponent) {
      throw new Error(`没有找到注册的组件${props.node.type.name}`)
    }

    return {
      render: () => {
        // @ts-ignore
        return <RealComponent node={props.node}></RealComponent>
      },
    }
  },
  {
    inheritAttrs: true,
    name: genComponentName('content'),
  },
)

export const FragmentContentComponent = defineFunctionComponent(
  (props: { fragment: IJSONNode<any, any>[] }) => {
    return {
      render: () => {
        return (
          <>
            {props.fragment?.map((node) => {
              const key = getIdFormNode(node)

              return <ContentComponent node={node} key={key}></ContentComponent>
            })}
          </>
        )
      },
    }
  },
  {
    inheritAttrs: false,
    name: genComponentName('fragment-content'),
  },
)
