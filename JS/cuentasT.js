import { formatearNumero } from './utils.js';
import { catalogoCuentas } from './catalogoCuentas.js';
import { operaciones } from './operaciones.js';
// Crear objeto para almacenar los movimientos por cuenta
export let movimientosDeCuentas = {};

export function actualizarCuentasT() {
    const cuentasTContainer = document.getElementById('cuentas-t-container');
    cuentasTContainer.innerHTML = '';

    movimientosDeCuentas = {};

    // Recopilar todos los movimientos de las operaciones
    operaciones.forEach(op => {
        op.detalle.forEach(item => {
            const codigoCuenta = item.cuenta;
            
            // Inicializar la cuenta si no existe
            if (!movimientosDeCuentas[codigoCuenta]) {
                // Obtener información de la cuenta del catálogo
                const infoCuenta = catalogoCuentas.find(c => c.codigo === codigoCuenta);
                if (!infoCuenta) return;
                
                movimientosDeCuentas[codigoCuenta] = {
                    nombre: infoCuenta.nombre,
                    debe: [],
                    haber: []
                };
            }
            
            // Agregar movimientos
            if (item.debe > 0) {
                movimientosDeCuentas[codigoCuenta].debe.push({
                    valor: item.debe,
                    indice: op.indice
                });
            }
            
            if (item.haber > 0) {
                movimientosDeCuentas[codigoCuenta].haber.push({
                    valor: item.haber,
                    indice: op.indice
                });
            }
        });
    });
    console.log("Cuentas T", movimientosDeCuentas);
    // Crear las cuentas T solo para las cuentas con movimientos
    Object.entries(movimientosDeCuentas).forEach(([codigo, cuenta]) => {
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

export function movimientosPorCuenta(codigoCuenta) {
    const movimientos = { debe: 0, haber: 0 };

    operaciones.forEach(op => {
        op.detalle.forEach(det => {
            if (det.cuenta === codigoCuenta) {
                movimientos.debe += det.debe;
                movimientos.haber += det.haber;
            }
        });
    });
    return movimientos;
}
