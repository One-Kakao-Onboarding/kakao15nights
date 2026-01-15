import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Features from './pages/Features'
import Personas from './pages/Personas'
import HowItWorks from './pages/HowItWorks'
import Analyze from './pages/Analyze'
import Loading from './pages/Loading'
import Results from './pages/Results'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/personas" element={<Personas />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/how-to-use" element={<HowItWorks />} />
      <Route path="/analyze" element={<Analyze />} />
      <Route path="/analyze/loading" element={<Loading />} />
      <Route path="/analyze/results" element={<Results />} />
    </Routes>
    </>
  )
}

export default App
