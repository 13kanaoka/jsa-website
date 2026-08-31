import { Analytics } from "@vercel/analytics/react"

import Header from './components/Header'
import Home from './pages/home-page/Home'
import Board from './pages/board-page/Board'
import Faq from './pages/faq-page/Faq'

function App() {
  return <>
    <Header />
    <Home />
    <Board />
    <Faq />
    <Analytics />
  </>
}

export default App
