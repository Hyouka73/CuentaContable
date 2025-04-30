import { formatearNumero, obtenerSaldoCuenta } from './utils.js';

export function generarEstadoResultados() {
    const estadoContainer = document.getElementById('estado-resultados-container');
    estadoContainer.innerHTML = '';

    // Obtener valores base
    const ventasTotales = Math.abs(obtenerSaldoCuenta('5.1.1'));
    const devolVentas = Math.abs(obtenerSaldoCuenta('4.1.3'));
    const rebajasVentas = Math.abs(obtenerSaldoCuenta('4.1.4'));
    const descuentosVentas = Math.abs(obtenerSaldoCuenta('4.1.5'));
    
    const compras = Math.abs(obtenerSaldoCuenta('4.1.1'));
    const gastosCompras = Math.abs(obtenerSaldoCuenta('4.1.2'));
    const devolCompras = Math.abs(obtenerSaldoCuenta('5.1.2'));
    const rebajasCompras = Math.abs(obtenerSaldoCuenta('5.1.3'));
    const descuentosCompras = Math.abs(obtenerSaldoCuenta('5.1.4'));

    // Cálculos según especificaciones
    const totalDeduccionesVentas = devolVentas + rebajasVentas + descuentosVentas;
    const ventasNetas = ventasTotales - totalDeduccionesVentas;
    
    const comprasTotales = compras + gastosCompras;
    const totalDeduccionesCompras = devolCompras + rebajasCompras + descuentosCompras;
    const comprasNetas = comprasTotales - totalDeduccionesCompras;
    
    const totalMercancias = comprasNetas;
    const inventarioFinal = totalMercancias * 0.97; // 97% de las mercancías disponibles
    const costoVentas = totalMercancias - inventarioFinal;
    const utilidadBruta = ventasNetas - costoVentas;
    
    const gastosOperacion = totalMercancias * 0.01; // 1%
    const gastosVenta = totalMercancias * 0.02;    // 2%
    const gastosAdmin = totalMercancias * 0.008;   // 0.8%
    const totalGastos = gastosOperacion + gastosVenta + gastosAdmin;
    
    const utilidadOperacion = utilidadBruta - totalGastos;

    // Crear tabla con 4 columnas
    const tabla = document.createElement('table');
    tabla.className = 'estado-resultados-cuatro-columnas';

    tabla.innerHTML = `
        <thead>
            <tr>
                <th></th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
            </tr>
        </thead>
        <tbody>
            <!-- Sección de Ventas -->
            <tr>
                <td>Ventas totales</td>
                <td></td>
                <td></td>
                <td>${formatearNumero(ventasTotales)}</td>
                <td></td>
            </tr>
            <tr>
                <td>Devoluciones sobre ventas</td>
                <td></td>
                <td>${formatearNumero(devolVentas)}</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>Rebajas sobre ventas</td>
                <td></td>
                <td>${formatearNumero(rebajasVentas)}</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>Descuentos sobre ventas</td>
                <td></td>
                <td class="con-borde">${formatearNumero(descuentosVentas)}</td>
                <td class="con-borde">${formatearNumero(totalDeduccionesVentas)}</td>
                <td></td>
            </tr>
            <tr class="total">
                <td>Ventas netas</td>
                <td></td>
                <td></td>
                <td></td>
                <td class="con-borde">${formatearNumero(ventasNetas)}</td>
            </tr>
            
            <!-- Sección de Compras -->
            <tr>
                <td>Inventario inicial</td>
                <td></td>
                <td></td>
                <td>${formatearNumero(0)}</td>
                <td></td>
            </tr>
            <tr>
                <td>Compras</td>
                <td>${formatearNumero(compras)}</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>Gastos de compras</td>
                <td class="con-borde">${formatearNumero(gastosCompras)}</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>Compras Totales</td>
                <td></td>
                <td>${formatearNumero(comprasTotales)}</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>devoluciones sobre compras</td>
                <td>${formatearNumero(devolCompras)}</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>rebajas sobre compras</td>
                <td>${formatearNumero(rebajasCompras)}</td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>descuentos sobre compras</td>
                <td class="con-borde">${formatearNumero(descuentosCompras)}</td>
                <td class="con-borde">${formatearNumero(totalDeduccionesCompras)}</td>
                <td></td>
                <td></td>
            </tr>
            <tr class="total">
                <td>Compras Netas</td>
                <td></td>
                <td></td>
                <td class="con-borde">${formatearNumero(comprasNetas)}</td>
                <td></td>
            </tr>
            
            <!-- Sección de Costos y Utilidades -->
            <tr>
                <td>Total de mercancias disponibles</td>
                <td></td>
                <td></td>
                <td>${formatearNumero(totalMercancias)}</td>
                <td></td>
            </tr>
            <tr>
                <td>inventario final</td>
                <td></td>
                <td></td>
                <td class="con-borde">${formatearNumero(inventarioFinal)}</td>
                <td></td>
            </tr>
            <tr class="total">
                <td>costo de ventas</td>
                <td></td>
                <td></td>
                <td></td>
                <td class="con-borde">${formatearNumero(costoVentas)}</td>
            </tr>
            <tr class="total">
                <td>Utilidad bruta</td>
                <td></td>
                <td></td>
                <td></td>
                <td>${formatearNumero(utilidadBruta)}</td>
            </tr>
            
            <!-- Sección de Gastos -->
            <tr>
                <td>Gastos de Operación</td>
                <td></td>
                <td></td>
                <td>${formatearNumero(gastosOperacion)}</td>
                <td></td>
            </tr>
            <tr>
                <td>Gastos de venta</td>
                <td></td>
                <td></td>
                <td>${formatearNumero(gastosVenta)}</td>
                <td></td>
            </tr>
            <tr>
                <td>Gastos de Administración</td>
                <td></td>
                <td></td>
                <td class="con-borde">${formatearNumero(gastosAdmin)}</td>
                <td class="con-borde">${formatearNumero(totalGastos)}</td>
            </tr>
            <tr class="total final">
                <td>Utilidad por Operación</td>
                <td></td>
                <td></td>
                <td></td>
                <td>${formatearNumero(utilidadOperacion)}</td>
            </tr>
        </tbody>
    `;

    estadoContainer.appendChild(tabla);
}