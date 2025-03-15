import { actualizarSeleccionCuentas } from './catalogoCuentas.js';
import { formatearNumero, mostrarError, mostrarExito } from './utils.js';
import { catalogoCuentas } from './catalogoCuentas.js';
import { agregarFilaOperacion, configurarBotonesEliminar, configurarInputsDebeHaber, guardarOperacion, limpiarFormulario } from './registroOperaciones.js';
import { actualizarCuentasT } from './cuentasT.js';
import { actualizarBalanza } from './balanza.js';
import { operacionesIniciales } from './datos.js';

export let operaciones = [...operacionesIniciales];

export let contadorIndice = operaciones.length; // Initialize contadorIndice based on initial operations

export function incrementarIndice() {
    contadorIndice++;
    return contadorIndice;
  }

export function mostrarOperaciones() {
    const operacionesContainer = document.getElementById('operaciones-container');
    operacionesContainer.innerHTML = '';
    
    // Comprobar si hay operaciones
    if (operaciones.length === 0) {
        operacionesContainer.innerHTML = '<p class="text-center">No hay operaciones registradas.</p>';
        return;
    }
    
    // Generar tabla para cada operación
    operaciones.forEach(op => {
        // Crear contenedor para la operación
        const operacionDiv = document.createElement('div');
        operacionDiv.className = 'operacion-item mb-4';
        
        // Crear cabecera con información general de la operación
        const headerDiv = document.createElement('div');
        headerDiv.className = 'operacion-header';
        headerDiv.innerHTML = `
            <strong>Operación ${op.indice}</strong> - ${op.fecha} - ${op.descripcion}
        `;
        
        // Crear tabla para los detalles de la operación
        const tabla = document.createElement('table');
        tabla.className = 'table table-bordered table-sm';
        
        // Crear encabezados de la tabla
        tabla.innerHTML = `
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Cuenta</th>
                    <th class="text-right">Debe</th>
                    <th class="text-right">Haber</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        
        const tbody = tabla.querySelector('tbody');
        
        // Añadir filas para cada detalle de la operación
        op.detalle.forEach(item => {
            // Buscar el nombre de la cuenta en el catálogo
            const infoCuenta = catalogoCuentas.find(c => c.codigo === item.cuenta);
            const nombreCuenta = infoCuenta ? infoCuenta.nombre : item.cuenta;
            
            const fila = document.createElement('tr');
            if (item.debe > 0) {
                fila.className = 'fila-debe';
            } else {
                fila.className = 'fila-haber';
            }
            
            fila.innerHTML = `
                <td>${op.fecha}</td>
                <td>${nombreCuenta}</td>
                <td class="text-right">${item.debe > 0 ? formatearNumero(item.debe) : ''}</td>
                <td class="text-right">${item.haber > 0 ? formatearNumero(item.haber) : ''}</td>
            `;
            
            tbody.appendChild(fila);
        });
        
        // Añadir fila con la descripción de la operación
        const filaDescripcion = document.createElement('tr');
        filaDescripcion.className = 'fila-descripcion';
        filaDescripcion.innerHTML = `
            <td colspan="4">${op.descripcion}</td>
        `;
        tbody.appendChild(filaDescripcion);
        
        // Ensamblar todo
        operacionDiv.appendChild(headerDiv);
        operacionDiv.appendChild(tabla);
        operacionesContainer.appendChild(operacionDiv);
    });
}