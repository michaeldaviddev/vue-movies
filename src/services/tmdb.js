import axios from 'axios'

// URL base de la API de TMDb
const API_KEY = import.meta.env.VITE_TMDB_API_KEY // Reemplaza con tu clave API
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL

// Configuración del cliente de API
const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US'
  }
})

// Manejo de errores centralizado
const handleError = (error, context) => {
  console.error(`Error ${context}:`, error)
  throw error
}

// Obtener lista de géneros para películas
export const getMovieGenres = async () => {
  try {
    const response = await apiClient.get('/genre/movie/list')
    return response.data.genres // Devuelve la lista de géneros
  } catch (error) {
    handleError(error, 'fetching movie genres')
  }
}

// Obtener películas por género
export const getMoviesByGenre = async (genreId) => {
  try {
    const response = await apiClient.get('/discover/movie', {
      params: { with_genres: genreId }
    })
    return response.data.results // Devuelve la lista de películas del género especificado
  } catch (error) {
    handleError(error, `fetching movies for genre ID ${genreId}`)
  }
}

// Obtener una lista de películas populares
export const getPopularMovies = async () => {
  try {
    const response = await apiClient.get('/movie/popular')
    return response.data.results // Devuelve la lista de películas populares
  } catch (error) {
    handleError(error, 'fetching popular movies')
  }
}

// Obtener detalles de una película específica
export const getMovieDetails = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}`)
    return response.data // Devuelve los detalles de la película
  } catch (error) {
    handleError(error, `fetching details for movie ID ${movieId}`)
  }
}
