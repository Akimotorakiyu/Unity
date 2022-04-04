import { Fragment } from './fragment'

export class Slice {
  constructor(
    public content: Fragment,
    public openStart: number,
    public openEnd: number,
  ) {}

  get size() {
    return this.content.size - this.openStart - this.openEnd
  }
}
