import { defineFunctionComponent } from './../func/defineFunctionComponent'

export const contentNodeComponentMap = new Map<
  string,
  ReturnType<typeof defineFunctionComponent>
>()

export function genComponentName(name: string) {
  return `${name}-component`
}
