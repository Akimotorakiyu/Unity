/**
 * 扩展 模块的 类型定义
 * 先 导入对应的模块，务必使模块名称或者路径一致
 * 然后 再次声明对应的模块
 * 使用 interface 扩展 interface 和 class
 * 使用 namespace 扩展 class 的静态属性
 */
import 'prosemirror-transform'
import { Node, Slice } from 'prosemirror-model'

declare module 'prosemirror-model' {
  interface Fragment {
    content: Node[]
    addToStart(node: Node): Fragment
    addToEnd(node: Node): Fragment
    textBetween(
      from: number,
      to: number,
      blockSeparator?: string,
      leafText?: string,
    ): string
  }
}
