import { Analytics } from "@vercel/analytics/next"

import Header from './components/Header'
import Home from './pages/home-page/Home'
import About from './pages/about-page/About'

function App() {
  return <>
    <Header />
    <Home />
    <About />
  </>
}

export default App
