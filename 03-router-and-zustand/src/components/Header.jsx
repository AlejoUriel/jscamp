import { Link } from './Link.jsx'
import { useAuthStore } from '../store/authStore.js'
import { useFavoritesStore } from '../store/favoritesStore.js'
import { NavLink } from 'react-router'

export default function Header() {
  const { isLoggedIn, logout } = useAuthStore()
  const { countFavorites } = useFavoritesStore()
  
  const numberOfFavorites = countFavorites()

  return (
    <header>
      <h1>
        <Link href="Home" className="logo-link" aria-label="Ir al inicio">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          DevJobs
			</Link>
		</h1>

		<nav>
			<NavLink 
			className={({isActive}) => isActive ? 'nav-link-active' : ''}
			to="Search">Empleos</NavLink>
      {
        isLoggedIn && (
          <NavLink
            className={({isActive}) => isActive ? 'nav-link-active' : ''}
            to="/profile"
            >
              Favoritos ({numberOfFavorites})
            </NavLink>
        )
      }
		</nav>

    <HeaderUserButton />
    </header>
  )
}

const HeaderUserButton = () => {
  const { isLoggedIn, login, logout } = useAuthStore()
  const { clearFavorites } = useFavoritesStore()

  const handleLogout = () => {
    logout()
    clearFavorites()
  }

  return (
    isLoggedIn
      ? <button onClick={handleLogout}>Cerrar sesión</button>
      : <button onClick={login}>Iniciar sesión</button>
  )
}