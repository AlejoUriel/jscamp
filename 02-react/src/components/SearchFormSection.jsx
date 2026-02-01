export default function SearchFormSection({
  technologies,
  locations,
  experience,
  searchText,
  selectedTechnology,
  selectedLocation,
  selectedLevel,
  onSearchTextChange,
  onTechnologyChange,
  onLocationChange,
  onLevelChange,
  onSubmit,
}) {
  return (
    <section className="jobs-search">
        <h1>Encuentra tu próximo trabajo</h1>
        <p>Explora miles de oportunidades en el sector tecnológico</p>
          
        <form id="empleos-search-form" role="search" onSubmit={onSubmit}>
          <div className="search-bar">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-search">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
            </svg>
            <input
              required
              type="text"
              name="search"
              id="search-text"
              placeholder="Busca trabajos, empresas o habilidades"
              value={searchText}
              onChange={onSearchTextChange}
            />
            <button type="submit">Buscar</button>
          </div>
              
          <div className="search-filters">
            <select
              name="technology"
              id="filter-technology"
              value={selectedTechnology}
              onChange={onTechnologyChange}
            >
              <option value="">Tecnología</option>
              {technologies.map((technology) => (
                <option key={technology} value={technology}>
                  {technology}
                </option>
              ))}
            </select>

            <select
              name="location"
              id="filter-location"
              value={selectedLocation}
              onChange={onLocationChange}
            >
              <option value="">Ubicación</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>

            <select
              name="experience-level"
              id="filter-experience-level"
              value={selectedLevel}
              onChange={onLevelChange}
            >
              <option value="">Nivel de Experiencia</option>
              {experience.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </form>
        <span id="filter-selected-value"></span>
      </section>
  )
}
