const container = document.querySelector('.jobs-listings');
const searchInput = document.querySelector('#search-text');
const filterTechnology = document.getElementById('filter-technology');
const filterLocation = document.getElementById('filter-location');
const filterExperienceLevel = document.getElementById('filter-experience-level');

// Función para filtrar jobs basados en los selectores
function filterJobs() {
    const searchedName = searchInput.value.toLowerCase();
    const selectedTech = filterTechnology.value;
    const selectedLocation = filterLocation.value;
    const selectedLevel = filterExperienceLevel.value;
    
    const jobCards = document.querySelectorAll('.job-listing-card');
    jobCards.forEach(job => {
        const jobName = job.dataset.titulo.toLowerCase();
        const jobTech = job.dataset.technology ? job.dataset.technology.split(',') : []; // Asumimos que se guarda como string separado por comas
        const jobLocation = job.dataset.modalidad;
        const jobLevel = job.dataset.nivel;
        
        const nameMatch = jobName.includes(searchedName);
        const techMatch = !selectedTech || jobTech.includes(selectedTech);
        const locationMatch = !selectedLocation || jobLocation === selectedLocation;
        const levelMatch = !selectedLevel || jobLevel === selectedLevel;
        
        const isShow = nameMatch && techMatch && locationMatch && levelMatch;
        job.classList.toggle('is-hidden', !isShow);
    });

    // Verificar si hay jobs visibles para mostrar/ocultar mensaje de no resultados
    const visibleJobs = Array.from(jobCards).filter(job => !job.classList.contains('is-hidden'));
    const noResultsMessage = document.getElementById('no-results-message');
    if (visibleJobs.length === 0) {
        noResultsMessage.style.display = 'block';
    } else {
        noResultsMessage.style.display = 'none';
    }
}

/*
 Eventos para el input de búsqueda
searchInput.addEventListener('input', filterJobs);  //-se envia con cada cambio en el input

searchInput.addEventListener('blur', function() {
    console.log(searchInput.value + '(blur event)');  //Se envia al desenfocar el input
});
*/

const empleoSearchForm = document.querySelector('#empleos-search-form');
empleoSearchForm.addEventListener('submit', function(event) {   //Se envia con el enter
    event.preventDefault();
    filterJobs();
});

// Event listeners para los filtros
filterTechnology.addEventListener('change', filterJobs);
filterLocation.addEventListener('change', filterJobs);
filterExperienceLevel.addEventListener('change', filterJobs);

//mensaje de prueba para ubicacion seleccionada
const mensaje = document.querySelector('#filter-selected-value');
filterLocation?.addEventListener('change', function(){
    const selectedValue = filterLocation.value;
    if (selectedValue) {
        mensaje.textContent = 'Has seleccionado: ' + selectedValue;
    }
    else{
        mensaje.textContent = '';
    }
})
