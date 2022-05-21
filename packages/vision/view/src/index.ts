import { MergedIdController } from './MergedIdController'

export class IDDomMNodeConverter {
  idToDomNodeMap = new Map<string, Node>()
  mergedIdCOntroller = new MergedIdController()

  convertIdToDom(id: string) {
    const dom = this.idToDomNodeMap.get(id)

    if (dom) {
      return dom
    } else {
      throw new Error(`未找到 id ${id} 对应的 dom`)
    }
  }

  convertIdTomergedDom(id: string) {
    const viewCaret = this.mergedIdCOntroller.convertIdToMergedIdAndOffset(id)
    const dom = this.convertIdToDom(viewCaret.mergedId)

    return dom
  }
}
