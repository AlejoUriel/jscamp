import { useState } from 'react'
import Header from './components/Header.jsx'
import SearchFormSection from './components/SearchFormSection.jsx'
import JobListings from './components/JobListings.jsx'
import Pagination from './components/Pagination.jsx'
import Footer from './components/Footer.jsx'

import jobsData from './data.json';

const RESULTS_PER_PAGE = 4

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [selectedTechnology, setSelectedTechnology] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  
  const technologies = Array.from(
    new Set(
      jobsData.flatMap((job) => {
        const technology = job.data?.technology ?? job.data?.tecnologia

        if (Array.isArray(technology)) {
          return technology
        }

        if (typeof technology === 'string') {
          return [technology]
        }

        return []
      })
    )
  )

  const locations = Array.from(
    new Set(jobsData.map((job) => job.data?.modalidad).filter(Boolean))
  )

  const experience = Array.from(
    new Set(jobsData.map((job) => job.data?.nivel).filter(Boolean))
  )

  const filteredJobs = jobsData.filter((job) => {
    const normalizedQuery = searchText.trim().toLowerCase()
    const company = job.empresa ?? ''
    const title = job.titulo ?? ''
    const description = job.descripcion ?? ''

    const rawTechnology = job.data?.technology ?? job.data?.tecnologia
    const technologyList = Array.isArray(rawTechnology)
      ? rawTechnology
      : typeof rawTechnology === 'string'
      ? [rawTechnology]
      : []
    const technologyMatches = selectedTechnology
      ? technologyList.some((technology) => technology === selectedTechnology)
      : true

    const searchMatches = normalizedQuery
      ? [company, title, description]
          .some((field) => field.toLowerCase().includes(normalizedQuery)) ||
        technologyList.some((technology) =>
          technology.toLowerCase().includes(normalizedQuery)
        )
      : true

    const locationMatches = selectedLocation
      ? job.data?.modalidad === selectedLocation
      : true

    const levelMatches = selectedLevel
      ? job.data?.nivel === selectedLevel
      : true

    return searchMatches && technologyMatches && locationMatches && levelMatches
  })

  const totalPages = Math.ceil(filteredJobs.length / RESULTS_PER_PAGE)
  
  const pagedResults = filteredJobs.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value)
    setCurrentPage(1)
  }

  const handleTechnologyChange = (event) => {
    setSelectedTechnology(event.target.value)
    setCurrentPage(1)
  }

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value)
    setCurrentPage(1)
  }

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value)
    setCurrentPage(1)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
  }

  return (
  <>
    <Header />

    <main>
      <SearchFormSection
        technologies={technologies}
        locations={locations}
        experience={experience}
        searchText={searchText}
        selectedTechnology={selectedTechnology}
        selectedLocation={selectedLocation}
        selectedLevel={selectedLevel}
        onSearchTextChange={handleSearchTextChange}
        onTechnologyChange={handleTechnologyChange}
        onLocationChange={handleLocationChange}
        onLevelChange={handleLevelChange}
        onSubmit={handleSearchSubmit}
      />

      <section>
        <JobListings jobs= {pagedResults}/>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
      </section>
    </main>

    <Footer />
    </>
  )
}

export default App
