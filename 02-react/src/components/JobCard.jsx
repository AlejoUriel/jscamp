import { useState } from 'react';

//Crear el componente JobCard.jsx
function JobCard({ data, titulo, empresa, ubicacion, descripcion }) {
        const [isApplied, setIsApplied] = useState(false);
		
		function handleClick() {
			setIsApplied(!isApplied);
		}
	
		const text = isApplied ? 'Aplicado!' : 'Aplicar';
		const buttonClass = isApplied ? 'is-applied' : '';
		
		return (
			<article 
				className="job-listing-card"
				data-modalidad={data?.modalidad}
				data-nivel={data?.nivel}
				data-tecnologia={data?.tecnologia}
			>
				<div>
					<h3>{titulo}</h3>
					<small>{empresa} | {ubicacion}</small>
					<p>{descripcion}</p>
				</div>
				<button
					disabled={isApplied}
                    className={buttonClass}
                    onClick={handleClick}
                    >
                    {text}
                </button>
			</article>
        );
    }

export default JobCard;