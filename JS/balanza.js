import { formatearNumero } from './utils.js';
import { operaciones } from './operaciones.js';

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
