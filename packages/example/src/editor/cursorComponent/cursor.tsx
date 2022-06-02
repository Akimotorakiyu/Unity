import { defineFunctionComponent } from '@essay/define-function-component'
import { TRelativeDirection, TRelativeSide } from '@essay/pm-view'
import { ref, onMounted, onUpdated, ComponentInternalInstance } from 'vue'

/**
 * Todo: 升级城绝对定位的方案
 */
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

export type TEditorComponentVNode = {
  calcCursorRect: (
    direction?: TRelativeDirection,
    side?: TRelativeSide,
  ) => DOMRect | null
}

export const CursorPlaceholderComponent = defineFunctionComponent(
  (props: {}) => {
    const domRef = ref<HTMLSpanElement | null>(null)

    return {
      render: () => {
        return (
          <div
            ref={domRef}
            class={`inline-block`}
            style={{
              height: `1em`,
              width: `0px`,
              pointerEvents: 'none',
            }}
          ></div>
        )
      },
      calcCursorRect(
        direction: TRelativeDirection,
        side: TRelativeSide,
      ): DOMRect | null {
        if (domRef.value) {
          const rect = domRef.value.getBoundingClientRect()
          return new DOMRect(rect.x, rect.y, 2, rect.height)
        } else {
          return null
        }
      },
    }
  },
  {
    name: 'cursor-placeholder',
  },
)
