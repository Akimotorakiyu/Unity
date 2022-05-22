export interface IJSONNode<
  Type extends string,
  Attrs extends Record<string, string>,
> {
  type: Type
  content: IJSONNode<any, any>[]
  attrs: Attrs
  text?: string
}
