import { useState } from 'react';

export default function JobCard({ job }) {
        const [isApplied, setIsApplied] = useState(false);
		
		const handleClick = () => {
			setIsApplied(true)
		}

		const buttonClasses = isApplied ? 'button-apply-job is-applied' : 'button-apply-job'
		const buttonText = isApplied ? 'Aplicado!' : 'Aplicar'

		return (
			<article 
				className="job-listing-card"
				data-modalidad={job.data.modalidad}
				data-nivel={job.data.nivel}
				data-tecnologia={job.data.tecnologia}
			>
				<div>
					<h3>{job.titulo}</h3>
					<small>{job.empresa} | {job.ubicacion}</small>
					<p>{job.descripcion}</p>
				</div>
				<button
					disabled={isApplied}
                    className={buttonClasses}
                    onClick={handleClick}
                    >
                    {buttonText}
                </button>
			</article>
        );
    }