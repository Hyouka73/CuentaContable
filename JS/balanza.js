import { catalogoCuentas } from './catalogoCuentas.js';
import { movimientosPorCuenta } from './cuentasT.js';
import { formatearNumero } from './utils.js';

export function actualizarBalanza() {
    const balanzaBody = document.getElementById('balanza-body');
    const totalDebeElem = document.getElementById('total-debe');
    const totalHaberElem = document.getElementById('total-haber');
    const totalDeudorElem = document.getElementById('total-deudor');
    const totalAcreedorElem = document.getElementById('total-acreedor');

    balanzaBody.innerHTML = '';
    let totalDebe = 0;
    let totalHaber = 0;
    let totalDeudor = 0;
    let totalAcreedor = 0;

    catalogoCuentas.forEach(cuenta => {
        const movimientos = movimientosPorCuenta(cuenta.codigo);
        const saldo = movimientos.debe - movimientos.haber;

        if (movimientos.debe > 0 || movimientos.haber > 0) {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${cuenta.codigo} - ${cuenta.nombre}</td>
                <td class="text-right">${formatearNumero(movimientos.debe)}</td>
                <td class="text-right">${formatearNumero(movimientos.haber)}</td>
                <td class="text-right">${saldo > 0 ? formatearNumero(saldo) : ''}</td>
                <td class="text-right">${saldo < 0 ? formatearNumero(Math.abs(saldo)) : ''}</td>
            `;
            balanzaBody.appendChild(fila);

            totalDebe += movimientos.debe;
            totalHaber += movimientos.haber;
            if (saldo > 0) {
                totalDeudor += saldo;
            } else {
                totalAcreedor += Math.abs(saldo);
            }
        }
    });

    totalDebeElem.textContent = formatearNumero(totalDebe);
    totalHaberElem.textContent = formatearNumero(totalHaber);
    totalDeudorElem.textContent = formatearNumero(totalDeudor);
    totalAcreedorElem.textContent = formatearNumero(totalAcreedor);
}
