import { formatearNumero } from './utils.js';
import { balanceData, generarBalanceGeneral } from './balance.js';
import { operacionesIniciales } from './datos.js';
import { actualizarCuentasT, movimientosDeCuentas } from './cuentasT.js';

export function generarEstadoFlujoEfectivo() {
    generarBalanceGeneral();
    actualizarCuentasT();
    const container = document.getElementById('estado-flujo-efectivo-container');
    container.innerHTML = '';

    // Calculate values dynamically
    // Fuentes de Efectivo
    const utilidadBruta = balanceData.capital.ganado.find(item => item.cuenta.codigo === "3.2.1")?.saldo || 0;
    const isr = utilidadBruta * 0.30; // 30% ISR
    const ptu = utilidadBruta * 0.10; // 10% PTU
    const utilidadEjercicio = utilidadBruta - (utilidadBruta * 0.30) - (utilidadBruta * 0.10);
    const depreciaciones = operacionesIniciales
        .find(op => op.descripcion === "Depreciación de activos")
        ?.detalle.find(item => item.cuenta === "4.1.10")?.debe || 0;
    const efectivoOperacion = utilidadEjercicio + isr + ptu + depreciaciones;
    const proveedores = balanceData.pasivo.cortoPlazo.find(item => item.cuenta.codigo === "2.1.1")?.saldo || 0;
    const capitalSocial = balanceData.capital.contribuido.find(item => item.cuenta.codigo === "3.1.1")?.saldo || 0;
    const sumaFuentesEfectivo = efectivoOperacion + proveedores + capitalSocial;

    // Aplicación de Efectivo
    const almacen = balanceData.activo.circulante.find(item => item.cuenta.codigo === "1.1.5")?.saldo || 0;
    const clientes = balanceData.activo.circulante.find(item => item.cuenta.codigo === "1.1.6")?.saldo || 0;
    const terreno = balanceData.activo.noCirculante.find(item => item.cuenta.codigo === "1.2.1")?.saldo || 0;
    const edificios = movimientosDeCuentas["1.2.2"]?.debe.reduce((acc, item) => acc + item.valor, 0) || 0;
    const herramientas = movimientosDeCuentas["1.2.8"]?.debe.reduce((acc, item) => acc + item.valor, 0) || 0;
    const ivaTrasladado = -(balanceData.pasivo.cortoPlazo.find(item => item.cuenta.codigo === "5.1.6")?.saldo || 0);
    const ivaPorTrasladar = -(balanceData.pasivo.cortoPlazo.find(item => item.cuenta.codigo === "5.1.7")?.saldo || 0);
    const ivaAcreditable = balanceData.activo.circulante.find(item => item.cuenta.codigo === "1.1.10")?.saldo || 0;
    const ivaPorAcreditar = balanceData.activo.circulante.find(item => item.cuenta.codigo === "1.1.11")?.saldo || 0;
    const subtotalAplicacion = almacen + clientes + terreno + edificios + herramientas + 
    ivaTrasladado + ivaPorTrasladar + ivaAcreditable + ivaPorAcreditar;

    // Disminución del Efectivo
    const saldoInicialBancos = 0; // Initial balance assumed as 0
    const saldoFinalBancos = balanceData.activo.circulante.find(item => item.cuenta.codigo === "1.1.3")?.saldo || 0;
    const subtotalBancos = saldoInicialBancos + saldoFinalBancos;
    const saldoInicialCaja = operacionesIniciales
        .find(op => op.descripcion === "Inicio de operaciones")
        ?.detalle.find(item => item.cuenta === "1.1.1")?.debe || 0;
    const saldoFinalCaja = balanceData.activo.circulante.find(item => item.cuenta.codigo === "1.1.1")?.saldo || 0;
    const subtotalCaja = saldoInicialCaja - saldoFinalCaja;

    // Final Summaries
    const sumaAumentosDisminuciones = sumaFuentesEfectivo - subtotalAplicacion;
    const sumaCajaBanco = saldoFinalCaja + saldoFinalBancos;

    // Helper function to create table rows
    const fila = (concepto, importe) => `
        <tr>
            <td>${concepto}</td>
            <td>$${formatearNumero(importe)}</td>
        </tr>
    `;

    // Create table
    const tabla = document.createElement('table');
    tabla.className = 'tabla-estado-resultados';

    tabla.innerHTML = `
        <thead>
            <tr>
                <th colspan="2">Fuentes de Efectivo</th>
            </tr>
        </thead>
        <tbody>
            ${fila('Utilidad del despues de impuestos', utilidadEjercicio)}
            <tr><th colspan="2">Cargos a resultados que no implican utilizacion del efectivo</th></tr>
            ${fila('ISR', isr)}
            ${fila('PTU', ptu)}
            ${fila('Acreedores', 0)}
            ${fila('Depreciaciones', depreciaciones)}
            ${fila('Efectivo generado en la operación', efectivoOperacion)}

            <tr><th colspan="2">Financiamiento y otras fuentes</th></tr>
            ${fila('Proveedores', proveedores)}
            ${fila('Capital Social', capitalSocial)}
            ${fila('Suma de las fuentes de efectivo', sumaFuentesEfectivo)}

            <tr><th colspan="2">Aplicación de Efectivo</th></tr>
            ${fila('Almacén', almacen)}
            ${fila('Clientes', clientes)}
            ${fila('Terreno', terreno)}
            ${fila('Edificio', edificios)}
            ${fila('Herramientas', herramientas)}
            ${fila('IVA trasladado', ivaTrasladado)}
            ${fila('IVA por trasladar', ivaPorTrasladar)}
            ${fila('IVA acreditable', ivaAcreditable)}
            ${fila('IVA por acreditar', ivaPorAcreditar)}
            ${fila('Subtotal', subtotalAplicacion)}
            <tr><th colspan="2">Disminución del Efectivo</th></tr>
            ${fila('Saldo inicial de bancos', saldoInicialBancos)}
            ${fila('Saldo final de bancos', saldoFinalBancos)}
            ${fila('Subtotal', subtotalBancos)}
            ${fila('Saldo inicial de caja', saldoInicialCaja)}
            ${fila('Saldo final de caja', saldoFinalCaja)}
            ${fila('Subtotal', subtotalCaja)}
            <tr><th colspan="2">Suma de los aumentos y disminuciones</th></tr>
            ${fila('', sumaAumentosDisminuciones)}
            <tr><th colspan="2">Suma de caja y banco</th></tr>
            ${fila('', sumaCajaBanco)}
        </tbody>
    `;

    container.appendChild(tabla);
}