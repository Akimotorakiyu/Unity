import { defineFunctionComponent } from './func/defineFunctionComponent'
import { getGreeting } from '@essay/essay'

export const App = defineFunctionComponent(() => {
  return {
    render() {
      return <div>{getGreeting()}</div>
    },
  }
})
