// https://www.w3.org/TR/input-events-2/#interface-InputEvent-Attributes

type TInputStatus = 'normal' | 'start' | 'updating' | 'end'

export interface VirtualInputEventInfo {
  data: string | null
  value: string
  status: TInputStatus
  rawEvent: InputEvent | CompositionEvent
}

import { EventPrototype } from '@essay/event-proto'

type TEVirtualInputEvent = {
  input: [VirtualInputEventInfo]
}

export class VirtualInputEvent extends EventPrototype<TEVirtualInputEvent> {}

export class VirtualPen {
  constructor(public inputElement?: HTMLInputElement) {
    if (inputElement) {
      this.addListeneres()
    }
  }

  status: 'normal' | 'composing' = 'normal'

  event = new VirtualInputEvent()

  onInput(inputEventInfo: VirtualInputEventInfo) {
    this.event.emit('input', inputEventInfo)
    // if (inputEventInfo.status === 'normal' && this.inputElement) {
    //   this.inputElement.value = ''
    // }
  }

  resetInputElement(inputElement: HTMLInputElement) {
    this.removeListeneres()

    this.inputElement = inputElement
    this.addListeneres()
  }

  private addListeneres() {
    this.inputElement?.addEventListener('input', this._inputListener)
    this.inputElement?.addEventListener('compositionstart', this.compositionStartListener)
    this.inputElement?.addEventListener('compositionupdate', this.compositionUpdateListener)
    this.inputElement?.addEventListener('compositionend', this.compositionEndListener)
  }

  private removeListeneres() {
    this.inputElement?.removeEventListener('input', this._inputListener)
    this.inputElement?.removeEventListener('compositionstart', this.compositionStartListener)
    this.inputElement?.removeEventListener('compositionupdate', this.compositionUpdateListener)
    this.inputElement?.removeEventListener('compositionend', this.compositionEndListener)
  }
  private _inputListener = (event: Event) => {
    this.inputListener(event as InputEvent)
  }

  static resetInputElementContent(inputElement?: HTMLInputElement) {
    if (inputElement) {
      inputElement.value = ''
    }
  }

  private inputListener = (event: InputEvent) => {
    if (this.status === 'normal') {
      const inputElement = event.target as HTMLInputElement
      this.onInput({
        data: event.data,
        value: inputElement.value,
        status: 'normal',
        rawEvent: event,
      })

      VirtualPen.resetInputElementContent(inputElement)
    }
  }
  private compositionStartListener = (event: CompositionEvent) => {
    const inputElement = event.target as HTMLInputElement
    this.onInput({
      data: event.data,
      value: inputElement.value,
      status: 'start',
      rawEvent: event,
    })
    this.status = 'composing'
  }
  private compositionUpdateListener = (event: CompositionEvent) => {
    const inputElement = event.target as HTMLInputElement
    this.onInput({
      data: event.data,
      value: inputElement.value,
      status: 'updating',
      rawEvent: event,
    })
  }

  private compositionEndListener = (event: CompositionEvent) => {
    const inputElement = event.target as HTMLInputElement
    this.onInput({
      data: event.data,
      value: inputElement.value,
      status: 'end',
      rawEvent: event,
    })
    this.status = 'normal'
    VirtualPen.resetInputElementContent(inputElement)
  }
}
