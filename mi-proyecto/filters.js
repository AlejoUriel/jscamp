const container = document.querySelector('.jobs-listings')
const filterTechnology = document.getElementById('filter-technology');
const filterLocation = document.getElementById('filter-location');
const filterExperienceLevel = document.getElementById('filter-experience-level');

// Función para filtrar jobs basados en los selectores
function filterJobs() {
    const selectedTech = filterTechnology.value;
    const selectedLocation = filterLocation.value;
    const selectedLevel = filterExperienceLevel.value;
    
    const jobCards = document.querySelectorAll('.job-listing-card');
    jobCards.forEach(job => {
        const jobTech = job.dataset.technology ? job.dataset.technology.split(',') : []; // Asumimos que se guarda como string separado por comas
        const jobLocation = job.dataset.modalidad;
        const jobLevel = job.dataset.nivel;
        
        const techMatch = !selectedTech || jobTech.includes(selectedTech);
        const locationMatch = !selectedLocation || jobLocation === selectedLocation;
        const levelMatch = !selectedLevel || jobLevel === selectedLevel;
        
        const isShow = techMatch && locationMatch && levelMatch;
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

// Event listeners para filtros
filterTechnology.addEventListener('change', filterJobs);
filterLocation.addEventListener('change', filterJobs);
filterExperienceLevel.addEventListener('change', filterJobs);

// Eventos para el input de búsqueda
const searchInput = document.querySelector('#search-text');

searchInput.addEventListener('input', function() {
    console.log(searchInput.value + '(input event)');
});

searchInput.addEventListener('blur', function() {
    console.log(searchInput.value + '(blur event)');
});

const empleoSearchForm = document.querySelector('#empleos-search-form');

empleoSearchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Submitted form (search event)');
});

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
