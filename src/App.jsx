import { Analytics } from "@vercel/analytics/react"

import Header from './components/Header'
import Home from './pages/home-page/Home'
import Board from './pages/board-page/Board'

function App() {
  return <>
    <Header />
    <Home />
    <Board />
    <Analytics />
  </>
}

export default App
