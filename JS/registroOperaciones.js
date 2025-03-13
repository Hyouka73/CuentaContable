import { actualizarSeleccionCuentas } from './catalogoCuentas.js';
import { formatearNumero, mostrarError, mostrarExito } from './utils.js';
import { operaciones, incrementarIndice, mostrarOperaciones } from './operaciones.js';

export function agregarFilaOperacion() {
    const registroBody = document.getElementById('registro-body');
    
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>
            <select class="cuenta-select">
                <!-- Se llenará con JavaScript -->
            </select>
        </td>
        <td>
            <input type="number" class="debe-input" step="0.01" min="0" placeholder="0.00">
        </td>
        <td>
            <input type="number" class="haber-input" step="0.01" min="0" placeholder="0.00">
        </td>
        <td>
            <button type="button" class="btn-remove">Eliminar</button>
        </td>
    `;
    
    registroBody.appendChild(fila);
    
    // Actualizar opciones del select
    actualizarSeleccionCuentas();
    
    // Configurar eventos
    configurarBotonesEliminar();
    configurarInputsDebeHaber();
}

export function configurarBotonesEliminar() {
    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.onclick = function() {
            // No eliminar si solo hay una fila
            if (document.querySelectorAll('#registro-body tr').length > 1) {
                this.closest('tr').remove();
                actualizarTotalesRegistro();
            } else {
                mostrarError('Debe haber al menos una cuenta en la operación.');
            }
        };
    });
}

export function configurarInputsDebeHaber() {
    // Event listener para inputs de debe
    document.querySelectorAll('.debe-input').forEach(input => {
        input.addEventListener('input', function() {
            // Si se ingresa un valor en debe, limpiar haber
            if (this.value && parseFloat(this.value) > 0) {
                const haberInput = this.closest('tr').querySelector('.haber-input');
                haberInput.value = '';
            }
            actualizarTotalesRegistro();
        });
    });
    
    // Event listener para inputs de haber
    document.querySelectorAll('.haber-input').forEach(input => {
        input.addEventListener('input', function() {
            // Si se ingresa un valor en haber, limpiar debe
            if (this.value && parseFloat(this.value) > 0) {
                const debeInput = this.closest('tr').querySelector('.debe-input');
                debeInput.value = '';
            }
            actualizarTotalesRegistro();
        });
    });
}

export function actualizarTotalesRegistro() {
    let totalDebe = 0;
    let totalHaber = 0;
    
    // Sumar todos los valores de debe
    document.querySelectorAll('.debe-input').forEach(input => {
        const valor = parseFloat(input.value) || 0;
        totalDebe += valor;
    });
    
    // Sumar todos los valores de haber
    document.querySelectorAll('.haber-input').forEach(input => {
        const valor = parseFloat(input.value) || 0;
        totalHaber += valor;
    });
    
    // Actualizar totales en la tabla
    document.getElementById('total-debe-registro').textContent = formatearNumero(totalDebe);
    document.getElementById('total-haber-registro').textContent = formatearNumero(totalHaber);
    
    // Cambiar color si no cuadra la partida
    const totalesRow = document.querySelector('.totales-row');
    if (Math.abs(totalDebe - totalHaber) > 0.01) {
        totalesRow.style.backgroundColor = '#ffdddd';
    } else {
        totalesRow.style.backgroundColor = '#e9ecef';
    }
}

export function guardarOperacion() {
    const filas = document.querySelectorAll('#registro-body tr');
    if (filas.length === 0) {
        mostrarError('No hay movimientos para guardar.');
        return;
    }
    
    const fecha = document.getElementById('fecha').value;
    const descripcion = document.getElementById('descripcion').value.trim();
    
    if (!fecha) {
        mostrarError('Debe seleccionar una fecha.');
        return;
    }
    
    // Recopilar datos de la operación
    const operacionDetalle = [];
    let totalDebe = 0;
    let totalHaber = 0;
    
    let hayErrores = false;
    
    filas.forEach(fila => {
        const cuentaSelect = fila.querySelector('.cuenta-select');
        const debeInput = fila.querySelector('.debe-input');
        const haberInput = fila.querySelector('.haber-input');
        
        const cuenta = cuentaSelect.value;
        const debe = parseFloat(debeInput.value) || 0;
        const haber = parseFloat(haberInput.value) || 0;
        
        // Validaciones
        if (!cuenta) {
            mostrarError('Todas las cuentas deben estar seleccionadas.');
            hayErrores = true;
            return;
        }
        
        if (debe === 0 && haber === 0) {
            mostrarError('Todas las filas deben tener un valor en Debe o Haber.');
            hayErrores = true;
            return;
        }
        
        if (debe > 0 && haber > 0) {
            mostrarError('Una cuenta no puede tener valores en Debe y Haber simultáneamente.');
            hayErrores = true;
            return;
        }
        
        operacionDetalle.push({ cuenta, debe, haber });
        totalDebe += debe;
        totalHaber += haber;
    });
    
    if (hayErrores) return;
    
    // Asignar un índice único a la operación
    const nuevaOperacion = { indice: incrementarIndice(), fecha, descripcion, detalle: operacionDetalle };
    operaciones.push(nuevaOperacion);
    console.log(operaciones);
    mostrarExito('Operación guardada exitosamente.');
    limpiarFormulario();
    actualizarTotalesRegistro();
    mostrarOperaciones();
}

export function limpiarFormulario() {
    document.getElementById('fecha').valueAsDate = new Date();
    document.getElementById('descripcion').value = '';
    const registroBody = document.getElementById('registro-body');
    registroBody.innerHTML = `
        <tr>
            <td>
                <select class="cuenta-select">
                    <!-- Se llenará con JavaScript -->
                </select>
            </td>
            <td>
                <input type="number" class="debe-input" step="0.01" min="0" placeholder="0.00">
            </td>
            <td>
                <input type="number" class="haber-input" step="0.01" min="0" placeholder="0.00">
            </td>
            <td>
                <button type="button" class="btn-remove">Eliminar</button>
            </td>
        </tr>
    `;
    actualizarSeleccionCuentas();
    actualizarTotalesRegistro();
}
