import { catalogoCuentas } from './catalogoCuentas.js';
import { formatearNumero, obtenerSaldoCuenta } from './utils.js';
import { utilidadNetaTotal, calcularUtilidad } from './estados.js';

export const balanceData = {
    'activo': {
        'circulante': [],
        'noCirculante': []
    },
    'pasivo': {
        'cortoPlazo': [],
        'largoPlazo': []
    },
    'capital': {
        'contribuido': [],
        'ganado': []
    }
};

// Función mejorada para manejar depreciaciones
function obtenerActivoConDepreciacion(cuenta) {
    const depreciacionMap = {
        'Edificios': '1.2.9',
        'Mobiliario y Equipo': '1.2.10',
        'Equipo de Cómputo Electrónico': '1.2.11',
        'Equipo de Transporte': '1.2.12',
        'Herramientas': '1.2.13',
        'Maquinaria': '1.2.14',
        'Propaganda y Publicidad': '1.2.16',
    };

    let saldo = obtenerSaldoCuenta(cuenta.codigo);
    
    // Si es un activo depreciable, restar su depreciación
    const codigoDepreciacion = depreciacionMap[cuenta.nombre];
    if (codigoDepreciacion) {
        const depreciacion = obtenerSaldoCuenta(codigoDepreciacion);
        saldo -= Math.abs(depreciacion);
    }
    
    return saldo;
}

