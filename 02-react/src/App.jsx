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
  const totalPages = Math.ceil(jobsData.length / RESULTS_PER_PAGE)
  const technologies = Array.from(
    new Set(
      jobsData.flatMap((job) => {
        const technology = job.data?.technology

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
  const levels = Array.from(
    new Set(jobsData.map((job) => job.data?.nivel).filter(Boolean))
  )
  
  const pagedResults = jobsData.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
  <>
    <Header />

    <main>
      <SearchFormSection
        technologies={technologies}
        locations={locations}
        levels={levels}
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
