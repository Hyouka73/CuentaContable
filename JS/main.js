import { actualizarCatalogoCuentas, actualizarSeleccionCuentas } from './catalogoCuentas.js';
import { actualizarBalanza } from './balanza.js';
import { actualizarCuentasT } from './cuentasT.js';
import { configurarEventListeners } from './eventListeners.js';
import { actualizarTotalesRegistro } from './registroOperaciones.js';
import { mostrarOperaciones } from './operaciones.js';
import { generarBalanceGeneral } from './balance.js';

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar pestañas
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);
            if (!tabContent) return; // Ensure the tab content exists

            // Cambiar pestaña activa
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            tabContent.classList.add('active');
            
            // Actualizar contenido si es necesario
            if (tabId === 'mayor') {
                actualizarCuentasT();
            } else if (tabId === 'balanza') {   
                actualizarBalanza();
            } else if (tabId === 'catalogo') {
                actualizarCatalogoCuentas();
            } else if (tabId === 'balance') {
                generarBalanceGeneral();
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

    // Mostrar operaciones iniciales
    mostrarOperaciones();
});