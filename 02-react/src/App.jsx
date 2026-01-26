import jobs from './data.json'
import JobCard from './components/JobCard.jsx'

function Header() {
  return (
    <header>
      <h1>
        	<a href="index.html" className="logo-link" aria-label="Ir al inicio">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
								viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<polyline points="16 18 22 12 16 6"></polyline>
								<polyline points="8 6 2 12 8 18"></polyline>
							</svg>
							DevJobs
					</a>
		</h1>

		<nav>
			<a href="index.html">Inicio</a>
			<a href="empleos.html">Empleos</a>
		</nav>

    </header>
  )
}

function Footer() {
  return (
    <footer>
        <div>	
          <a href="https://linkedin.com/in/alejo-mistraletti-244358361" target="_blank">Mi linkedin</a>
          <a href="https://github.com/AlejoUriel" target="_blank">Mi github</a>
        </div>
        <small>&copy; 2025 Alejo DevJobs. Todos los derechos reservados.</small>
    </footer>
  )
}

function App() {
  return (
  <>
    <Header />

    <main>
      <section className="jobs-search">
        <h1>Encuentra tu próximo trabajo</h1>
        <p>Explora miles de oportunidades en el sector tecnológico</p>
          
        <form id="empleos-search-form" role="search">
          <div className="search-bar">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-search">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
            </svg>
            <input required type="text" name="search" id="search-text" placeholder="Busca trabajos, empresas o habilidades"/>
            <button type="submit">Buscar</button>
          </div>
              
          <div className="search-filters">
            <select name="technology" id="filter-technology">
            </select>

            <select name="location" id="filter-location">
            </select>

            <select name="experience-level" id="filter-experience-level">
            </select>
          </div>
        </form>
        <span id="filter-selected-value"></span>
      </section>

      <section>
        <div>
          <h2>Resultados de búsqueda</h2>
        </div>
            
        <div className="jobs-listings">
					{jobs.map((job) => (
            <JobCard
              key={job.id}
              titulo={job.titulo}
              empresa={job.empresa}
              ubicacion={job.ubicacion}
              descripcion={job.descripcion}
              data={job.data}
              />
          ))}
        </div>

        <div>
          <p id="no-results-message">
            No se encontraron empleos que coincidan con los filtros aplicados.
          </p>
        </div>

        <nav className="pagination">
          <a href="#">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 6l-6 6l6 6" />
            </svg>
          </a>
          <a href="" className="is-active">1</a>
          <a href="">2</a>
          <a href="">3</a>
          <a href="">4</a>
          <a href="">5</a>
          <a href="">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 6l6 6l-6 6" />
            </svg>
          </a>
        </nav>
      </section>
    </main>

    <Footer />
    </>
  )
}

export default App
