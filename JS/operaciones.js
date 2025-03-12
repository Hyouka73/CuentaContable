import { actualizarSeleccionCuentas } from './catalogoCuentas.js';
import { formatearNumero, mostrarError, mostrarExito } from './utils.js';
import { catalogoCuentas } from './catalogoCuentas.js';

export let operaciones = [];
export let contadorIndice = 1;

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
    const operacion = { indice: contadorIndice++, fecha, descripcion, detalle: operacionDetalle };
    operaciones.push(operacion);
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

export function actualizarCuentasT() {
    const cuentasTContainer = document.getElementById('cuentas-t-container');
    cuentasTContainer.innerHTML = '';

    // Crear objeto para almacenar los movimientos por cuenta
    const movimientosPorCuenta = {};

    // Recopilar todos los movimientos de las operaciones
    operaciones.forEach(op => {
        op.detalle.forEach(item => {
            const codigoCuenta = item.cuenta;
            
            // Inicializar la cuenta si no existe
            if (!movimientosPorCuenta[codigoCuenta]) {
                // Obtener información de la cuenta del catálogo
                const infoCuenta = catalogoCuentas.find(c => c.codigo === codigoCuenta);
                if (!infoCuenta) return;
                
                movimientosPorCuenta[codigoCuenta] = {
                    nombre: infoCuenta.nombre,
                    debe: [],
                    haber: []
                };
            }
            
            // Agregar movimientos
            if (item.debe > 0) {
                movimientosPorCuenta[codigoCuenta].debe.push({
                    valor: item.debe,
                    indice: op.indice
                });
            }
            
            if (item.haber > 0) {
                movimientosPorCuenta[codigoCuenta].haber.push({
                    valor: item.haber,
                    indice: op.indice
                });
            }
        });
    });

    // Crear las cuentas T solo para las cuentas con movimientos
    Object.entries(movimientosPorCuenta).forEach(([codigo, cuenta]) => {
        // Solo mostrar cuentas que tengan al menos un movimiento
        if (cuenta.debe.length === 0 && cuenta.haber.length === 0) return;

        const cuentaT = document.createElement('div');
        cuentaT.className = 'cuenta-t';

        // Crear encabezado con el nombre de la cuenta
        const header = document.createElement('div');
        header.className = 'cuenta-t-header';
        header.textContent = cuenta.nombre;

        // Crear contenedor para el cuerpo de la cuenta T
        const body = document.createElement('div');
        body.className = 'cuenta-t-body';

        // Columna del debe (cargos)
        const debe = document.createElement('div');
        debe.className = 'cuenta-t-debe';
        debe.innerHTML = '<h4>Debe</h4>';
        
        // Agregar los movimientos del debe
        cuenta.debe.forEach(mov => {
            const item = document.createElement('div');
            item.className = 'cuenta-t-item';
            item.innerHTML = `${formatearNumero(mov.valor)} <span class="operacion-ref">${mov.indice}</span>`;
            debe.appendChild(item);
        });

        // Columna del haber (abonos)
        const haber = document.createElement('div');
        haber.className = 'cuenta-t-haber';
        haber.innerHTML = '<h4>Haber</h4>';
        
        // Agregar los movimientos del haber
        cuenta.haber.forEach(mov => {
            const item = document.createElement('div');
            item.className = 'cuenta-t-item';
            item.innerHTML = `${formatearNumero(mov.valor)} <span class="operacion-ref">${mov.indice}</span>`;
            haber.appendChild(item);
        });

        // Ensamblar la cuenta T
        body.appendChild(debe);
        body.appendChild(haber);
        cuentaT.appendChild(header);
        cuentaT.appendChild(body);
        cuentasTContainer.appendChild(cuentaT);
    });
}

export function actualizarBalanza() {
    const balanzaBody = document.getElementById('balanza-body');
    balanzaBody.innerHTML = '';

    // Calcular totales por cuenta
    const totales = {};

    operaciones.forEach(op => {
        op.detalle.forEach(item => {
            if (!totales[item.cuenta]) {
                totales[item.cuenta] = { debe: 0, haber: 0 };
            }
            totales[item.cuenta].debe += item.debe;
            totales[item.cuenta].haber += item.haber;
        });
    });

    // Mostrar totales en la tabla
    for (const [cuenta, { debe, haber }] of Object.entries(totales)) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cuenta}</td>
            <td class="numeric-cell">${formatearNumero(debe)}</td>
            <td class="numeric-cell">${formatearNumero(haber)}</td>
            <td class="numeric-cell">${formatearNumero(debe - haber > 0 ? debe - haber : 0)}</td>
            <td class="numeric-cell">${formatearNumero(haber - debe > 0 ? haber - debe : 0)}</td>
        `;
        balanzaBody.appendChild(fila);
    }

    // Calcular totales generales
    const totalDebe = Object.values(totales).reduce((acc, { debe }) => acc + debe, 0);
    const totalHaber = Object.values(totales).reduce((acc, { haber }) => acc + haber, 0);

    document.getElementById('total-debe').textContent = formatearNumero(totalDebe);
    document.getElementById('total-haber').textContent = formatearNumero(totalHaber);
    document.getElementById('total-deudor').textContent = formatearNumero(totalDebe - totalHaber > 0 ? totalDebe - totalHaber : 0);
    document.getElementById('total-acreedor').textContent = formatearNumero(totalHaber - totalDebe > 0 ? totalHaber - totalDebe : 0);
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