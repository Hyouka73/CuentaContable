export let catalogoCuentas = [
    { codigo: '1.1.1', nombre: 'Caja', tipo: 'activo', subtipo: 'circulante' },
    { codigo: '1.1.2', nombre: 'Fondo Fijo de Caja Chica', tipo: 'activo', subtipo: 'circulante' },
    { codigo: '1.1.3', nombre: 'Bancos', tipo: 'activo', subtipo: 'circulante' },
    { codigo: '1.1.4', nombre: 'Inversiones Temporales', tipo: 'activo', subtipo: 'circulante' },
    { codigo: '1.1.5', nombre: 'Mercancías/Inventarios/Almacén', tipo: 'activo', subtipo: 'circulante' },
    { codigo: '1.1.6', nombre: 'Clientes', tipo: 'activo', subtipo: 'circulante' },
    { codigo: '1.1.7', nombre: 'Documentos por Cobrar', tipo: 'activo', subtipo: 'circulante' },
    { codigo: '1.1.8', nombre: 'Deudores', tipo: 'activo', subtipo: 'circulante' },
    { codigo: '1.1.9', nombre: 'Anticipo a Proveedores', tipo: 'activo', subtipo: 'circulante' },
    { codigo: '1.1.10', nombre: 'IVA Acreditable', tipo: 'activo', subtipo: 'circulante' },
    { codigo: '1.1.11', nombre: 'IVA por Acreditar', tipo: 'activo', subtipo: 'circulante' },
    { codigo: '1.2.1', nombre: 'Terrenos', tipo: 'activo', subtipo: 'noCirculante' },
    { codigo: '1.2.2', nombre: 'Edificios', tipo: 'activo', subtipo: 'noCirculante' },
    { codigo: '1.2.3', nombre: 'Mobiliario y Equipo', tipo: 'activo', subtipo: 'noCirculante' },
    { codigo: '1.2.4', nombre: 'Equipo de Cómputo Electrónico', tipo: 'activo', subtipo: 'noCirculante' },
    { codigo: '1.2.5', nombre: 'Equipo de Entrega y Reparto', tipo: 'activo', subtipo: 'noCirculante' },
    { codigo: '1.2.6', nombre: 'Equipo de Transporte', tipo: 'activo', subtipo: 'noCirculante' },
    { codigo: '1.2.7', nombre: 'Depósitos en Garantía', tipo: 'activo', subtipo: 'noCirculante' },
    { codigo: '1.2.8', nombre: 'Herramientas', tipo: 'activo', subtipo: 'noCirculante' },
    { codigo: '1.2.9', nombre: 'Depreciación Acumulada de Edificios', tipo: 'activo', subtipo: 'noCirculante' },
    { codigo: '1.2.10', nombre: 'Depreciación Acumulada de Mobiliario y Equipo', tipo: 'activo', subtipo: 'noCirculante' },
    { codigo: '1.2.11', nombre: 'Depreciación Acumulada de Equipo de Cómputo', tipo: 'activo', subtipo: 'noCirculante' },
    { codigo: '1.2.12', nombre: 'Depreciación Acumulada de Equipo de Transporte', tipo: 'activo', subtipo: 'noCirculante' },
    { codigo: '1.2.13', nombre: 'Depreciación Acumulada de Herramientas', tipo: 'activo', subtipo: 'noCirculante' },
    { codigo: '1.2.14', nombre: 'Depreciación Acumulada de Maquinaria', tipo: 'activo', subtipo: 'noCirculante' },
    { codigo: '1.2.15', nombre: 'Maquinaria', tipo: 'activo', subtipo: 'noCirculante' },
    { codigo: '1.2.16', nombre: 'Depreciación Acumulada de Propaganda y Publicidad', tipo: 'activo', subtipo: 'noCirculante' },
    { codigo: '1.3.1', nombre: 'Papelería y Útiles', tipo: 'activo', subtipo: 'noCirculante' },
    { codigo: '1.3.2', nombre: 'Propaganda y Publicidad', tipo: 'activo', subtipo: 'noCirculante' },
    { codigo: '1.3.3', nombre: 'Primas de Seguro', tipo: 'activo', subtipo: 'noCirculante' },
    { codigo: '1.3.4', nombre: 'Rentas Pagadas por Anticipado', tipo: 'activo', subtipo: 'noCirculante' },
    { codigo: '1.3.5', nombre: 'Intereses Pagados por Anticipado', tipo: 'activo', subtipo: 'noCirculante' },
    { codigo: '2.1.1', nombre: 'Proveedores', tipo: 'pasivo', subtipo: 'cortoPlazo' },
    { codigo: '2.1.2', nombre: 'Documentos por Pagar', tipo: 'pasivo', subtipo: 'cortoPlazo' },
    { codigo: '2.1.3', nombre: 'Acreedores', tipo: 'pasivo', subtipo: 'cortoPlazo' },
    { codigo: '2.1.4', nombre: 'Acreedores Bancarios', tipo: 'pasivo', subtipo: 'cortoPlazo' },
    { codigo: '2.1.5', nombre: 'Anticipo de Clientes', tipo: 'pasivo', subtipo: 'cortoPlazo' },
    { codigo: '2.1.6', nombre: 'Impuestos y Derechos por Pagar', tipo: 'pasivo', subtipo: 'cortoPlazo' },
    { codigo: '2.1.7', nombre: 'Acreedores Hipotecarios', tipo: 'pasivo', subtipo: 'largoPlazo' },
    { codigo: '2.1.8', nombre: 'Rentas Cobradas por Anticipado', tipo: 'pasivo', subtipo: 'cortoPlazo' },
    { codigo: '2.1.9', nombre: 'Intereses Cobrados por Anticipado', tipo: 'pasivo', subtipo: 'cortoPlazo' },
    { codigo: '3.1.1', nombre: 'Capital Social', tipo: 'capital', subtipo: 'contribuido' },
    { codigo: '3.1.2', nombre: 'Aportaciones para Futuros Aumentos de Capital', tipo: 'capital', subtipo: 'contribuido' },
    { codigo: '3.1.3', nombre: 'Utilidad Neta del Ejercicio', tipo: 'capital', subtipo: 'ganado' },
    { codigo: '3.1.4', nombre: 'Pérdida Neta del Ejercicio', tipo: 'capital', subtipo: 'ganado' },
    { codigo: '3.1.5', nombre: 'Utilidades Acumuladas', tipo: 'capital', subtipo: 'ganado' },
    { codigo: '3.1.6', nombre: 'Pérdidas Acumuladas', tipo: 'capital', subtipo: 'ganado' },
    { codigo: '3.1.7', nombre: 'Reserva Legal', tipo: 'capital', subtipo: 'ganado' },
    { codigo: '4.1.1', nombre: 'Compras', tipo: 'gastos' },
    { codigo: '4.1.2', nombre: 'Gastos de Compra', tipo: 'gastos' },
    { codigo: '4.1.3', nombre: 'Devoluciones sobre Venta', tipo: 'gastos' },
    { codigo: '4.1.4', nombre: 'Rebajas sobre Ventas', tipo: 'gastos' },
    { codigo: '4.1.5', nombre: 'Descuentos sobre Venta', tipo: 'gastos' },
    { codigo: '4.1.6', nombre: 'Gastos de Venta', tipo: 'gastos' },
    { codigo: '4.1.7', nombre: 'Gastos de Administración', tipo: 'gastos' },
    { codigo: '4.1.8', nombre: 'Otros Gastos', tipo: 'gastos' },
    { codigo: '4.1.9', nombre: 'Pérdidas por Deterioro de Activos', tipo: 'gastos' },
    { codigo: '4.1.10', nombre: 'Gastos Generales', tipo: 'gastos' },
    { codigo: '4.1.13', nombre: 'Costo de Ventas', tipo: 'gastos' },
    { codigo: '5.1.1', nombre: 'Ventas', tipo: 'ingresos' },
    { codigo: '5.1.2', nombre: 'Devoluciones sobre Compra', tipo: 'ingresos' },
    { codigo: '5.1.3', nombre: 'Rebajas sobre Compra', tipo: 'ingresos' },
    { codigo: '5.1.4', nombre: 'Descuentos sobre Compra', tipo: 'ingresos' },
    { codigo: '5.1.5', nombre: 'Otros Ingresos', tipo: 'ingresos' },
    { codigo: '5.1.6', nombre: 'IVA Trasladado', tipo: 'pasivo', subtipo: 'cortoPlazo' },
    { codigo: '5.1.7', nombre: 'IVA por Trasladar', tipo: 'pasivo', subtipo: 'cortoPlazo' }
];

