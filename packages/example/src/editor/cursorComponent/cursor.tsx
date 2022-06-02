import { defineFunctionComponent } from '@essay/define-function-component'

/**
 * Todo: 升级城绝对定位的方案
 */
export const CursorComponent = defineFunctionComponent(
  (props: {}) => {
    return {
      render: () => {
        return (
          <div
            class={`bg-green-400 animate-pulse inline-block`}
            style={{
              height: `1em`,
              width: `2px`,
              animationDuration: '1600ms',
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
