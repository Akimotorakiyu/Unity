import { defineFunctionComponent } from '@essay/define-function-component'
import { TRelativeDirection, TRelativeSide } from '@essay/pm-view'
import { ref } from 'vue'

export const CursorComponent = defineFunctionComponent(
  (props: { rect: DOMRect }) => {
    return {
      render: () => {
        return (
          <span
            class={`absolute  bg-green-400 animate-pulse`}
            style={{
              transform: `translateX(${props.rect.x}px)translateY(${props.rect.y}px)`,
              height: `${props.rect.height}px`,
              width: `${props.rect.width}px`,
              animationDuration: '1000ms',
              animationTimingFunction: 'ease-in-out',
              animationName: 'cursor-fade',
            }}
          ></span>
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
          <span
            ref={domRef}
            class={`inline-block`}
            style={{
              height: `1em`,
              width: `0px`,
              pointerEvents: 'none',
            }}
          ></span>
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
