import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router"
import { useAuthStore } from '../store/authStore.js'
import { Link } from '../components/Link.jsx'
import { Spinner } from '../components/Spinner.jsx'
import styles from './Detail.module.css'
import snarkdown from 'snarkdown'
import { useFavoritesStore } from '../store/favoritesStore.js'

export function JobSection ({ title, content= ''}) {
  const html = snarkdown(typeof content === 'string' ? content : '')
  
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        {title}
      </h2>

      <div
        className={`${styles.sectionContent} prose`}
        dangerouslySetInnerHTML={{
          __html: html
        }}
      />
    </section>
  )
}

function DetailPageBreadCrumb ({ job }) {
  return (
    <div className={styles.container}>
        <nav className={styles.breadcrumbs}>
          <Link
            href="/search"
            className={styles.breadcrumbButton}
          >
            Empleos
          </Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{job.titulo}</span>
        </nav>
      </div>
  )
}

function DetailPageHeader ({ job, isLoggedIn }) {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {job.titulo}
        </h1>
        <p className={styles.meta}>
          {job.empresa} - {job.ubicacion}
        </p>
      </header>

      <DetailApplyButton />
      <DetailFavoriteButton jobId={job.id}/>
    </>
  )
}

function DetailApplyButton () {
  const { isLoggedIn } = useAuthStore()
  return (
    <button disabled={!isLoggedIn} className={styles.applyButton}>
        {isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar"}
      </button>
  )
}

function DetailFavoriteButton ({ jobId }) {
  const { isFavorite, toggleFavorite } = useFavoritesStore()
  return (
    <button onClick={() => toggleFavorite(jobId)}>
      {isFavorite(jobId) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    </button>
  )
}

export default function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`https://jscamp-api.vercel.app/api/jobs/${id}`)
      .then(response => {
        if (!response.ok) {
          navigate('/not-found')
        }

        return response.json()
      })
      .then(json => {
        setJob(json)
      })
      .catch(err => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return(
      <div>
        <Spinner text={"Cargando detalles del empleo..."} />
      </div>
    )
  }

  if (error || !job) {
    return(
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
        <div className={styles.error}> 
          <h2 className={styles.errorTitle}> 
            Oferta no encontrada.
          </h2>
          <button 
          onClick={() => navigate('/')}
          className={styles.errorButton}
          >
            Volver al inicio
          </button>
          
        </div>   
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
      <DetailPageBreadCrumb job={job} />
      <DetailPageHeader job={job} />  
      
      <JobSection title="Descripcion del puesto" content={job.content.description}/>
      <JobSection title="Responsabilidades" content={job.content.responsabilities}/>
      <JobSection title="Requisitos" content={job.content.requirements}/>
      <JobSection title="Acerca de la empresa" content={job.content.about}/>
    </div>
  )
}