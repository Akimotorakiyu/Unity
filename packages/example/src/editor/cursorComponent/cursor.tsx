import { defineFunctionComponent } from '../../func/defineFunctionComponent'

export const CursorComponent = defineFunctionComponent(
  (props: { rect: DOMRect }) => {
    return {
      render: () => {
        return (
          <div
            class={`absolute  bg-green-400 animate-pulse`}
            style={{
              transform: `translateX(${props.rect.x}px)translateY(${props.rect.y}px)`,
              height: `${props.rect.height}px`,
              width: `${props.rect.width}px`,
              animationDuration: '1000ms',
              animationTimingFunction: 'ease-in-out',
              animationName: 'cursor-fade',
            }}
          ></div>
        )
      },
    }
  },
  {
    name: 'cursor',
  },
)