export function generarBalanceGeneral() {
    // Calcular utilidad antes de generar el balance
    calcularUtilidad();

    const balanceContainer = document.getElementById('balance-container');
    balanceContainer.innerHTML = '';

    const subtipoMap = catalogoCuentas.reduce((map, cuenta) => {
        map[cuenta.codigo] = cuenta.subtipo;
        return map;
    }, {});

    catalogoCuentas.forEach(cuenta => {
        // Excluir cuentas de depreciación acumulada
        if (cuenta.codigo.match(/^1\.2\.[9-9][0-9]$/)) return;
        if (cuenta.tipo === 'ingresos' || cuenta.tipo === 'gastos') return;

        let saldo;
        if (cuenta.tipo === 'activo') {
            saldo = obtenerActivoConDepreciacion(cuenta);
            if (saldo <= 0) return; // No mostrar activos totalmente depreciados
        } else {
            saldo = obtenerSaldoCuenta(cuenta.codigo);
        }

        if (saldo !== 0) {
            const subtipo = subtipoMap[cuenta.codigo];
            saldo = Math.abs(saldo);
            
            if (cuenta.tipo === 'activo') {
                if (subtipo === 'circulante') {
                    balanceData.activo.circulante.push({ cuenta, saldo });
                } else if (subtipo === 'noCirculante') {
                    balanceData.activo.noCirculante.push({ cuenta, saldo });
                }
            } else if (cuenta.tipo === 'pasivo' || cuenta.tipo === 'capital') {
                if (cuenta.tipo === 'pasivo') {
                    if (subtipo === 'cortoPlazo' || cuenta.nombre.includes('IVA')) {
                        balanceData.pasivo.cortoPlazo.push({ cuenta, saldo });
                    } else if (subtipo === 'largoPlazo') {
                        balanceData.pasivo.largoPlazo.push({ cuenta, saldo });
                    }
                } else {
                    if (subtipo === 'contribuido') {
                        balanceData.capital.contribuido.push({ cuenta, saldo });
                    } else if (subtipo === 'ganado') {
                        balanceData.capital.ganado.push({ cuenta, saldo });
                    }
                }
            }
        }
    });

    // Agregar utilidad/pérdida al capital
    const utilidadNeta = utilidadNetaTotal();
    balanceData.capital.ganado.push({
        cuenta: {
            codigo: '3.2.1',
            nombre: utilidadNeta >= 0 ? 'Utilidad del Ejercicio' : 'Pérdida del Ejercicio',
            tipo: 'capital',
            subtipo: 'ganado'
        },
        saldo: Math.abs(utilidadNeta)
    });
    console.log("Balance General", balanceData);

    // Crear la tabla principal
    const tabla = document.createElement('table');
    tabla.className = 'tabla-balance-general';
    
    // Crear el encabezado principal
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
                    <div id="columna-activo" class="columna-balance">
                        <div class="encabezado-seccion">Activo Circulante</div>
                        <div id="activo-circulante-body" class="cuerpo-seccion"></div>
                        <div class="encabezado-seccion encabezado-secundario">Activo No Circulante</div>
                        <div id="activo-no-circulante-body" class="cuerpo-seccion"></div>
                    </div>
                </td>
                <td>
                    <div id="columna-pasivo" class="columna-balance">
                        <div class="encabezado-seccion">Pasivo Corto Plazo</div>
                        <div id="pasivo-corto-plazo-body" class="cuerpo-seccion"></div>
                        <div class="encabezado-seccion encabezado-secundario">Pasivo Largo Plazo</div>
                        <div id="pasivo-largo-plazo-body" class="cuerpo-seccion"></div>
                    </div>
                </td>
                <td>
                    <div id="columna-capital" class="columna-balance">
                        <div class="encabezado-seccion">Capital Contribuido</div>
                        <div id="capital-contribuido-body" class="cuerpo-seccion"></div>
                        <div class="encabezado-seccion encabezado-secundario">Capital Ganado</div>
                        <div id="capital-ganado-body" class="cuerpo-seccion"></div>
                    </div>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th id="total-activo" class="text-right"></th>
                <th id="total-pasivo" class="text-right"></th>
                <th id="total-capital" class="text-right"></th>
            </tr>
            <tr>
                <th>Total</th>
                <th colspan="2" id="total-pasivo-capital" class="text-right"></th>
            </tr>
        </tfoot>
    `;

    balanceContainer.appendChild(tabla);

    function obtenerSaldoAjustado(cuenta, saldo) {
        const ajustesGastos = {
            'Rentas Pagadas por Anticipado': () => {
                const ajusteRenta = obtenerSaldoCuenta('4.1.7'); // Gastos de Administración (incluye Gastos Generales)
                return saldo - ajusteRenta;
            },
            'Papelería y Útiles': () => {
                const ajustePapeleria = obtenerSaldoCuenta('4.1.7'); // Gastos de Administración (incluye Gastos Generales)
                return saldo - ajustePapeleria;
            },
            'Primas de Seguro': () => {
                const ajusteSeguro = obtenerSaldoCuenta('4.1.7'); // Gastos de Administración
                return saldo - ajusteSeguro;
            }
        };

        if (ajustesGastos.hasOwnProperty(cuenta.nombre)) {
            return ajustesGastos[cuenta.nombre]();
        }

        return obtenerActivoConDepreciacion(cuenta, saldo);
    }

    // Función para llenar una sección con cuentas
    function llenarSeccion(datos, contenedorId) {
        const contenedor = document.getElementById(contenedorId);
        let totalSeccion = 0;
        
        datos.forEach(({ cuenta, saldo }) => {
            const saldoFinal = cuenta.tipo === 'activo' ? 
                obtenerSaldoAjustado(cuenta, saldo) : saldo;
            
            const fila = document.createElement('div');
            fila.className = 'fila-cuenta';
            
            const nombreCuenta = document.createElement('span');
            nombreCuenta.className = 'nombre-cuenta';
            nombreCuenta.textContent = cuenta.nombre;
            
            const saldoCuenta = document.createElement('span');
            saldoCuenta.className = 'saldo-cuenta';
            saldoCuenta.textContent = formatearNumero(Math.abs(saldoFinal));
            
            fila.appendChild(nombreCuenta);
            fila.appendChild(saldoCuenta);
            contenedor.appendChild(fila);
            
            totalSeccion += saldoFinal;
        });
        
        return totalSeccion;
    }
    // Llenar las secciones con datos
    let totalActivo = 0;
    let totalPasivo = 0;
    let totalCapital = 0;

    totalActivo += llenarSeccion(balanceData.activo.circulante, 'activo-circulante-body');
    totalActivo += llenarSeccion(balanceData.activo.noCirculante, 'activo-no-circulante-body');
    
    totalPasivo += llenarSeccion(balanceData.pasivo.cortoPlazo, 'pasivo-corto-plazo-body');
    totalPasivo += llenarSeccion(balanceData.pasivo.largoPlazo, 'pasivo-largo-plazo-body');
    
    totalCapital += llenarSeccion(balanceData.capital.contribuido, 'capital-contribuido-body');
    totalCapital += llenarSeccion(balanceData.capital.ganado, 'capital-ganado-body');

    // Actualizar totales
    document.getElementById('total-activo').textContent = `Total Activo: ${formatearNumero(Math.abs(totalActivo))}`;
    document.getElementById('total-pasivo').textContent = `Total Pasivo: ${formatearNumero(Math.abs(totalPasivo))}`;
    document.getElementById('total-capital').textContent = `Total Capital: ${formatearNumero(Math.abs(totalCapital))}`;
    
    const totalPasivoCapital = totalPasivo + totalCapital;
    document.getElementById('total-pasivo-capital').textContent = `Total Pasivo + Capital: ${formatearNumero(Math.abs(totalPasivoCapital))}`;
    
    // Añadir CSS para el alineamiento
    const style = document.createElement('style');
    style.textContent = `
        .tabla-balance-general {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #ddd;
        }
        
        .tabla-balance-general th, .tabla-balance-general td {
            border: 1px solid #ddd;
            padding: 8px;
            vertical-align: top;
        }
        
        .titulo-principal {
            text-align: center;
            font-size: 1.2em;
            background-color: #f5f5f5;
        }
        
        .columna-balance {
            display: flex;
            flex-direction: column;
            width: 100%;
        }
        
        .encabezado-seccion {
            font-weight: bold;
            background-color: #f0f0f0;
            padding: 5px;
            text-align: center;
            border-bottom: 1px solid #ddd;
        }
        
        .encabezado-secundario {
            margin-top: auto;
        }
        
        .cuerpo-seccion {
            display: flex;
            flex-direction: column;
            padding: 5px 0;
        }
        
        .fila-cuenta {
            display: flex;
            justify-content: space-between;
            padding: 3px 5px;
        }
        
        .saldo-cuenta {
            text-align: right;
            margin-left: 10px;
        }
        
        .text-right {
            text-align: right;
        }
    `;
    
    document.head.appendChild(style);

    // Alinear los encabezados secundarios
    alinearEncabezados();
}

// Función para alinear los encabezados después de que todo esté renderizado
function alinearEncabezados() {
    // Esperar a que el DOM se actualice
    setTimeout(() => {
        const columnas = document.querySelectorAll('.columna-balance');
        const encabezadosSecundarios = document.querySelectorAll('.encabezado-secundario');
        
        // Encontrar la altura máxima del contenido de la primera sección
        let maxAlturaPrimeraSeccion = 0;
        
        columnas.forEach(columna => {
            const primeraSeccion = columna.querySelector('.cuerpo-seccion');
            const altura = primeraSeccion.offsetHeight + primeraSeccion.previousElementSibling.offsetHeight;
            maxAlturaPrimeraSeccion = Math.max(maxAlturaPrimeraSeccion, altura);
        });
        
        // Ajustar la posición de los encabezados secundarios
        columnas.forEach(columna => {
            const primeraSeccion = columna.querySelector('.cuerpo-seccion');
            const alturaActual = primeraSeccion.offsetHeight + primeraSeccion.previousElementSibling.offsetHeight;
            const diferencia = maxAlturaPrimeraSeccion - alturaActual;
            
            if (diferencia > 0) {
                const encabezadoSecundario = columna.querySelector('.encabezado-secundario');
                encabezadoSecundario.style.marginTop = `${diferencia}px`;
            }
        });
    }, 0);
}
