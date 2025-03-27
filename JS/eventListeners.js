import { agregarFilaOperacion, guardarOperacion, limpiarFormulario, configurarBotonesEliminar, configurarInputsDebeHaber } from './registroOperaciones.js';
import { actualizarCatalogoCuentas, actualizarSeleccionCuentas, agregarCuenta, inicializarBusquedaCatalogo } from './catalogoCuentas.js';
import { generarEstadoResultados } from './estados.js';

export function configurarEventListeners() {
    const agregarFilaBtn = document.getElementById('agregar-fila');
    const guardarOperacionBtn = document.getElementById('guardar-operacion');
    const agregarCuentaBtn = document.getElementById('agregar-cuenta');
    const limpiarFormularioBtn = document.getElementById('limpiar-formulario');

    if (agregarFilaBtn) {
        agregarFilaBtn.addEventListener('click', agregarFilaOperacion);
    }
    if (guardarOperacionBtn) {
        guardarOperacionBtn.addEventListener('click', guardarOperacion);
    }
    if (agregarCuentaBtn) {
        agregarCuentaBtn.addEventListener('click', agregarCuenta);
    }
    if (limpiarFormularioBtn) {
        limpiarFormularioBtn.addEventListener('click', limpiarFormulario);
    }


    configurarBotonesEliminar();
    configurarInputsDebeHaber();
    inicializarBusquedaCatalogo();
}