export function buscarCuentasPorCodigo(codigo) {
    if (!codigo) return catalogoCuentas; // Si no hay código, retornar todas
    
    const codigoLower = codigo.toLowerCase();
    return catalogoCuentas.filter(cuenta => 
        cuenta.codigo.toLowerCase().includes(codigoLower)
    );
}

export function buscarCuentasPorNombre(nombre) {
    if (!nombre) return catalogoCuentas; // Si no hay nombre, retornar todas
    
    const nombreLower = nombre.toLowerCase();
    return catalogoCuentas.filter(cuenta => 
        cuenta.nombre.toLowerCase().includes(nombreLower)
    );
}

export function actualizarCatalogoCuentas(codigo = '', nombre = '') {
    const catalogoContainer = document.getElementById('catalogo-container');
    catalogoContainer.innerHTML = '';
    
    const tiposCuenta = {
        'activo': 'Activo',
        'pasivo': 'Pasivo',
        'capital': 'Capital',
        'ingresos': 'Ingresos',
        'gastos': 'Gastos'
    };

    // Aplicar filtros en cascada
    let cuentasFiltradas = catalogoCuentas;
    
    if (codigo) {
        cuentasFiltradas = buscarCuentasPorCodigo(codigo);
    }
    
    if (nombre) {
        // Si ya hay un filtro por código, filtrar sobre ese resultado
        cuentasFiltradas = cuentasFiltradas.filter(cuenta => 
            cuenta.nombre.toLowerCase().includes(nombre.toLowerCase())
        );
    }

    // Si no hay cuentas que coincidan, mostrar mensaje
    if (cuentasFiltradas.length === 0) {
        const mensaje = document.createElement('div');
        mensaje.className = 'mensaje-busqueda';
        mensaje.textContent = 'No se encontraron cuentas que coincidan con la búsqueda.';
        catalogoContainer.appendChild(mensaje);
        return;
    }

    // Agrupar por tipo de cuenta
    for (const [tipo, titulo] of Object.entries(tiposCuenta)) {
        const cuentasTipo = cuentasFiltradas.filter(cuenta => cuenta.tipo === tipo);
        
        if (cuentasTipo.length > 0) {
            const grupo = document.createElement('div');
            grupo.className = 'cuenta-group';
            
            const header = document.createElement('div');
            header.className = 'cuenta-header';
            header.textContent = `Cuentas de ${titulo}`;
            
            const tabla = document.createElement('table');
            tabla.className = 'tabla-cuentas';
            tabla.innerHTML = `
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    ${cuentasTipo.map(cuenta => `
                        <tr>
                            <td>${cuenta.codigo}</td>
                            <td>${cuenta.nombre}</td>
                        </tr>
                    `).join('')}
                </tbody>
            `;
            
            grupo.appendChild(header);
            grupo.appendChild(tabla);
            catalogoContainer.appendChild(grupo);
        }
    }
}

