import JobCard from './JobCard.jsx';

export default function JobListings({ jobs }) {
  return (
    <>
      <div>
        <h2>Resultados de búsqueda</h2>
      </div>
              
      <div className="jobs-listings">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </>
  )
}