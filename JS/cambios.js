import { formatearNumero } from './utils.js';
import { balanceData, generarBalanceGeneral } from './balance.js';
import { operacionesIniciales } from './datos.js';

export function generarEstadoCambiosFlujos() {
    generarBalanceGeneral();
    const container = document.getElementById('estado-cambios-flujos-container');
    container.innerHTML = '';

    // Obtener datos
    const saldoInicialContribuido = obtenerSaldoInicialContribuido();
    const saldoInicialGanado = obtenerSaldoInicialGanado();
    
    // Aumentos
    const capitalSocial = obtenerCapitalSocial();
    const emisionAcciones = obtenerEmisionAcciones();
    const primaAcciones = obtenerPrimaAcciones();
    const resultadoEjercicio = obtenerResultadoEjercicio();
    const reservaLegal = calcularReservaLegal(resultadoEjercicio);
    
    // Totales aumentos
    const totalAumentosContribuido = capitalSocial + emisionAcciones + primaAcciones;
    const totalAumentosGanado = reservaLegal + resultadoEjercicio;
    const totalAumentosContable = totalAumentosContribuido + totalAumentosGanado;

    // Disminuciones
    const decretoDividendos = obtenerDecretoDividendos();
    const reservaLegalDism = obtenerReservaLegalDism();
    const reembolsoSocios = obtenerReembolsoSocios();
    
    // Totales disminuciones
    const totalDisminucionesContribuido = reembolsoSocios;
    const totalDisminucionesGanado = decretoDividendos + reservaLegalDism;
    const totalDisminucionesContable = totalDisminucionesContribuido + totalDisminucionesGanado;

    // Cálculos finales
    const incrementoNetoContribuido = totalAumentosContribuido - totalDisminucionesContribuido;
    const incrementoNetoGanado = totalAumentosGanado - totalDisminucionesGanado;
    const incrementoNetoContable = incrementoNetoContribuido + incrementoNetoGanado;
    
    const saldoFinalContribuido = saldoInicialContribuido + incrementoNetoContribuido;
    const saldoFinalGanado = saldoInicialGanado + incrementoNetoGanado;
    const saldoFinalContable = saldoFinalContribuido + saldoFinalGanado;

    // Crear tabla
    const tabla = document.createElement('table');
    tabla.className = 'tabla-estado-resultados';

    tabla.innerHTML = `
        <thead>
            <tr>
                <th>Conceptos</th>
                <th>Capital Contribuido</th>
                <th>Capital Ganado</th>
                <th>Capital Contable</th>
            </tr>
        </thead>
        <tbody>
            ${fila('Saldos iniciales', saldoInicialContribuido, saldoInicialGanado)}
            
            <tr><td colspan="4" class="subheader">Aumentos</td></tr>
            ${fila('Capital social', capitalSocial, 0)}
            ${fila('Reserva legal', 0, reservaLegal)}
            ${fila('Emisión de acciones', emisionAcciones, 0)}
            ${fila('Prima de acciones', primaAcciones, 0)}
            ${fila('Resultado del ejercicio', 0, resultadoEjercicio)}
            ${filaTotal('Total aumentos', totalAumentosContribuido, totalAumentosGanado)}
            
            <tr><td colspan="4" class="subheader">Disminuciones</td></tr>
            ${fila('Decreto de dividendos', 0, decretoDividendos)}
            ${fila('Reserva legal', 0, reservaLegalDism)}
            ${fila('Reembolso a los socios', reembolsoSocios, 0)}
            ${filaTotal('Total disminuciones', totalDisminucionesContribuido, totalDisminucionesGanado)}
            
            ${filaTotal('Incremento neto', incrementoNetoContribuido, incrementoNetoGanado)}
            ${filaTotalFinal('Saldos finales', saldoFinalContribuido, saldoFinalGanado)}
        </tbody>
    `;

    container.appendChild(tabla);
}

// Funciones existentes
function obtenerSaldoInicialCaja() {
    const operacionInicial = operacionesIniciales?.find(op => op.indice === 1);
    const movimientoCaja = operacionInicial?.detalle?.find(d => d.cuenta === '1.1.1');
    return movimientoCaja?.debe || 0;
}

function obtenerCapitalSocial() {
    const cuentaCapital = balanceData?.capital?.contribuido?.find(c => c.cuenta?.codigo === '3.1.1');
    return cuentaCapital?.saldo || 0;
}

// Nuevas funciones para obtener datos
function obtenerEmisionAcciones() {
    const cuentaEmision = balanceData?.capital?.contribuido?.find(c => c.cuenta?.codigo === '3.1.2');
    return cuentaEmision?.saldo || 0;
}

function obtenerPrimaAcciones() {
    const cuentaPrima = balanceData?.capital?.contribuido?.find(c => c.cuenta?.codigo === '3.1.3');
    return cuentaPrima?.saldo || 0;
}

function obtenerDecretoDividendos() {
    const cuentaDividendos = balanceData?.pasivo?.circulante?.find(c => c.cuenta?.codigo === '2.1.4');
    return cuentaDividendos?.saldo || 0;
}

function obtenerReservaLegalDism() {
    const cuentaReserva = balanceData?.capital?.restricciones?.find(c => c.cuenta?.codigo === '3.3.1');
    return cuentaReserva?.saldo || 0;
}

function obtenerReembolsoSocios() {
    const cuentaReembolso = balanceData?.capital?.reembolsos?.find(c => c.cuenta?.codigo === '3.4.1');
    return cuentaReembolso?.saldo || 0;
}

function obtenerResultadoEjercicio() {
    const cuentaUtilidad = balanceData?.capital?.ganado?.find(c => c.cuenta?.codigo === '3.2.1');
    return cuentaUtilidad?.saldo || 0;
}

function calcularReservaLegal(utilidad) {
    return utilidad ? (utilidad * 0.05) / 12 : 0;
}

function fila(concepto, contribuido, ganado, clase = '') {
    const contable = contribuido + ganado;
    return `
        <tr${clase ? ` class="${clase}"` : ''}>
            <td>${concepto}</td>
            <td class="text-right">${formatearNumero(contribuido)}</td>
            <td class="text-right">${formatearNumero(ganado)}</td>
            <td class="text-right">${formatearNumero(contable)}</td>
        </tr>
    `;
}

function filaTotal(concepto, contribuido, ganado) {
    const contable = contribuido + ganado;
    return `
        <tr class="total">
            <td>${concepto}</td>
            <td class="text-right">${formatearNumero(contribuido)}</td>
            <td class="text-right">${formatearNumero(ganado)}</td>
            <td class="text-right">${formatearNumero(contable)}</td>
        </tr>
    `;
}

function filaTotalFinal(concepto, contribuido, ganado) {
    const contable = contribuido + ganado;
    return `
        <tr class="total-final">
            <td>${concepto}</td>
            <td class="text-right">${formatearNumero(contribuido)}</td>
            <td class="text-right">${formatearNumero(ganado)}</td>
            <td class="text-right">${formatearNumero(contable)}</td>
        </tr>
    `;
}

// Nuevas funciones de obtención de datos (ejemplos)
function obtenerSaldoInicialContribuido() {
    return 0; // Implementar lógica real
}

function obtenerSaldoInicialGanado() {
    return 0; // Implementar lógica real
}