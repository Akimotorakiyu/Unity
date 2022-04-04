export interface MarkSpec {
  group: string
  defaultAttrs: Record<
    string,
    {
      default: any
    }
  >
  toDom: () => {
    dom: HTMLElement
    contentContainer: HTMLElement
  }
  parseDOm: (dom: HTMLElement) => {
    dom: HTMLElement
    contentContainer: HTMLElement
  }
}

export interface NodeSpec {
  checkChildNodeSpecIsAllowed?: (nodeSpec: NodeSpec) => boolean
  checkMarkSpecIsAllowed?: (markSpec: MarkSpec) => boolean

  group: string
  defaultAttrs: Record<
    string,
    {
      default: any
    }
  >
  toDom: () => {
    dom: HTMLElement
    contentContainer: HTMLElement
  }
  parseDOm: (dom: HTMLElement) => {
    dom: HTMLElement
    contentContainer: HTMLElement
  }
}
