// https://www.w3.org/TR/input-events-2/#interface-InputEvent-Attributes

export interface DaltaInputEventInfo {
  data: string | null
  value: string
  status: 'normal' | 'start' | 'updating' | 'end'
  rawEvent: InputEvent | CompositionEvent
}

export class VirtualPen {
  constructor(public inputElement?: HTMLTextAreaElement | HTMLTextAreaElement) {
    if (inputElement) {
      this.addListeneres()
    }
  }

  onInput: null | ((inputEventInfo: DaltaInputEventInfo) => void) = null

  resetInputElement(inputElement: HTMLTextAreaElement | HTMLTextAreaElement) {
    this.removeListeneres()

    this.inputElement = inputElement
    this.addListeneres()
  }

  private addListeneres() {
    this.inputElement?.addEventListener('input', this._inputListener)
    this.inputElement?.addEventListener(
      'compositionstart',
      this.compositionStartListener,
    )
    this.inputElement?.addEventListener(
      'compositionupdate',
      this.compositionUpdateListener,
    )
    this.inputElement?.addEventListener(
      'compositionend',
      this.compositionEndListener,
    )
  }

  private removeListeneres() {
    this.inputElement?.removeEventListener('input', this._inputListener)
    this.inputElement?.removeEventListener(
      'compositionstart',
      this.compositionStartListener,
    )
    this.inputElement?.removeEventListener(
      'compositionupdate',
      this.compositionUpdateListener,
    )
    this.inputElement?.removeEventListener(
      'compositionend',
      this.compositionEndListener,
    )
  }
  private _inputListener = (event: Event) => {
    this.inputListener(event as InputEvent)
  }

  private inputListener = (event: InputEvent) => {
    const inputElement = event.target as HTMLInputElement | HTMLTextAreaElement
    this.onInput?.({
      data: event.data,
      value: inputElement.value,
      rawEvent: event,
      status: 'normal',
    })
  }
  private compositionStartListener = (event: CompositionEvent) => {
    const inputElement = event.target as HTMLInputElement | HTMLTextAreaElement
    this.onInput?.({
      data: event.data,
      value: inputElement.value,
      rawEvent: event,
      status: 'start',
    })
  }
  private compositionUpdateListener = (event: CompositionEvent) => {
    const inputElement = event.target as HTMLInputElement | HTMLTextAreaElement
    this.onInput?.({
      data: event.data,
      value: inputElement.value,
      rawEvent: event,
      status: 'updating',
    })
  }
  private compositionEndListener = (event: CompositionEvent) => {
    const inputElement = event.target as HTMLInputElement | HTMLTextAreaElement
    this.onInput?.({
      data: event.data,
      value: inputElement.value,
      rawEvent: event,
      status: 'end',
    })
  }
}
