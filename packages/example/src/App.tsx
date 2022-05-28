import { Editor } from './editor/editor'
import { defineFunctionComponent } from './func/defineFunctionComponent'
export const App = defineFunctionComponent(() => {
  return {
    render() {
      return (
        <div>
          <Editor></Editor>
        </div>
      )
    },
  }
})
