import { actualizarCatalogoCuentas, actualizarSeleccionCuentas } from './catalogoCuentas.js';
import { configurarEventListeners } from './eventListeners.js';
import { actualizarTotalesRegistro, actualizarCuentasT, actualizarBalanza } from './operaciones.js';

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar pestañas
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            // Cambiar pestaña activa
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Actualizar contenido si es necesario
            if (tabId === 'mayor') {
                actualizarCuentasT();
            } else if (tabId === 'balanza') {   
                actualizarBalanza();
            } else if (tabId === 'catalogo') {
                actualizarCatalogoCuentas();
            }
        });
    });

    // Inicializar catálogo de cuentas
    actualizarCatalogoCuentas();
    actualizarSeleccionCuentas();

    // Configurar event listeners
    configurarEventListeners();

    // Establecer fecha actual por defecto
    document.getElementById('fecha').valueAsDate = new Date();

    // Actualizar totales iniciales
    actualizarTotalesRegistro();
});