export function actualizarSeleccionCuentas() {
    const cuentaSelects = document.querySelectorAll('.cuenta-select');
    
    cuentaSelects.forEach(select => {
        const valorActual = select.value;
        select.innerHTML = '';
        
        const opcionVacia = document.createElement('option');
        opcionVacia.value = '';
        opcionVacia.textContent = 'Seleccionar cuenta...';
        select.appendChild(opcionVacia);
        
        // Función de comparación personalizada
        const cuentasOrdenadas = [...catalogoCuentas].sort((a, b) => {
            const partesA = a.codigo.split('.').map(Number);
            const partesB = b.codigo.split('.').map(Number);
            
            for (let i = 0; i < Math.max(partesA.length, partesB.length); i++) {
                const parteA = partesA[i] || 0;
                const parteB = partesB[i] || 0;
                
                if (parteA < parteB) return -1;
                if (parteA > parteB) return 1;
            }
            
            return 0;
        });
        
        const tipos = {
            'activo': 'Activo',
            'pasivo': 'Pasivo',
            'capital': 'Capital',
            'ingresos': 'Ingresos',
            'gastos': 'Gastos'
        };
        
        for (const [tipo, titulo] of Object.entries(tipos)) {
            const cuentasTipo = cuentasOrdenadas.filter(cuenta => cuenta.tipo === tipo);
            
            if (cuentasTipo.length > 0) {
                const grupo = document.createElement('optgroup');
                grupo.label = `Cuentas de ${titulo}`;
                
                cuentasTipo.forEach(cuenta => {
                    const opcion = document.createElement('option');
                    opcion.value = cuenta.codigo;
                    opcion.textContent = `${cuenta.codigo} - ${cuenta.nombre}`;
                    grupo.appendChild(opcion);
                });
                
                select.appendChild(grupo);
            }
        }
        
        if (valorActual) {
            select.value = valorActual;
        }
    });
}

