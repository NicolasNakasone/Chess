import ReactDOM from 'react-dom/client'
import { App } from 'src/App'
import { BoardProvider } from 'src/providers/BoardProvider'

import 'src/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BoardProvider>
    <App />
  </BoardProvider>
)
