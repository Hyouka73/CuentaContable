import { formatearNumero } from './utils.js';
import { movimientosDeCuentas,actualizarCuentasT } from './cuentasT.js';

export function crearFormularioArqueo() {
    actualizarCuentasT()
    const balanceContainer = document.getElementById('balance-container');
    balanceContainer.innerHTML = ''; // Limpiar el contenedor

    // Crear contenedor principal
    const container = document.createElement('div');
    container.className = 'arqueo-caja';

    // Tabla para las denominaciones
    const tabla = document.createElement('table');
    tabla.className = 'tabla-arqueo';

    // Encabezados de la tabla
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Denominación</th>
            <th>Cantidad</th>
            <th>Total</th>
        </tr>
    `;
    tabla.appendChild(thead);

    // Cuerpo de la tabla
    const tbody = document.createElement('tbody');
    tbody.id = 'denominaciones-body';

    // Denominaciones monetarias
    const denominaciones = [
        1000, 500, 200, 100, 50, 20, 10, 5, 2, 1, 0.5
    ];

    // Crear filas para cada denominación
    denominaciones.forEach(valor => {
        const tr = document.createElement('tr');
        
        // Columna 1: Denominación
        const tdDenominacion = document.createElement('td');
        tdDenominacion.textContent = valor >= 1 ? `$${valor}` : `${valor * 100}¢`;
        
        // Columna 2: Cantidad
        const tdCantidad = document.createElement('td');
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '0';
        input.step = '1';
        input.value = '0';
        input.dataset.valor = valor;
        input.addEventListener('input', calcularTotales);
        tdCantidad.appendChild(input);
        
        // Columna 3: Total
        const tdTotal = document.createElement('td');
        tdTotal.className = 'total-denominacion';
        tdTotal.textContent = '$0.00';
        
        tr.appendChild(tdDenominacion);
        tr.appendChild(tdCantidad);
        tr.appendChild(tdTotal);
        tbody.appendChild(tr);
    });

    tabla.appendChild(tbody);
    container.appendChild(tabla);

    // Sección de resultados
    const resultadosDiv = document.createElement('div');
    resultadosDiv.className = 'resultados-arqueo';

    // Saldo en sistema (debe - haber de caja)
    const saldoSistema = calcularSaldoCaja();
    const sistemaDiv = document.createElement('div');
    sistemaDiv.className = 'resultado-item';
    sistemaDiv.innerHTML = `<span>Saldo en sistema:</span> <span>${formatearNumero(saldoSistema)}</span>`;
    resultadosDiv.appendChild(sistemaDiv);

    // Total contado
    const totalContadoDiv = document.createElement('div');
    totalContadoDiv.className = 'resultado-item';
    totalContadoDiv.innerHTML = `<span>Total contado:</span> <span id="total-contado">$0.00</span>`;
    resultadosDiv.appendChild(totalContadoDiv);

    // Diferencia
    const diferenciaDiv = document.createElement('div');
    diferenciaDiv.className = 'resultado-item diferencia';
    diferenciaDiv.innerHTML = `<span>Diferencia:</span> <span id="diferencia">$0.00</span>`;
    resultadosDiv.appendChild(diferenciaDiv);

    container.appendChild(resultadosDiv);
    balanceContainer.appendChild(container);

    // Calcular inicialmente
    calcularTotales();
}

function calcularSaldoCaja() {
    const cuentaCaja = movimientosDeCuentas['1.1.1'] || { debe: [], haber: [] };
    const totalDebe = cuentaCaja.debe.reduce((sum, mov) => sum + mov.valor, 0);
    const totalHaber = cuentaCaja.haber.reduce((sum, mov) => sum + mov.valor, 0);
    return Math.abs(totalDebe - totalHaber);
}

function calcularTotales() {
    const inputs = document.querySelectorAll('#denominaciones-body input');
    let totalContado = 0;

    // Calcular total por denominación y total general
    inputs.forEach(input => {
        const cantidad = parseFloat(input.value) || 0;
        const valor = parseFloat(input.dataset.valor);
        const total = cantidad * valor;
        
        // Actualizar columna de total
        const tdTotal = input.closest('tr').querySelector('.total-denominacion');
        tdTotal.textContent = formatearNumero(total);
        
        totalContado += total;
    });

    // Actualizar totales
    document.getElementById('total-contado').textContent = formatearNumero(totalContado);
    
    const saldoSistema = calcularSaldoCaja();
    const diferencia = totalContado - saldoSistema;
    const diferenciaElement = document.getElementById('diferencia');
    
    diferenciaElement.textContent = formatearNumero(diferencia);
    
    // Resaltar diferencia
    if (diferencia === 0) {
        diferenciaElement.classList.remove('negativo', 'positivo');
        diferenciaElement.classList.add('igual');
    } else if (diferencia > 0) {
        diferenciaElement.classList.remove('igual', 'negativo');
        diferenciaElement.classList.add('positivo');
    } else {
        diferenciaElement.classList.remove('igual', 'positivo');
        diferenciaElement.classList.add('negativo');
    }
}