export function agregarCuenta() {
    const codigo = document.getElementById('nueva-cuenta-codigo').value.trim();
    const nombre = document.getElementById('nueva-cuenta-nombre').value.trim();
    const tipo = document.getElementById('nueva-cuenta-tipo').value;
    
    if (!codigo || !nombre) {
        alert('Por favor ingrese código y nombre para la nueva cuenta.');
        return;
    }
    
    if (catalogoCuentas.some(c => c.codigo === codigo)) {
        alert('El código de cuenta ya existe.');
        return;
    }
    
    catalogoCuentas.push({ codigo, nombre, tipo });
    actualizarCatalogoCuentas();
    actualizarSeleccionCuentas();
    
    document.getElementById('nueva-cuenta-codigo').value = '';
    document.getElementById('nueva-cuenta-nombre').value = '';
}

export function inicializarBusquedaCatalogo() {
    const inputBusquedaCodigo = document.getElementById('busqueda-codigo');
    const inputBusquedaNombre = document.getElementById('busqueda-nombre');
    const btnBuscar = document.getElementById('btn-buscar');
    const btnLimpiar = document.getElementById('btn-limpiar');
    
    // Función para realizar la búsqueda
    function realizarBusqueda() {
        const codigo = inputBusquedaCodigo.value.trim();
        const nombre = inputBusquedaNombre.value.trim();
        
        // Actualizar catálogo con los filtros
        actualizarCatalogoCuentas(codigo, nombre);
    }
    
    // Función para limpiar la búsqueda
    function limpiarBusqueda() {
        inputBusquedaCodigo.value = '';
        inputBusquedaNombre.value = '';
        actualizarCatalogoCuentas(); // Sin parámetros para mostrar todo
    }
    
    // Evento para el botón de búsqueda
    if (btnBuscar) {
        btnBuscar.addEventListener('click', realizarBusqueda);
    }
    
    // Evento para el botón de limpiar
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', limpiarBusqueda);
    }
    
    // Eventos para buscar al presionar Enter en los inputs
    if (inputBusquedaCodigo) {
        inputBusquedaCodigo.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                realizarBusqueda();
            }
        });
    }
    
    if (inputBusquedaNombre) {
        inputBusquedaNombre.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                realizarBusqueda();
            }
        });
    }
}