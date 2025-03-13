import { catalogoCuentas } from './catalogoCuentas.js';
import { movimientosPorCuenta } from './cuentasT.js';
import { formatearNumero } from './utils.js';

export function generarBalanceGeneral() {
    const balanceContainer = document.getElementById('balance-container');
    balanceContainer.innerHTML = '';

    const tiposCuenta = {
        'activo': 'Activo',
        'pasivo': 'Pasivo',
        'capital': 'Capital'
    };

    const subtipoActivo = {
        'circulante': 'Activo Circulante',
        'noCirculante': 'Activo No Circulante'
    };

    const activosCirculantes = ['1.1.1', '1.1.2', '1.1.3', '1.1.4', '1.1.5', '1.1.6', '1.1.7', '1.1.8', '1.1.9', '1.1.10', '1.1.11'];
    const activosNoCirculantes = ['1.2.1', '1.2.2', '1.2.3', '1.2.4', '1.2.5', '1.2.6', '1.2.7', '1.2.8', '1.3.1', '1.3.2', '1.3.3', '1.3.4', '1.3.5'];

    const balanceData = {
        'activo': {
            'circulante': [],
            'noCirculante': []
        },
        'pasivo': [],
        'capital': []
    };

    catalogoCuentas.forEach(cuenta => {
        const movimientos = movimientosPorCuenta(cuenta.codigo);
        const saldo = movimientos.debe - movimientos.haber;

        if (saldo !== 0) {
            if (cuenta.tipo === 'activo') {
                if (activosCirculantes.includes(cuenta.codigo)) {
                    balanceData.activo.circulante.push({ cuenta, saldo });
                } else if (activosNoCirculantes.includes(cuenta.codigo)) {
                    balanceData.activo.noCirculante.push({ cuenta, saldo });
                }
            } else if (cuenta.tipo === 'pasivo') {
                balanceData.pasivo.push({ cuenta, saldo });
            } else if (cuenta.tipo === 'capital') {
                balanceData.capital.push({ cuenta, saldo });
            }
        }
    });

    const tabla = document.createElement('table');
    tabla.className = 'tabla-balance-general';
    tabla.innerHTML = `
        <thead>
            <tr>
                <th>Activo</th>
                <th>Pasivo</th>
                <th>Capital Contable</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <table class="subtabla">
                        <thead>
                            <tr>
                                <th colspan="2">Activo Circulante</th>
                            </tr>
                        </thead>
                        <tbody id="activo-circulante-body"></tbody>
                        <thead>
                            <tr>
                                <th colspan="2">Activo No Circulante</th>
                            </tr>
                        </thead>
                        <tbody id="activo-no-circulante-body"></tbody>
                    </table>
                </td>
                <td>
                    <table class="subtabla">
                        <tbody id="pasivo-body"></tbody>
                    </table>
                </td>
                <td>
                    <table class="subtabla">
                        <tbody id="capital-body"></tbody>
                    </table>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th id="total-activo" class="text-right"></th>
                <th id="total-pasivo" class="text-right"></th>
                <th id="total-capital" class="text-right"></th>
            </tr>
        </tfoot>
    `;

    const activoCirculanteBody = tabla.querySelector('#activo-circulante-body');
    const activoNoCirculanteBody = tabla.querySelector('#activo-no-circulante-body');
    const pasivoBody = tabla.querySelector('#pasivo-body');
    const capitalBody = tabla.querySelector('#capital-body');

    let totalActivo = 0;
    let totalPasivo = 0;
    let totalCapital = 0;

    balanceData.activo.circulante.forEach(({ cuenta, saldo }) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cuenta.nombre}</td>
            <td class="text-right">${formatearNumero(Math.abs(saldo))}</td>
        `;
        activoCirculanteBody.appendChild(fila);
        totalActivo += saldo;
    });

    balanceData.activo.noCirculante.forEach(({ cuenta, saldo }) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cuenta.nombre}</td>
            <td class="text-right">${formatearNumero(Math.abs(saldo))}</td>
        `;
        activoNoCirculanteBody.appendChild(fila);
        totalActivo += saldo;
    });

    balanceData.pasivo.forEach(({ cuenta, saldo }) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cuenta.nombre}</td>
            <td class="text-right">${formatearNumero(Math.abs(saldo))}</td>
        `;
        pasivoBody.appendChild(fila);
        totalPasivo += saldo;
    });

    balanceData.capital.forEach(({ cuenta, saldo }) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cuenta.nombre}</td>
            <td class="text-right">${formatearNumero(Math.abs(saldo))}</td>
        `;
        capitalBody.appendChild(fila);
        totalCapital += saldo;
    });

    tabla.querySelector('#total-activo').textContent = `Total Activo: ${formatearNumero(Math.abs(totalActivo))}`;
    tabla.querySelector('#total-pasivo').textContent = `Total Pasivo: ${formatearNumero(Math.abs(totalPasivo))}`;
    tabla.querySelector('#total-capital').textContent = `Total Capital: ${formatearNumero(Math.abs(totalCapital))}`;

    const totalPasivoCapital = totalPasivo + totalCapital;
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <th colspan="2"></th>
        <th id="total-pasivo-capital" class="text-right">Total Pasivo + Capital: ${formatearNumero(Math.abs(totalPasivoCapital))}</th>
    `;
    tabla.querySelector('tfoot').appendChild(totalRow);

    balanceContainer.appendChild(tabla);
}
