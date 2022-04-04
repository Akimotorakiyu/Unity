import { OrderedMap } from '@essay/ordered-map'
import { computeAttrs } from './nodeType'
import { MarkSpec } from './spec'
import { Schema } from './schema'
import { Mark } from './mark'

export class MarkType {
  constructor(
    public name: string,
    public rank: number,
    public schema: Schema,
    public spec: MarkSpec,
  ) {}

  static compile(markSpeces: OrderedMap<MarkSpec>, schema: Schema) {
    const { mapping } = markSpeces.content.reduce(
      (acc, [key, value]) => {
        acc.mapping[key] = new MarkType(key, acc.rank++, schema, value)
        return acc
      },
      {
        rank: 0,
        mapping: {} as Record<string, MarkType>,
      },
    )

    return mapping
  }

  create(attrs: Record<string, any>) {
    return new Mark(this, computeAttrs(this.spec.defaultAttrs, attrs))
  }
}
