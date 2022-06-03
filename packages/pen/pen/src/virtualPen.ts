// https://www.w3.org/TR/input-events-2/#interface-InputEvent-Attributes

export interface VirtualInputEventInfo {
  data: string | null
  value: string
  status: 'normal' | 'start' | 'updating' | 'end'
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

  event = new VirtualInputEvent()

  onInput(inputEventInfo: VirtualInputEventInfo) {
    this.event.emit('input', inputEventInfo)
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

  private inputListener = (event: InputEvent) => {
    const inputElement = event.target as HTMLInputElement | HTMLTextAreaElement
    this.onInput({
      data: event.data,
      value: inputElement.value,
      status: 'normal',
      rawEvent: event,
    })
  }
  private compositionStartListener = (event: CompositionEvent) => {
    const inputElement = event.target as HTMLInputElement | HTMLTextAreaElement
    this.onInput({
      data: event.data,
      value: inputElement.value,
      status: 'start',
      rawEvent: event,
    })
  }
  private compositionUpdateListener = (event: CompositionEvent) => {
    const inputElement = event.target as HTMLInputElement | HTMLTextAreaElement
    this.onInput({
      data: event.data,
      value: inputElement.value,
      status: 'updating',
      rawEvent: event,
    })
  }
  private compositionEndListener = (event: CompositionEvent) => {
    const inputElement = event.target as HTMLInputElement | HTMLTextAreaElement
    this.onInput({
      data: event.data,
      value: inputElement.value,
      status: 'end',
      rawEvent: event,
    })
  }
}
