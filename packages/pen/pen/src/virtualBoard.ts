export class VirtuaBoard {
  constructor(public containerElement?: HTMLElement) {}

  addListeneres = () => {
    this.containerElement?.addEventListener(
      'pointerdown',
      this.pointerDownListener,
    )
    this.containerElement?.addEventListener(
      'pointermove',
      this.pointerMoveListener,
    )
    this.containerElement?.addEventListener('pointerup', this.pointerUpListener)
  }

  pointerDownListener = (event: PointerEvent) => {
    const containerElement = event.target as HTMLElement
    containerElement.requestPointerLock()
  }
  pointerMoveListener = (event: PointerEvent) => {}
  pointerUpListener = (event: PointerEvent) => {
    const containerElement = event.target as HTMLElement
    containerElement.releasePointerCapture(event.pointerId)
  }
}
