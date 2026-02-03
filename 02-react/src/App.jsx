import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

import { HomePage } from './pages/Home.jsx'
import { SearchPage } from './pages/Search.jsx'
import { NotFountPage } from './pages/404.jsx'
import { Route } from './components/Route.jsx'

function App() {
  return (
  <>
    <Header />
    <Route path="/" component={HomePage} />
    <Route path="/Home" component={HomePage} />
    <Route path="/Search" component={SearchPage} />
    <Footer />
    </>
  )
}

export default App
