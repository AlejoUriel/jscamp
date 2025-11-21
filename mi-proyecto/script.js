//recupera todos los botones y devuelve una NodeList (array-like) o una lista vacia [] si no encuentra ninguno
//const botones = document.querySelectorAll('.button-apply-job');

//botones.forEach(boton => {
//    boton.addEventListener('click', () => {
//        boton.textContent = '¡Aplicado!';
//        boton.classList.add('is-applied');
//        boton.disable = true;
//    })
//})

const jobsListingSection = document.querySelector('.jobs-listings')

//El ? verifica que exista el elemento antes de agregar el event listener
jobsListingSection?.addEventListener('click', function(event){
    const element = event.target;
    if(element.classList.contains('button-apply-job')){
        element.textContent = '¡Aplicado!';
        element.classList.add('is-applied');
        element.disable = true;
    }
})
