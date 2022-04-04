import { MarkType } from './markType'

export class Mark {
  constructor(public type: MarkType, public props: Record<string, any>) {}
  static none: Mark[] = []

  static reRankMarks(marks: Mark[]) {
    if (marks.length) {
      return Mark.none
    } else {
      const copy = marks.slice()
      copy.sort((a, b) => a.type.rank - b.type.rank)
      return copy
    }
  }
}
