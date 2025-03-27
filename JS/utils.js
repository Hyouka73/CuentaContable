import { catalogoCuentas } from './catalogoCuentas.js';
import { movimientosPorCuenta } from './cuentasT.js';

export function formatearNumero(numero) {
    return numero.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function mostrarError(mensaje) {
    const mensajeError = document.getElementById('mensaje-error');
    mensajeError.textContent = mensaje;
    setTimeout(() => {
        mensajeError.textContent = '';
    }, 3000);
}

export function mostrarExito(mensaje) {
    const mensajeExito = document.getElementById('mensaje-exito');
    mensajeExito.textContent = mensaje;
    setTimeout(() => {
        mensajeExito.textContent = '';
    }, 3000);
}

export function obtenerSaldoCuenta(codigo) {
    const movimientos = movimientosPorCuenta(codigo);
    const cuenta = catalogoCuentas.find(c => c.codigo === codigo);
    
    if (!cuenta) return 0;
    
    // Determinar saldo según naturaleza de la cuenta
    return (cuenta.tipo === 'activo' || cuenta.tipo === 'gastos') 
        ? movimientos.debe - movimientos.haber 
        : movimientos.haber - movimientos.debe;
}