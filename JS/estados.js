import { formatearNumero, obtenerSaldoCuenta } from './utils.js';

let utilidadNetaCalculada = 0;

// Nueva función para inicializar y calcular la utilidad neta
export function calcularUtilidad() {
    // Obtener valores con signos naturales
    const ventas = obtenerSaldoCuenta('5.1.1');
    const devolVentas = obtenerSaldoCuenta('4.1.3');
    const rebajasVentas = obtenerSaldoCuenta('4.1.4');
    const descuentosVentas = obtenerSaldoCuenta('4.1.5');

    const ventasNetas = ventas - (devolVentas + rebajasVentas + descuentosVentas);
    const costoVentas = obtenerSaldoCuenta('4.1.13');
    const gastosGenerales = obtenerGastosGenerales();

    const utilidadBruta = ventasNetas - costoVentas;
    utilidadNetaCalculada = utilidadBruta - gastosGenerales;
    
    return utilidadNetaCalculada;
}

export function generarEstadoResultados() {
    // Asegurar que la utilidad esté calculada
    calcularUtilidad();

    const estadoContainer = document.getElementById('estado-resultados-container');
    estadoContainer.innerHTML = '';

    // Obtener valores manteniendo sus signos naturales
    const ventas = obtenerSaldoCuenta('5.1.1');
    const devolVentas = obtenerSaldoCuenta('4.1.3');
    const rebajasVentas = obtenerSaldoCuenta('4.1.4');
    const descuentosVentas = obtenerSaldoCuenta('4.1.5');

    // Calcular ventas netas
    const ventasNetas = ventas - (devolVentas + rebajasVentas + descuentosVentas);

    // Obtener costo de ventas
    const costoVentas = Math.abs(obtenerSaldoCuenta('4.1.13'));

    // Obtener gastos generales
    const gastosGenerales = obtenerGastosGenerales();

    // Calcular utilidades
    const utilidadBruta = ventasNetas - costoVentas;
    utilidadNetaCalculada = utilidadBruta - gastosGenerales;

    // Crear tabla de estado de resultados
    const tabla = crearTablaEstadoResultados({
        ventas,
        devolVentas,
        rebajasVentas,
        descuentosVentas,
        ventasNetas,
        costoVentas,
        utilidadBruta,
        gastosGenerales,
        utilidadNeta: utilidadNetaCalculada
    });

    estadoContainer.appendChild(tabla);
}

export function utilidadNetaTotal() {
    return utilidadNetaCalculada;
}

function obtenerGastosGenerales() {
    // Sumar todos los gastos generales
    const gastosArrendamiento = obtenerSaldoCuenta('4.1.10');
    const gastosPapeleria = obtenerSaldoCuenta('4.1.11');
    const gastosSeguros = obtenerSaldoCuenta('4.1.12');
    const gastosVenta = obtenerSaldoCuenta('4.1.6');
    const gastosAdmin = obtenerSaldoCuenta('4.1.7');
    const otrosGastos = obtenerSaldoCuenta('4.1.8');
    
    return gastosArrendamiento + gastosPapeleria + gastosSeguros + 
           gastosVenta + gastosAdmin + otrosGastos;
}

function crearTablaEstadoResultados(datos) {
    const tabla = document.createElement('table');
    tabla.className = 'tabla-estado-resultados';

    tabla.innerHTML = `
        <thead>
            <tr><th colspan="2">Estado de Resultados</th></tr>
        </thead>
        <tbody>
            <tr>
                <td>Ventas Totales</td>
                <td class="text-right">${formatearNumero(datos.ventas)}</td>
            </tr>
            <tr>
                <td>(-) Devoluciones sobre ventas</td>
                <td class="text-right">${formatearNumero(datos.devolVentas)}</td>
            </tr>
            <tr>
                <td>(-) Rebajas sobre ventas</td>
                <td class="text-right">${formatearNumero(datos.rebajasVentas)}</td>
            </tr>
            <tr>
                <td>(-) Descuentos sobre ventas</td>
                <td class="text-right">${formatearNumero(datos.descuentosVentas)}</td>
            </tr>
            <tr class="total">
                <td>= Ventas Netas</td>
                <td class="text-right">${formatearNumero(datos.ventasNetas)}</td>
            </tr>
            <tr>
                <td>(-) Costo de Ventas</td>
                <td class="text-right">${formatearNumero(datos.costoVentas)}</td>
            </tr>
            <tr class="total">
                <td>= Utilidad Bruta</td>
                <td class="text-right">${formatearNumero(datos.utilidadBruta)}</td>
            </tr>
            <tr>
                <td>(-) Gastos de Operación</td>
                <td class="text-right">${formatearNumero(datos.gastosGenerales)}</td>
            </tr>
            <tr class="total final">
                <td>= Utilidad o (Pérdida) Neta del Ejercicio</td>
                <td class="text-right">${formatearNumero(datos.utilidadNeta)}</td>
            </tr>
        </tbody>
    `;

    return tabla;
}

