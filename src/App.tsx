import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Analyze from './pages/Analyze'
import Loading from './pages/Loading'
import Results from './pages/Results'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/analyze" element={<Analyze />} />
      <Route path="/analyze/loading" element={<Loading />} />
      <Route path="/analyze/results" element={<Results />} />
    </Routes>
  )
}

export default App
