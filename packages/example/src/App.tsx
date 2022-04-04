import { defineFunctionComponent } from './func/defineFunctionComponent'

export const App = defineFunctionComponent(() => {
  return {
    render() {
      return <div>hello world</div>
    },
  }
})
