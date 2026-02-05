import { Routes, Route } from 'react-router'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

import { HomePage } from './Home.jsx'
import { SearchPage } from './Search.jsx'
import { JobDetail } from './Detail.jsx'
import { NotFountPage } from './404.jsx'

function App() {
  return (
  <>
    <Header />
    <Routes>
      <Route path="/Home" element={<HomePage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/Search" element={<SearchPage />} />
      <Route path="/jobs/:id" element={<JobDetail />} />
      <Route path="*" element={<NotFountPage />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
