const container = document.querySelector('.jobs-listings');
const filterTechnology = document.getElementById('filter-technology');
const filterLocation = document.getElementById('filter-location');
const filterExperienceLevel = document.getElementById('filter-experience-level');

// Función para poblar opciones dinámicamente
function populateOptions() {
    fetch("./data.json")
        .then((response) => response.json())
        .then((jobs) => {
            // Extraer valores únicos
            const techSet = new Set();
            const locationSet = new Set();
            const levelSet = new Set();
            
            jobs.forEach(job => {
                // Tecnología: manejar array o string
                if (Array.isArray(job.data.technology)) {
                    job.data.technology.forEach(tech => techSet.add(tech));
                } else if (job.data.technology) {
                    techSet.add(job.data.technology);
                }
                // Ubicación
                if (job.data.modalidad) locationSet.add(job.data.modalidad);
                // Nivel
                if (job.data.nivel) levelSet.add(job.data.nivel);
            });
            
            // Poblar Tecnología
            filterTechnology.innerHTML = '<option value="">Tecnología</option>';
            Array.from(techSet).sort().forEach(tech => {
                const option = document.createElement('option');
                option.value = tech;
                option.textContent = tech.charAt(0).toUpperCase() + tech.slice(1); // Capitalizar
                filterTechnology.appendChild(option);
            });
            
            // Poblar Ubicación
            filterLocation.innerHTML = '<option value="">Ubicación</option>';
            Array.from(locationSet).sort().forEach(loc => {
                const option = document.createElement('option');
                option.value = loc;
                option.textContent = loc.charAt(0).toUpperCase() + loc.slice(1);
                filterLocation.appendChild(option);
            });
            
            // Poblar Nivel de Experiencia
            filterExperienceLevel.innerHTML = '<option value="">Nivel de experiencia</option>';
            Array.from(levelSet).sort().forEach(level => {
                const option = document.createElement('option');
                option.value = level;
                option.textContent = level.charAt(0).toUpperCase() + level.slice(1);
                filterExperienceLevel.appendChild(option);
            });
            
            // Crear y agregar jobs
            jobs.forEach(job => {
                const article = document.createElement('article');
                article.className = 'job-listing-card';
                
                // Setear datasets (technology como string separado por comas si es array)
                article.dataset.titulo = job.titulo;
                article.dataset.technology = Array.isArray(job.data.technology) ? job.data.technology.join(',') : job.data.technology || '';
                article.dataset.modalidad = job.data.modalidad || '';
                article.dataset.nivel = job.data.nivel || '';
                
                article.innerHTML = `<div>
                    <h3>${job.titulo}</h3>
                    <small>${job.empresa} | ${job.ubicacion}</small>
                    <p>${job.descripcion}</p>
                </div>
                <button class="button-apply-job">Aplicar</button>`;
                
                container.appendChild(article);
            });
        });
}

// Llamar a la función para poblar y cargar jobs
populateOptions();