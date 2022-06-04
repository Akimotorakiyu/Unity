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
  deleteContentBackward: []
}

type THTMLInputElementInputType =
  | 'deleteContentBackward'
  | 'insertText'
  | 'insertCompositionText'
  | 'insertFromPaste'
  | 'historyUndo'
  | 'insertParagraph'

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
    this.inputElement?.addEventListener('keydown', this.keyDownListener)
  }

  private removeListeneres() {
    this.inputElement?.removeEventListener('input', this._inputListener)
    this.inputElement?.removeEventListener('compositionstart', this.compositionStartListener)
    this.inputElement?.removeEventListener('compositionupdate', this.compositionUpdateListener)
    this.inputElement?.removeEventListener('compositionend', this.compositionEndListener)
    this.inputElement?.removeEventListener('keydown', this.keyDownListener)
  }
  private _inputListener = (event: Event) => {
    this.inputRulerSwitcher(event as InputEvent)
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

  private inputRulerSwitcher = (event: InputEvent) => {
    const inputtype = event.inputType as THTMLInputElementInputType

    switch (inputtype) {
      case 'insertText':
        this.inputListener(event)
        break
      case 'deleteContentBackward':
        this.event.emit('deleteContentBackward')
        break
      case 'historyUndo':
      case 'insertParagraph':
      case 'insertFromPaste':
      case 'insertCompositionText':
        break

      default:
        const n: never = inputtype
        if (n) {
          throw new Error(`未定义的输入类型 ${event.inputType}`)
        }
        break
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

  private keyDownListener = (event: KeyboardEvent) => {
    console.log('event.key', event.key)
    if (event.key === 'Backspace') {
      this.event.emit('deleteContentBackward')
    }
  }
}
