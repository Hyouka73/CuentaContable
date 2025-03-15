import { actualizarSeleccionCuentas } from './catalogoCuentas.js';
import { formatearNumero, mostrarError, mostrarExito } from './utils.js';
import { catalogoCuentas } from './catalogoCuentas.js';
import { agregarFilaOperacion, configurarBotonesEliminar, configurarInputsDebeHaber, guardarOperacion, limpiarFormulario } from './registroOperaciones.js';
import { actualizarCuentasT } from './cuentasT.js';
import { actualizarBalanza } from './balanza.js';

export let operaciones = [
    {
        "indice": 1,
        "fecha": "2025-01-01",
        "descripcion": "Inicio de operaciones",
        "detalle": [
            {
                "cuenta": "1.1.1",
                "debe": 1000000,
                "haber": 0
            },
            {
                "cuenta": "1.2.1",
                "debe": 700000,
                "haber": 0
            },
            {
                "cuenta": "1.2.2",
                "debe": 200000,
                "haber": 0
            },
            {
                "cuenta": "1.2.8",
                "debe": 325000,
                "haber": 0
            },
            {
                "cuenta": "3.1.1",
                "debe": 0,
                "haber": 2225000
            }
        ]
    },
    {
        "indice": 2,
        "fecha": "2025-01-02",
        "descripcion": "Compra en efectivo",
        "detalle": [
            {
                "cuenta": "1.1.5",
                "debe": 6465.51,
                "haber": 0
            },
            {
                "cuenta": "1.1.10",
                "debe": 1034.49,
                "haber": 0
            },
            {
                "cuenta": "1.1.1",
                "debe": 0,
                "haber": 7500
            }
        ]
    },
    {
        "indice": 3,
        "fecha": "2025-01-03",
        "descripcion": "Compra de mercancia crédito",
        "detalle": [
            {
                "cuenta": "1.1.5",
                "debe": 5000,
                "haber": 0
            },
            {
                "cuenta": "1.1.10",
                "debe": 800,
                "haber": 0
            },
            {
                "cuenta": "2.1.1",
                "debe": 0,
                "haber": 5800
            }
        ]
    },
    {
        "indice": 4,
        "fecha": "2025-01-12",
        "descripcion": "Compra parcial a crédito",
        "detalle": [
            {
                "cuenta": "1.1.5",
                "debe": 10948.28,
                "haber": 0
            },
            {
                "cuenta": "1.1.10",
                "debe": 344.83,
                "haber": 0
            },
            {
                "cuenta": "1.1.11",
                "debe": 1406.89,
                "haber": 0
            },
            {
                "cuenta": "1.1.1",
                "debe": 0,
                "haber": 2500
            },
            {
                "cuenta": "2.1.1",
                "debe": 0,
                "haber": 10200
            }
        ]
    },
    {
        "indice": 5,
        "fecha": "2025-01-15",
        "descripcion": "Rentas pagadas por anticipado",
        "detalle": [
            {
                "cuenta": "1.3.4",
                "debe": 2500,
                "haber": 0
            },
            {
                "cuenta": "1.1.10",
                "debe": 400,
                "haber": 0
            },
            {
                "cuenta": "1.1.1",
                "debe": 0,
                "haber": 2900
            }
        ]
    },
    {
        "indice": 6,
        "fecha": "2025-01-19",
        "descripcion": "Compra de papeleria",
        "detalle": [
            {
                "cuenta": "1.3.1",
                "debe": 500,
                "haber": 0
            },
            {
                "cuenta": "1.1.10",
                "debe": 80,
                "haber": 0
            },
            {
                "cuenta": "1.1.1",
                "debe": 0,
                "haber": 580
            }
        ]
    },
    {
        "indice": 7,
        "fecha": "2025-01-25",
        "descripcion": "Anticipo de clientes",
        "detalle": [
            {
                "cuenta": "1.1.1",
                "debe": 11484,
                "haber": 0
            },
            {
                "cuenta": "2.1.5",
                "debe": 0,
                "haber": 9900
            },
            {
                "cuenta": "5.1.6",
                "debe": 0,
                "haber": 1584
            }
        ]
    },{
        "indice": 8,
        "fecha": "2025-02-11",
        "descripcion": "Ventas",
        "detalle": [
            {
                "cuenta": "1.1.3",
                "debe": 24000,
                "haber": 0
            },
            {
                "cuenta": "5.1.1",
                "debe": 0,
                "haber": 20160
            },
            {
                "cuenta": "5.1.6",
                "debe": 0,
                "haber": 3840
            }
        ]
    },
    {
        "indice": 9,
        "fecha": "2025-02-11",
        "descripcion": "Costo de ventas",
        "detalle": [
            {
                "cuenta": "4.1.13",
                "debe": 8965.51,
                "haber": 0
            },
            {
                "cuenta": "1.1.5",
                "debe": 0,
                "haber": 8965.51
            }
        ]
    },
    {
        "indice": 10,
        "fecha": "2025-02-14",
        "descripcion": "Ajuste por la renta del mes",
        "detalle": [
            {
                "cuenta": "4.1.10",
                "debe": 2500,
                "haber": 0
            },
            {
                "cuenta": "1.3.4",
                "debe": 0,
                "haber": 2500
            }
        ]
    },
    {
        "indice": 11,
        "fecha": "2025-02-19",
        "descripcion": "Ajuste por el gasto de papelería",
        "detalle": [
            {
                "cuenta": "4.1.10",
                "debe": 250,
                "haber": 0
            },
            {
                "cuenta": "1.3.1",
                "debe": 0,
                "haber": 250
            }
        ]
    },
    {
        "indice": 12,
        "fecha": "2025-03-02",
        "descripcion": "Cancelacion del adelanto y venta a credito",
        "detalle": [
            {
                "cuenta": "1.1.6",
                "debe": 3516,
                "haber": 0
            },
            {
                "cuenta": "2.1.5",
                "debe": 9900,
                "haber": 0
            },
            {
                "cuenta": "5.1.6",
                "debe": 1584,
                "haber": 0
            },
            {
                "cuenta": "5.1.1",
                "debe": 0,
                "haber": 12931.03
            },
            {
                "cuenta": "5.1.6",
                "debe": 0,
                "haber": 1584
            },
            {
                "cuenta": "5.1.7",
                "debe": 0,
                "haber": 484.97
            }
        ]
    },
    {
        "indice": 13,
        "fecha": "2025-03-02",
        "descripcion": "Costo de lo vendido",
        "detalle": [
            {
                "cuenta": "4.1.13",
                "debe": 13448.28,
                "haber": 0
            },
            {
                "cuenta": "1.1.5",
                "debe": 0,
                "haber": 10948.28
            },
            {
                "cuenta": "1.1.5",
                "debe": 0,
                "haber": 2500
            }
        ]
    },
    {
        "indice": 14,
        "fecha": "2025-04-10",
        "descripcion": "Depreciación de activos",
        "detalle": [
            {
                "cuenta": "4.1.10",
                "debe": 7604.16,
                "haber": 0
            },
            {
                "cuenta": "1.2.9",
                "debe": 0,
                "haber": 833.34
            },
            {
                "cuenta": "1.2.13",
                "debe": 0,
                "haber": 6770.82
            }
        ]
    },
];

