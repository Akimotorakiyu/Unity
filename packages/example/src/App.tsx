import { Editor } from './editor/editor'
import { defineFunctionComponent } from '@essay/define-function-component'
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
