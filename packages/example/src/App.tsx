import { Editor } from './editor/editor'
import { defineFunctionComponent } from './func/defineFunctionComponent'
export const App = defineFunctionComponent(() => {
  return {
    render() {
      return (
        <div>
          hello world
          <Editor></Editor>
        </div>
      )
    },
  }
})
