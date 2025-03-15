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

    // Añadir manejador de eventos para las pestañas
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Remover clase active de todas las pestañas y contenidos
            document.querySelectorAll('.tab, .tab-content').forEach(element => {
                element.classList.remove('active');
            });
            
            // Activar pestaña y contenido seleccionado
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Si se selecciona la pestaña de estado de resultados, generarlo
            if (tabId === 'estado') {
                generarEstadoResultados();
            }
        });
    });

    configurarBotonesEliminar();
    configurarInputsDebeHaber();
    inicializarBusquedaCatalogo();
}
