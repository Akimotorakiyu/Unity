import { defineFunctionComponent } from './func/defineFunctionComponent'
import { Editor } from './editor'
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
