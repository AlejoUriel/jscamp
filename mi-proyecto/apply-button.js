const container = document.querySelector('.jobs-listings');

// Botón de aplicar empleo - Event Delegation
container?.addEventListener('click', function(event) { // El ? verifica que exista el elemento antes de agregar el event listener
    const element = event.target;
    if (element.classList.contains('button-apply-job')) {
        element.textContent = '¡Aplicado!';
        element.classList.add('is-applied');
        element.disabled = true;
    }
});