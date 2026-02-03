import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { HomePage } from './pages/Home.jsx'
import { SearchPage } from './pages/Search.jsx'
import { NotFountPage } from './pages/404.jsx'

function App() {
  
  const currentPath = window.location.pathname

  let page = <NotFountPage/>
  if (currentPath === '/Home') {
    page = <HomePage />
  } else if (currentPath === '/Search') {
    page = <SearchPage />
  }

  return (
  <>
    <Header />
    {page}
    <Footer />
    </>
  )
}

export default App
