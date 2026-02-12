import { createContext, use, useState } from 'react'

export const FavContext = createContext()

export function FavProvider ({ children }) {
  const [favorites, setFavorites] = useState([])

  const addFavorite = (job) => {
    setFavorites((prevFavorites) => [...prevFavorites, job])
  } 

  const removeFavorite = (jobId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((job) => job.id !== jobId)
    )
  }

  const isFavorite = (jobId) => {
    return favorites.some((job) => job.id === jobId)
  }

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  }

  return (
    <FavContext.Provider value={value}>
      {children}
    </FavContext.Provider>
  )
}

export function useFavorites() {
  const context = use(FavContext)

  if (!context) {
    throw new Error('useFavorites must be used within a FavProvider')
  }
  
  return context
}