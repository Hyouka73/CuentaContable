import { agregarFilaOperacion, guardarOperacion, configurarBotonesEliminar, configurarInputsDebeHaber } from './operaciones.js';
import { actualizarCatalogoCuentas, actualizarSeleccionCuentas, agregarCuenta, inicializarBusquedaCatalogo } from './catalogoCuentas.js';

export function configurarEventListeners() {
    document.getElementById('agregar-fila').addEventListener('click', agregarFilaOperacion);
    document.getElementById('guardar-operacion').addEventListener('click', guardarOperacion);
    document.getElementById('agregar-cuenta').addEventListener('click', agregarCuenta);
    configurarBotonesEliminar();
    configurarInputsDebeHaber();
    inicializarBusquedaCatalogo();
}
