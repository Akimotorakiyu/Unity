function theKeyShouldExist(key: string) {
  if (!key) {
    throw new Error('the key should exist!')
  }
  return true
}

export class OrderedMap<T = any> {
  constructor(public content: [string, T][]) {}
  static from<T = any>(value: OrderedMap | Record<string, T>) {
    if (value instanceof OrderedMap) {
      return value
    } else {
      const content = [...Object.entries(value)]
      content.every(([key]) => theKeyShouldExist(key))
      return new OrderedMap(content)
    }
  }

  findIndex(key: string) {
    return this.content.findIndex(([_key, _value]) => {
      return _key === key
    })
  }

  find(key: string) {
    return this.content.find(([_key, _value]) => {
      return _key === key
    })
  }

  remove(this: OrderedMap<T>, key: string) {
    const index = this.findIndex(key)
    if (index === -1) {
      return this
    } else {
      const content = this.content.slice()
      content.splice(index, 1)
      return new OrderedMap(content)
    }
  }

  unshift(this: OrderedMap<T>, key: string, value: any) {
    theKeyShouldExist(key)
    const tempContent = this.remove(key).content
    const newC = [key, value] as [string, any]
    const newContent = [newC].concat(tempContent)
    return new OrderedMap(newContent)
  }

  push(this: OrderedMap<T>, key: string, value: T) {
    theKeyShouldExist(key)
    const tempContent = this.remove(key).content.slice()
    const newC = [key, value] as [string, any]
    const newContent = tempContent.concat(newC)
    return new OrderedMap(newContent)
  }

  subtract(this: OrderedMap<T>, om: OrderedMap<T>) {
    const keys = om.keys()
    if (keys.length) {
      const tempCOntent = this.content.filter(([key]) => {
        const index = keys.findIndex((_) => _ === key)
        const isInclude = index > -1
        if (isInclude) {
          keys.splice(index, 1)
        }
        return !isInclude
      })

      if (tempCOntent.length === this.content.length) {
        return this
      } else {
        return new OrderedMap(tempCOntent)
      }
    } else {
      return this
    }
  }

  prePend(this: OrderedMap<T>, om: OrderedMap<T>) {
    if (om.size) {
      return new OrderedMap(om.content.concat(this.subtract(om).content))
    } else {
      return this
    }
  }

  append(this: OrderedMap<T>, om: OrderedMap<T>) {
    if (om.size) {
      return new OrderedMap(this.subtract(om).content.concat(om.content))
    } else {
      return this
    }
  }

  keys() {
    return this.content.map(([key]) => key)
  }

  get size() {
    return this.content.length
  }

  update(this: OrderedMap<T>, key: string, value: T, newKey: string = key) {
    theKeyShouldExist(newKey)
    const tempOM = newKey === key ? this : this.remove(newKey)
    const tempContent = tempOM.content.slice()

    const mapping = this.find(key)
    if (mapping) {
      mapping[0] = newKey
      mapping[1] = value
    } else {
      tempContent.push([newKey, value])
    }
    return new OrderedMap(tempContent)
  }
}