export let contadorIndice = operaciones.length; // Initialize contadorIndice based on initial operations

export function incrementarIndice() {
    contadorIndice++;
    return contadorIndice;
  }

export function mostrarOperaciones() {
    const operacionesContainer = document.getElementById('operaciones-container');
    operacionesContainer.innerHTML = '';
    
    // Comprobar si hay operaciones
    if (operaciones.length === 0) {
        operacionesContainer.innerHTML = '<p class="text-center">No hay operaciones registradas.</p>';
        return;
    }
    
    // Generar tabla para cada operación
    operaciones.forEach(op => {
        // Crear contenedor para la operación
        const operacionDiv = document.createElement('div');
        operacionDiv.className = 'operacion-item mb-4';
        
        // Crear cabecera con información general de la operación
        const headerDiv = document.createElement('div');
        headerDiv.className = 'operacion-header';
        headerDiv.innerHTML = `
            <strong>Operación ${op.indice}</strong> - ${op.fecha} - ${op.descripcion}
        `;
        
        // Crear tabla para los detalles de la operación
        const tabla = document.createElement('table');
        tabla.className = 'table table-bordered table-sm';
        
        // Crear encabezados de la tabla
        tabla.innerHTML = `
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Cuenta</th>
                    <th class="text-right">Debe</th>
                    <th class="text-right">Haber</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        
        const tbody = tabla.querySelector('tbody');
        
        // Añadir filas para cada detalle de la operación
        op.detalle.forEach(item => {
            // Buscar el nombre de la cuenta en el catálogo
            const infoCuenta = catalogoCuentas.find(c => c.codigo === item.cuenta);
            const nombreCuenta = infoCuenta ? infoCuenta.nombre : item.cuenta;
            
            const fila = document.createElement('tr');
            if (item.debe > 0) {
                fila.className = 'fila-debe';
            } else {
                fila.className = 'fila-haber';
            }
            
            fila.innerHTML = `
                <td>${op.fecha}</td>
                <td>${nombreCuenta}</td>
                <td class="text-right">${item.debe > 0 ? formatearNumero(item.debe) : ''}</td>
                <td class="text-right">${item.haber > 0 ? formatearNumero(item.haber) : ''}</td>
            `;
            
            tbody.appendChild(fila);
        });
        
        // Añadir fila con la descripción de la operación
        const filaDescripcion = document.createElement('tr');
        filaDescripcion.className = 'fila-descripcion';
        filaDescripcion.innerHTML = `
            <td colspan="4">${op.descripcion}</td>
        `;
        tbody.appendChild(filaDescripcion);
        
        // Ensamblar todo
        operacionDiv.appendChild(headerDiv);
        operacionDiv.appendChild(tabla);
        operacionesContainer.appendChild(operacionDiv);
    });
}