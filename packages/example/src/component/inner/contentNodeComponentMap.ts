import { defineFunctionComponent } from '@essay/define-function-component'

export const contentNodeComponentMap = new Map<
  string,
  ReturnType<typeof defineFunctionComponent>
>()

export function genComponentName(name: string) {
  return `${name}-component`
}
