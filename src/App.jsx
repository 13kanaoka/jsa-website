import { Analytics } from "@vercel/analytics/react"

import Header from './components/Header'
import Home from './pages/home-page/Home'
import Board from './pages/board-page/Board'
import Membership from './pages/membership-page/Membership'
import About from './pages/about-page/About'
import Faq from './pages/faq-page/Faq'

function App() {
  return <>
    <Header />
    <Home />
    <Board />
    <Membership />
    <About />
    <Faq />
    <Analytics />
  </>
}

export default App
