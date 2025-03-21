import { formatearNumero } from './utils.js';
import { balanceData, generarBalanceGeneral } from './balance.js';
import { operacionesIniciales } from './datos.js';

export function generarEstadoCambiosFlujos() {
    generarBalanceGeneral();
    const container = document.getElementById('estado-cambios-flujos-container');
    container.innerHTML = '';

    // Obtener datos con manejo de undefined
    const saldoInicial = obtenerSaldoInicialCaja();
    const capitalSocial = obtenerCapitalSocial();
    const resultadoEjercicio = obtenerResultadoEjercicio();
    const reservaLegal = calcularReservaLegal(resultadoEjercicio);
    const totalAumentos = capitalSocial + reservaLegal + resultadoEjercicio;
    const saldoFinal = obtenerSaldoFinalEfectivo();

    // Crear tabla
    const tabla = document.createElement('table');
    tabla.className = 'tabla-estado-resultados';

    tabla.innerHTML = `
        <thead>
            <tr><th colspan="2">Estado de Cambios de Flujo de Efectivo</th></tr>
        </thead>
        <tbody>
            ${fila('Saldos iniciales', saldoInicial)}
            
            <tr><td colspan="2" class="subheader">Aumentos</td></tr>
            ${fila('Capital social', capitalSocial)}
            ${fila('Reserva legal', reservaLegal)}
            ${fila('Resultado del ejercicio', resultadoEjercicio)}
            ${fila('Total de aumentos', totalAumentos, 'total')}
            
            <tr><td colspan="2" class="subheader">Disminuciones</td></tr>
            ${fila('Decreto de dividendos', 0)}
            ${fila('Total disminuciones', 0, 'total')}
            
            ${fila('Incremento neto', totalAumentos, 'total')}
            ${fila('Saldos finales', saldoFinal, 'total final')}
        </tbody>
    `;

    container.appendChild(tabla);
}

function obtenerSaldoInicialCaja() {
    const operacionInicial = operacionesIniciales?.find(op => op.indice === 1);
    const movimientoCaja = operacionInicial?.detalle?.find(d => d.cuenta === '1.1.1');
    return movimientoCaja?.debe || 0;
}

function obtenerCapitalSocial() {
    const cuentaCapital = balanceData?.capital?.contribuido?.find(c => c.cuenta?.codigo === '3.1.1');
    return cuentaCapital?.saldo || 0;
}

function obtenerResultadoEjercicio() {
    const cuentaUtilidad = balanceData?.capital?.ganado?.find(c => c.cuenta?.codigo === '3.2.1');
    return cuentaUtilidad?.saldo || 0;
}

function calcularReservaLegal(utilidad) {
    return utilidad ? (utilidad * 0.05) / 12 : 0;
}

function obtenerSaldoFinalEfectivo() {
    const caja = balanceData?.activo?.circulante?.find(c => c.cuenta?.codigo === '1.1.1')?.saldo || 0;
    const bancos = balanceData?.activo?.circulante?.find(c => c.cuenta?.codigo === '1.1.3')?.saldo || 0;
    return caja + bancos;
}

function fila(concepto, monto, clase = '') {
    return `
        <tr${clase ? ` class="${clase}"` : ''}>
            <td>${concepto}</td>
            <td class="text-right">${formatearNumero(monto)}</td>
        </tr>
    `;
}