import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { Spinner } from '../components/Spinner.jsx'
import { ProtectedRoute } from '../components/ProtectedRoute.jsx'

const HomePage = lazy(() => import('./Home.jsx'))
const SearchPage = lazy(() => import('./Search.jsx'))
const JobDetail = lazy(() => import('./Detail.jsx'))
const ProfilePage = lazy(() => import('./ProfilePage.jsx'))
const LoginPage = lazy(() => import('./Login.jsx')) 
const RegisterPage = lazy(() => import('./Register.jsx'))
const NotFountPage = lazy(() => import('./404.jsx'))

function App() {
  return (
  <>
    <Header/>
    <Suspense fallback={
      <div>
        <Spinner text={"Cargando página..."} />
      </div>
    }>
    <Routes>
      <Route path="/Home"   element={<HomePage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/Search" element={<SearchPage />} />
      <Route path="/jobs/:id" element={<JobDetail />} />
      
      <Route path="/profile" element={
        <ProtectedRoute redirectTo="/login">
          <ProfilePage />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<NotFountPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
    </Suspense>
    <Footer />
    </>
  )
}

export default App
