import { genNanoDomId } from '@essay/nanoid'
interface IViewCaret {
  mergedId: string
  offset: number
}

export class MergedIdController {
  mergedIdtoIdList = new Map<string, string[]>()
  idToMergedId = new Map<string, string>()

  convertIdToMergedIdAndOffset(id: string): IViewCaret {
    const mergedId = this.idToMergedId.get(id)
    if (mergedId) {
      const mergedIdList = this.mergedIdtoIdList.get(mergedId)
      if (mergedIdList) {
        const offset = mergedIdList.findIndex((_id) => _id === id)

        if (offset >= 0) {
          return {
            mergedId,
            offset,
          }
        } else {
          throw new Error(
            `未在 mergedIdList ${mergedIdList} 找到 id ${id}，映射关系错误`,
          )
        }
      } else {
        throw new Error(`未找到 mergedId ${mergedId} 对应的 mergedIdList`)
      }
    } else {
      throw new Error(`未找到 id ${id} 对应的 mergedId`)
    }
  }

  converIViewCaretToId(viewCaret: IViewCaret) {
    const mergedIdList = this.mergedIdtoIdList.get(viewCaret.mergedId)
    if (mergedIdList) {
      const id = mergedIdList[viewCaret.offset]

      if (id) {
      } else {
        throw new Error(`未找到 offset ${viewCaret.offset} 对应的 id`)
      }
    } else {
      throw new Error(
        `未找到 mergedId ${viewCaret.mergedId} 对应的 mergedIdList`,
      )
    }
  }

  registeMergedDomNode(idList: string[]) {
    idList.forEach((id) => {
      if (this.idToMergedId.has(id)) {
        throw new Error(
          `id ${id} 已被 merge 至 mergedId${this.idToMergedId.get(id)}`,
        )
      }
    })

    const mergedId = genNanoDomId()
    this.mergedIdtoIdList.set(mergedId, [...idList])
    idList.forEach((id) => {
      this.idToMergedId.set(id, mergedId)
    })
  }

  unRegisteMergedDomNode(mergedId: string) {
    const mergedIdList = this.mergedIdtoIdList.get(mergedId)
    if (mergedIdList) {
      mergedIdList.forEach((id) => {
        if (this.idToMergedId.has(id)) {
          this.idToMergedId.delete(id)
        } else {
          throw new Error(`未在 idToMergedId 找到 id ${id}`)
        }
      })
    } else {
      throw new Error(`未找到 mergedId ${mergedId} 对应的 mergedIdList`)
    }
  }
}
