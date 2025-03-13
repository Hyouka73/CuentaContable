export function formatearNumero(numero) {
    return numero.toFixed(2);
}

export function mostrarError(mensaje) {
    const mensajeError = document.getElementById('mensaje-error');
    mensajeError.textContent = mensaje;
    setTimeout(() => {
        mensajeError.textContent = '';
    }, 3000);
}

export function mostrarExito(mensaje) {
    const mensajeExito = document.getElementById('mensaje-exito');
    mensajeExito.textContent = mensaje;
    setTimeout(() => {
        mensajeExito.textContent = '';
    }, 3000);
}