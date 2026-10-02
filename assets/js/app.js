/*
 * app.js — Render de datos, navegación e interacciones del informe.
 *
 * Sin dependencias, sin módulos y sin fetch: lee los objetos globales
 * window.PROYECTOS, window.CRONOGRAMA y window.GENERAL declarados en data/,
 * de modo que el sitio funciona en GitHub Pages y abierto desde el disco.
 *
 * Las funciones render* son puras: reciben datos y devuelven HTML con todo
 * el texto escapado. Solo las funciones montar* y las de interacción tocan
 * el DOM. Todo se expone en un único espacio de nombres: window.App.
 */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------
   * Constantes
   * ------------------------------------------------------------------- */

  const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
    'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const DIA_MS = 86400000;

  const CATEGORIAS = [
    { clave: 'frontend', etiqueta: 'Frontend', chip: 'chip--primario' },
    { clave: 'backend', etiqueta: 'Backend', chip: 'chip--oscuro' },
    { clave: 'bd', etiqueta: 'Base de datos', chip: 'chip--acento' },
    { clave: 'devops', etiqueta: 'Despliegue', chip: '' },
    { clave: 'herramienta', etiqueta: 'Herramientas', chip: '' }
  ];

  const TEORIA = [
    { clave: 'arquitectura', titulo: 'Patrón arquitectónico' },
    { clave: 'organizacion', titulo: 'Organización del código' },
    { clave: 'flujoPeticion', titulo: 'Recorrido de una petición' },
    { clave: 'autenticacion', titulo: 'Autenticación' },
    { clave: 'manejoErrores', titulo: 'Manejo de errores' },
    { clave: 'documentacionApi', titulo: 'Documentación de la API' }
  ];

  // Configuración visual de cada tema: rótulo de sección, título del índice
  // y tamaño/orden de su tarjeta en el mosaico de la portada.
  const TEMAS = {
    micrositios: { indice: 'Contenido', num: function (n) { return dos(n); }, teja: 'ancho-3', orden: 7, rueda: true },
    camina: { indice: 'En esta ficha', num: function (n) { return dos(n); }, teja: 'ancho-2', orden: 3 },
    neotomasino: { indice: 'Estaciones', num: function (n) { return 'Estación ' + dos(n); }, teja: 'ancho-2', orden: 1 },
    livinglab: { indice: 'Mapa', num: function (n) { return dos(n); }, teja: '', orden: 4 },
    reservalab: { indice: 'Ficha del proyecto', num: function (n) { return dos(n); }, teja: 'alto-2', orden: 2, rolesConIconos: true, rueda: true },
    nomina: { indice: 'En esta ficha', num: function (n) { return dos(n); }, teja: 'ancho-2', orden: 5 },
    mesas: { indice: 'En esta ficha', num: function (n) { return dos(n); }, teja: '', orden: 6, rolesConIconos: true, rueda: true },
    novedades: { indice: 'En esta ficha', num: function (n) { return dos(n); }, teja: '', orden: 99, rolesConIconos: true, rueda: true },
    docente: { indice: 'En esta ficha', num: function (n) { return dos(n); }, teja: 'ancho-3', orden: 6.5, rolesConIconos: true, rueda: true }
  };

  // Nombre visible de cada rol de Gestión Docente.
  const ROLES = { admin: 'Administrador', tutor: 'Tutor', docente: 'Docente' };

  // Iconos del riel de Gestión Docente, por etiqueta del menú real.
  const ICONOS_RIEL = {
    'Dashboard': '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
    'Mi panel': '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
    'Usuarios': '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
    'Facultades': '<path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6"/>',
    'Cursos': '<path d="M2 9l10-5 10 5-10 5-10-5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/>',
    'Mis cursos': '<path d="M2 9l10-5 10 5-10 5-10-5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/>',
    'Periodos y horas': '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    'Encuesta': '<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z"/>',
    'Trazabilidad': '<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
    'Catálogo de cursos': '<path d="M4 4h6a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H4zM20 4h-6a2 2 0 0 0-2 2v14a2 2 0 0 1 2-2h6z"/>',
    'Mis calificaciones': '<circle cx="12" cy="9" r="6"/><path d="M8.5 14 7 22l5-3 5 3-1.5-8"/>',
    'Mi perfil': '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    'Inicio': '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    'Calendario': '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18M8 14h2M14 14h2M8 17h2"/>',
    'Mis solicitudes': '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13l2 2 4-4"/>',
    'Reservas especiales': '<path d="m12 3 2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.4 6.8 19.1l1-5.8L3.5 9.2l5.9-.8z"/>',
    'Aprobaciones': '<path d="M20 6 9 17l-5-5"/>',
    'Historial de solicitudes': '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
    'Estadísticas': '<path d="M3 21h18"/><rect x="5" y="11" width="3" height="7" rx="1"/><rect x="10.5" y="6" width="3" height="12" rx="1"/><rect x="16" y="9" width="3" height="9" rx="1"/>',
    'Bitácora de uso': '<path d="M4 4h12a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z"/><path d="M8 9h7M8 13h7"/>',
    'Laboratorios': '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3"/><path d="M7.5 14h9"/>',
    'Servicios y equipos': '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
    'Divisiones y facultades': '<path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6"/>',
    'Espacios académicos': '<path d="M2 9l10-5 10 5-10 5-10-5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/>',
    'Periodos académicos': '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
    'Horarios académicos': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    'Nóminas': '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    'Consolidado': '<path d="M3 21h18"/><rect x="5" y="11" width="3" height="7" rx="1"/><rect x="10.5" y="6" width="3" height="12" rx="1"/><rect x="16" y="9" width="3" height="9" rx="1"/>',
    'Programas': '<path d="M2 9l10-5 10 5-10 5-10-5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/>',
    'Tarifas': '<circle cx="12" cy="12" r="9"/><path d="M15 9.5c-.5-1-1.6-1.5-3-1.5-1.7 0-3 .9-3 2s1.3 1.7 3 2 3 .9 3 2-1.3 2-3 2c-1.4 0-2.5-.5-3-1.5M12 6.5v11"/>',
    'Solicitudes': '<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z"/>',
    'Historial': '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l3 2"/>',
    'Mis programas': '<path d="M2 9l10-5 10 5-10 5-10-5z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/>',
    'Paleta': '<circle cx="12" cy="12" r="9"/><circle cx="8" cy="10" r="1.3"/><circle cx="12" cy="7.5" r="1.3"/><circle cx="16" cy="10" r="1.3"/><path d="M12 21a3 3 0 0 1 0-6h2a3 3 0 0 0 3-3"/>',
    'Archivo': '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
    'Cascada': '<rect x="3" y="3" width="8" height="5" rx="1.5"/><rect x="13" y="10" width="8" height="5" rx="1.5"/><rect x="13" y="17" width="8" height="4" rx="1.5"/><path d="M7 8v4.5h6M7 12.5V19h6"/>',
    'Escudo': '<path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    'Ojo': '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/><path d="M4 20 20 4"/>',
    'Capas': '<path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5"/>',
    'Carpetas': '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 11h18"/>',
    'Alerta': '<path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h16.9a2 2 0 0 0 1.7-3L13.6 3.9a2 2 0 0 0-3.3 0z"/><path d="M12 9v4M12 17h.01"/>',
    'Ingreso': '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/><circle cx="12" cy="16" r="1.5"/>',
    'Saldo': '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9 2h6"/>',
    'Reportes': '<path d="M3 21h18"/><rect x="5" y="11" width="3" height="7" rx="1"/><rect x="10.5" y="6" width="3" height="12" rx="1"/><rect x="16" y="9" width="3" height="9" rx="1"/>'
  };
  const TEMA_BASE = { indice: 'En esta ficha', num: function (n) { return dos(n); }, teja: '', orden: 99 };

  const EXTERNO = '<span class="sr-only"> (se abre en una pestaña nueva)</span>';

  /* ---------------------------------------------------------------------
   * Utilidades puras
   * ------------------------------------------------------------------- */

  // Escapa los caracteres especiales de HTML de cualquier valor.
  function esc(valor) {
    if (valor === null || valor === undefined) return '';
    return String(valor).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // Indica si un valor tiene información real (descarta "", null y plantillas vacías).
  function tieneContenido(v) {
    if (v === null || v === undefined) return false;
    if (typeof v === 'string') return v.trim() !== '';
    if (typeof v === 'number') return !Number.isNaN(v);
    if (typeof v === 'boolean') return v;
    if (Array.isArray(v)) return v.some(tieneContenido);
    if (typeof v === 'object') return Object.keys(v).some(function (k) { return tieneContenido(v[k]); });
    return false;
  }

  // Devuelve solo los elementos de un arreglo que tienen contenido.
  function conContenido(lista) { return Array.isArray(lista) ? lista.filter(tieneContenido) : []; }

  // Rellena con cero a la izquierda hasta dos cifras.
  function dos(n) { return String(n).padStart(2, '0'); }

  // Convierte "AAAA-MM-DD" o "30 de septiembre de 2026" en una fecha local.
  function aFecha(texto) {
    if (!tieneContenido(texto)) return null;
    const t = String(texto).trim().toLowerCase();
    let m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t);
    if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
    m = /^(\d{1,2})\s+de\s+([a-zñ]+)\s+(?:de\s+|del\s+)?(\d{4})$/.exec(t);
    if (m && MESES.indexOf(m[2]) !== -1) return new Date(+m[3], MESES.indexOf(m[2]), +m[1]);
    return null;
  }

  // Convierte una fecha en "AAAA-MM-DD".
  function aIso(f) { return f.getFullYear() + '-' + dos(f.getMonth() + 1) + '-' + dos(f.getDate()); }

  // Formatea una fecha como "14 de julio de 2026" (o devuelve el texto tal cual).
  function formatearFecha(texto) {
    const f = aFecha(texto);
    if (!f) return tieneContenido(texto) ? String(texto) : '';
    return f.getDate() + ' de ' + MESES[f.getMonth()] + ' de ' + f.getFullYear();
  }

  // Formatea una fecha corta como "14 jul".
  function fechaCorta(texto) {
    const f = aFecha(texto);
    return f ? f.getDate() + ' ' + MESES[f.getMonth()].slice(0, 3) : '';
  }

  // Formatea un periodo {inicio, fin} de la forma más compacta posible.
  function formatearPeriodo(p) {
    if (!p) return '';
    const a = aFecha(p.inicio);
    const b = aFecha(p.fin);
    if (a && b) {
      if (a.getFullYear() === b.getFullYear()) {
        if (a.getMonth() === b.getMonth()) return a.getDate() + '–' + b.getDate() + ' de ' + MESES[a.getMonth()] + ' de ' + a.getFullYear();
        return a.getDate() + ' de ' + MESES[a.getMonth()] + ' – ' + formatearFecha(p.fin);
      }
      return formatearFecha(p.inicio) + ' – ' + formatearFecha(p.fin);
    }
    if (a) return 'Desde el ' + formatearFecha(p.inicio);
    if (b) return 'Hasta el ' + formatearFecha(p.fin);
    return '';
  }

  // Formatea un número con coma decimal (es-CO).
  const formatoNumero = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 1 });
  function num(v) { return formatoNumero.format(v); }

  // Ruta relativa a la raíz del sitio, declarada en <body data-raiz>.
  function raiz() { return (document.body && document.body.getAttribute('data-raiz')) || './'; }

  // Resuelve una ruta interna sin permitir rutas absolutas ni esquemas peligrosos.
  function ruta(r, base) {
    if (!tieneContenido(r)) return '';
    if (/^(https?:|data:image\/)/i.test(r)) return r;
    if (/^[a-z][a-z0-9+.-]*:/i.test(r)) return '';
    return base + String(r).replace(/^\.?\/+/, '');
  }

  // Acepta solo URLs http(s) para enlaces externos.
  function urlExterna(u) { return /^https?:\/\//i.test(u || '') ? u : ''; }

  // Enlace externo que se abre en otra pestaña.
  function enlaceExterno(url, texto, clase) {
    const u = urlExterna(url);
    if (!u) return esc(texto);
    return '<a class="externo' + (clase ? ' ' + clase : '') + '" href="' + esc(u) + '" target="_blank" rel="noopener noreferrer">' + esc(texto) + EXTERNO + '</a>';
  }

  // Ruta de la página de un proyecto.
  function rutaProyecto(id, base) { return base + 'proyectos/' + encodeURIComponent(id) + '.html'; }

  // Convierte texto con líneas en blanco en párrafos.
  function parrafos(texto, clase) {
    if (!tieneContenido(texto)) return '';
    return String(texto).trim().split(/\n\s*\n/).map(function (p) {
      return '<p' + (clase ? ' class="' + clase + '"' : '') + '>' + esc(p.trim()) + '</p>';
    }).join('');
  }

  // Lista de chips; cada elemento puede ser texto o {texto, extra, clase}.
  function chips(items, claseBase, etiqueta) {
    const v = conContenido(items);
    if (!v.length) return '';
    return '<ul class="chips"' + (etiqueta ? ' aria-label="' + esc(etiqueta) + '"' : '') + '>' + v.map(function (i) {
      const o = typeof i === 'string' ? { texto: i } : i;
      return '<li class="chip' + (claseBase ? ' ' + claseBase : '') + (o.clase ? ' ' + o.clase : '') + '"' +
        (o.titulo ? ' title="' + esc(o.titulo) + '"' : '') + '>' + (o.logo || '') +
        (o.img ? '<img class="chip__logo" src="' + esc(o.img) + '" alt="" loading="lazy">' : '') + esc(o.texto) +
        (tieneContenido(o.extra) ? ' <small>' + esc(o.extra) + '</small>' : '') + '</li>';
    }).join('') + '</ul>';
  }

  // Lista <dl> de datos etiqueta/valor; omite los vacíos.
  function datos(pares) {
    const v = pares.filter(function (p) { return tieneContenido(p.valor); });
    if (!v.length) return '';
    return '<dl class="datos">' + v.map(function (p) {
      return '<div><dt>' + esc(p.etiqueta) + '</dt><dd>' + (p.codigo ? '<code>' + esc(p.valor) + '</code>' : esc(p.valor)) + '</dd></div>';
    }).join('') + '</dl>';
  }

  // Tabla con desplazamiento horizontal; columnas = [{clave, titulo, html, clase}].
  function tabla(filas, columnas, leyenda, pie) {
    const v = conContenido(filas);
    if (!v.length) return '';
    const cab = columnas.map(function (c) { return '<th scope="col"' + (c.clase ? ' class="' + c.clase + '"' : '') + '>' + esc(c.titulo) + '</th>'; }).join('');
    const cuerpo = v.map(function (f) {
      return '<tr>' + columnas.map(function (c, i) {
        const val = f[c.clave];
        const celda = tieneContenido(val) ? (c.html ? val : esc(val)) : '<span class="vacio">—</span>';
        const cl = c.clase ? ' class="' + c.clase + '"' : '';
        return i === 0 ? '<th scope="row"' + cl + '>' + celda + '</th>' : '<td' + cl + '>' + celda + '</td>';
      }).join('') + '</tr>';
    }).join('');
    return '<div class="tabla-scroll" role="region" tabindex="0" aria-label="' + esc(leyenda) + '"><table><caption class="sr-only">' +
      esc(leyenda) + '</caption><thead><tr>' + cab + '</tr></thead><tbody>' + cuerpo + '</tbody>' + (pie || '') + '</table></div>';
  }

  // Color de texto legible (oscuro o blanco) sobre un color de fondo hexadecimal.
  function textoSobre(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
    if (!m) return '#ffffff';
    const n = parseInt(m[1], 16);
    const canal = function (c) { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    const L = 0.2126 * canal(n >> 16 & 255) + 0.7152 * canal(n >> 8 & 255) + 0.0722 * canal(n & 255);
    return L > 0.35 ? '#0f1620' : '#ffffff';
  }

  // Ícono animado de Lordicon (si la página cargó lottie y assets/js/lordicons.js);
  // colores = { primary, secondary } en hexadecimal. Devuelve "" si no está disponible.
  function lordicon(nombre, colores, clase) {
    if (!nombre || !window.LORDICONS || !window.LORDICONS[nombre]) return '';
    const c = colores || {};
    const datos = ['primary', 'secondary'].filter(function (k) { return c[k]; }).map(function (k) { return k + ':' + c[k]; }).join(',');
    return '<span class="lordicon' + (clase ? ' ' + clase : '') + '" data-lordicon="' + esc(nombre) + '"' + (datos ? ' data-colores="' + esc(datos) + '"' : '') + ' aria-hidden="true"></span>';
  }

  // Proyectos de primer nivel: las fichas hijas (con "padre") se muestran
  // dentro de la ficha de su proyecto padre, no en el mosaico ni en el conteo.
  function principales(lista) { return (lista || []).filter(function (p) { return !p.padre; }); }

  // Configuración del tema de un proyecto.
  function tema(p) { return TEMAS[(p.identidad || {}).tema] || TEMA_BASE; }

  // Último día del último mes del cronograma.
  function finDeUltimoMes(meses) {
    const u = (meses || [])[meses.length - 1];
    if (!u) return null;
    const i = MESES.indexOf(String(u.mes).toLowerCase());
    return i === -1 ? null : new Date(u.anio, i + 1, 0);
  }

  /* ---------------------------------------------------------------------
   * Inicio (index.html)
   * ------------------------------------------------------------------- */

  // Barra de horas por mes, proporcional a la meta.
  function barraHoras(cron, colores) {
    const meta = cron.metaHoras || 0;
    const meses = (cron.meses || []).filter(function (m) { return m.horas > 0; });
    const restante = Math.max(meta - (cron.horasAcumuladas || 0), 0);
    return '<div class="barra-horas" role="img" aria-label="' + esc(meses.map(function (m) { return m.mes + ': ' + num(m.horas) + ' horas'; }).join('; ')) + '">' +
      meses.map(function (m, i) {
        return '<span style="flex:' + m.horas + ' 0 0;background:' + colores[i % colores.length] + '"></span>';
      }).join('') + (restante ? '<span style="flex:' + restante + ' 0 0"></span>' : '') + '</div>';
  }

  // Portada: textos, datos del informe y medidor de horas.
  function renderPortada(g, cron) {
    const sede = [g.institucion, g.seccional ? 'Seccional ' + g.seccional : '', g.anio].filter(tieneContenido).join(' · ');
    const pasantes = conContenido(g.pasantes).map(function (p) { return esc(p.nombre); }).join('<br>');
    const periodo = (g.periodo && g.periodo.texto) || formatearPeriodo(g.periodo);
    const meta = cron.metaHoras || 0;
    const hechas = cron.horasAcumuladas || 0;
    const pct = meta ? (hechas / meta) * 100 : 0;
    const mesesCorto = (cron.meses || []).map(function (m) { return '<span>' + esc(String(m.mes).slice(0, 3)) + '</span>'; }).join('');
    const total = principales(window.PROYECTOS).length;
    const extra = [
      { etiqueta: 'Programa académico', valor: g.programaAcademico },
      { etiqueta: 'Tutor empresarial', valor: (g.tutores || {}).empresarial },
      { etiqueta: 'Tutor académico', valor: (g.tutores || {}).academico }
    ].filter(function (d) { return tieneContenido(d.valor); });
    return '<div class="cabecera-oscura__aro" aria-hidden="true"></div>' +
      '<div class="contenedor portada__rejilla"><div>' +
      '<p class="antetitulo">' + esc(sede) + '</p>' +
      '<h1>' + esc(g.tituloInforme || 'Informe de pasantía') + '</h1>' +
      '<p class="portada__bajada">' + esc((total ? total + ' frentes de software' : '') + (tieneContenido(g.dependencia) ? ' para la ' + g.dependencia : '')) + '.</p>' +
      '<dl class="portada__datos">' +
      '<div><dt>Pasantes</dt><dd>' + pasantes + '</dd></div>' +
      '<div><dt>Dependencia</dt><dd>' + esc(g.dependencia) + '</dd></div>' +
      '<div><dt>Periodo</dt><dd>' + esc(periodo) + '</dd></div>' +
      extra.map(function (d) { return '<div><dt>' + esc(d.etiqueta) + '</dt><dd>' + esc(d.valor) + '</dd></div>'; }).join('') +
      '</dl></div>' +
      '<div class="medidor"><p class="medidor__rotulo">Horas cumplidas</p>' +
      '<p class="medidor__cifra"><strong>' + num(hechas) + '</strong><span> / ' + num(meta) + '</span></p>' +
      barraHoras(cron, ['#00336a', '#004f9f', '#009fe3', '#fdc300']) +
      '<div class="barra-horas__meses" aria-hidden="true">' + mesesCorto + '</div>' +
      '<p class="medidor__pie"><strong>' + num(pct) + ' %</strong> de la meta' + (meta > hechas ? ' · faltan ' + num(meta - hechas) + ' horas' : '') + '</p>' +
      '</div></div>';
  }

  // Cuatro cifras del periodo.
  function renderCifras(g, todos, cron) {
    const proyectos = principales(todos);
    const conEstado = proyectos.filter(function (p) { return tieneContenido(p.estado); });
    const prod = proyectos.filter(function (p) { return p.estado === 'En producción'; }).length;
    const items = [
      [num(cron.horasAcumuladas || 0) + ' h', 'de práctica registradas'],
      [String(proyectos.length), 'frentes de trabajo'],
      [tieneContenido((g.indicadores || {}).micrositiosIntervenidos) ? g.indicadores.micrositiosIntervenidos : '—', 'programas académicos intervenidos'],
      [conEstado.length ? String(prod) : '—', 'aplicaciones en producción' + (conEstado.length ? '' : ' (por confirmar)')]
    ];
    return items.map(function (i) { return '<div><dt>' + esc(i[1]) + '</dt><dd>' + esc(i[0]) + '</dd></div>'; }).join('');
  }

  // Teja del mosaico según el tema del proyecto.
  function teja(p, base) {
    const id = p.identidad || {};
    const t = id.tema;
    const href = esc(rutaProyecto(p.id, base));
    const rotulo = '<p class="teja__rotulo">' + esc([id.numero, id.etiqueta].filter(tieneContenido).join(' · ')) + '</p>';
    const nombre = '<h3 class="teja__nombre">' + esc(id.nombreCorto && t !== 'neotomasino' ? id.nombreCorto : p.nombre) + '</h3>';
    const periodo = formatearPeriodo(p.periodo);
    const ver = '<span>Ver ficha →</span>';
    const tecs = conContenido(p.tecnologias).filter(function (x) { return tieneContenido(x.nombre); });
    const tecCorta = function (x) { return x.nombre + (tieneContenido(x.version) && /^\d/.test(x.version) ? ' ' + String(x.version).split('.')[0] : ''); };
    const sellos = conContenido((p.extras || {}).sellos).filter(function (s) { return s.img; });
    const img = function (src, clase, alt) { return '<img class="' + clase + '" src="' + esc(ruta(src, base)) + '" alt="' + esc(alt || '') + '"' + (alt ? '' : ' aria-hidden="true"') + '>'; };
    let interior = '';

    if (t === 'neotomasino') {
      interior = '<div class="teja__sellos" aria-hidden="true">' + sellos.slice(0, 2).map(function (s) { return img(s.img, '', ''); }).join('') + '</div>' +
        '<div>' + rotulo + img('assets/img/marcas/neotomasino-bienvenido.png', 'teja__bienvenida', '¡Hola, Bienvenid@!') + nombre + '</div>' +
        '<div class="teja__pie"><ul class="teja__chips">' + tecs.filter(function (x) { return ['React', 'NestJS', 'MariaDB'].indexOf(x.nombre) !== -1; })
          .map(function (x) { return '<li>' + esc(tecCorta(x)) + '</li>'; }).join('') + '</ul><span>' + esc(periodo ? periodo + ' · ' : '') + 'Ver ficha →</span></div>';
    } else if (t === 'reservalab') {
      const ga = p.gestionAgil || {};
      interior = '<div>' + rotulo + nombre + '</div>' +
        '<div class="teja__app" aria-hidden="true"><div class="teja__riel"><span></span><span class="activo"></span><span></span><span></span></div>' +
        '<div class="teja__filas"><span><i style="background:#22c55e"></i><b></b></span><span><i style="background:#f59e0b"></i><b></b></span><span><i style="background:#ef4444"></i><b></b></span></div></div>' +
        (tieneContenido(ga.historiasUsuario) ? '<div class="teja__cifras"><p><strong>' + esc(ga.historiasUsuario) + '</strong><span>historias de usuario</span></p><p><strong>' + esc(ga.sprints) + '</strong><span>sprints</span></p></div>' : '') +
        '<div class="teja__pie">' + ver + '</div>';
    } else if (t === 'camina') {
      const frases = String(p.subtitulo || '').split(/(?<=\.)\s+/).filter(Boolean);
      interior = img('assets/img/marcas/camina-banner.png', 'teja__globo', '') +
        '<div>' + rotulo + img('assets/img/marcas/camina-logo-blanco.png', 'teja__logo', p.nombre) + '</div>' +
        '<p class="teja__lema">' + frases.slice(0, 2).map(function (f, i) { return i === 0 ? '<b>' + esc(f) + '</b>' : esc(f); }).join(' ') + '</p>';
    } else if (t === 'livinglab') {
      interior = '<div>' + rotulo + img('assets/img/rally-living-lab/titulo-mapa-de-soluciones.svg', 'teja__titulo-img', 'Festival Santoto Camina Living Lab: Mapa de soluciones') + nombre + '</div>' +
        '<div class="teja__sellos" aria-hidden="true">' + sellos.slice(0, 4).map(function (s) { return img(s.img, '', ''); }).join('') + '</div>' +
        '<div class="teja__pie">' + ver + '</div>';
    } else if (t === 'nomina') {
      const des = conContenido((p.extras || {}).desarrollos);
      interior = '<div>' + rotulo + nombre + '<p class="teja__desc">' + esc(p.subtitulo) + '</p></div>' +
        '<div class="teja__modulos">' + des.map(function (d) { return '<span><b>' + esc(d.modulo) + '</b><small>' + esc(d.nombre) + '</small></span>'; }).join('') + '</div>';
    } else if (t === 'mesas') {
      const ms = conContenido((p.extras || {}).mesas);
      interior = '<div>' + rotulo + nombre + '</div>' +
        '<div class="teja__portadas" aria-hidden="true">' + ms.map(function (m) {
          const c = m.colores || {};
          return '<span style="background:' + esc(c.fondo || '#00336a') + ';color:' + esc(c.texto || '#fff') + '"><i style="background:' + esc(c.acento || '#fdc300') + '"></i>' + esc(m.nombre) + '<small>' + conContenido(m.categorias).length + '</small></span>';
        }).join('') + '</div>' +
        '<div class="teja__pie">' + ver + '</div>';
    } else if (t === 'docente') {
      interior = '<div><p class="teja__marca">' + img('assets/img/marcas/gestion-docente-logo.png', '', '') + '<span><b>Gestión Docente</b><small>Santo Tomás · Tunja</small></span></p>' +
        rotulo + nombre + '<p class="teja__desc">' + esc(p.subtitulo) + '</p>' + pilaTecnologias(p, base, 'pila--mini') + '<p class="teja__pie">Ver ficha →</p></div>' +
        '<div class="teja__docente" aria-hidden="true"><div class="teja__saldo"><b>Mi saldo de horas</b><span class="medidor-docente"><i></i></span>' +
        '<span class="teja__marcas"><small>0h</small><small>mín.</small><small>máx.</small></span></div>' +
        '<div class="teja__cursos">' + ['#00336a', '#004f9f', '#009fe3'].map(function (c) {
          return '<span><i style="background:' + c + '"></i><b></b><b class="corta"></b></span>';
        }).join('') + '</div></div>';
    } else if (t === 'micrositios') {
      const tonos = ['#00336a', '#ffffff', '#004f9f', '#fdc300'];
      const n = (p.extras || {}).cantidadProgramas || String(((window.GENERAL || {}).indicadores || {}).micrositiosIntervenidos || '20').replace(/\D/g, '');
      const nSitios = conContenido((p.extras || {}).sitiosDetalle).length;
      interior = '<div>' + rotulo + nombre + '<p class="teja__pie">' + (nSitios ? nSitios + ' sitios en WordPress · más de ' + esc(n) + ' programas' : 'Más de ' + esc(n) + ' sitios intervenidos') + ' · Ver ficha →</p></div>' +
        '<div class="teja__mosaico" aria-hidden="true">' + Array.from({ length: 16 }, function (_, i) {
          return '<span style="background:' + tonos[(i * 5 + Math.floor(i / 8)) % 4] + '"></span>';
        }).join('') + '</div>';
    } else {
      interior = '<div>' + rotulo + nombre + '</div><div class="teja__pie">' + ver + '</div>';
    }
    return '<a class="teja teja--' + esc(t || 'base') + '" href="' + href + '">' + interior + '</a>';
  }

  // Mosaico de tarjetas, una por proyecto, con la identidad de cada uno.
  function renderTarjetasProyectos(proyectos, base) {
    const lista = principales(proyectos || window.PROYECTOS);
    const r = base || raiz();
    if (!lista.length) return '<p class="aviso">No hay proyectos registrados en data/proyectos.js.</p>';
    lista.sort(function (a, b) { return tema(a).orden - tema(b).orden; });
    // CAMINA y el Rally Living Lab comparten metodología: se muestran como una pareja conectada.
    const camina = lista.find(function (p) { return (p.identidad || {}).tema === 'camina'; });
    const rally = lista.find(function (p) { return (p.identidad || {}).tema === 'livinglab'; });
    let parejaHecha = false;
    return '<ul class="mosaico">' + lista.map(function (p) {
      const t = (p.identidad || {}).tema;
      if (camina && rally && (t === 'camina' || t === 'livinglab')) {
        if (parejaHecha) return '';
        parejaHecha = true;
        return '<li class="ancho-2">' + tejaPareja(camina, rally, r) + '</li>';
      }
      return '<li class="' + esc(tema(p).teja) + '">' + teja(p, r) + '</li>';
    }).join('') + '</ul>';
  }

  // Pareja conectada: CAMINA (la plataforma) y el Rally Living Lab (el festival), unidas por el acróstico.
  function tejaPareja(camina, rally, base) {
    const ic = camina.identidad || {};
    const ir = rally.identidad || {};
    const pasos = conContenido(((camina.extras || {}).acrostico || {}).pasos);
    const sellos = conContenido((rally.extras || {}).sellos).filter(function (s) { return s.img; });
    const img = function (src, clase, alt) {
      return '<img class="' + clase + '" src="' + esc(ruta(src, base)) + '" alt="' + esc(alt || '') + '"' + (alt ? '' : ' aria-hidden="true"') + '>';
    };
    const confeti = ['#E24B4A', '#EF9F27', '#F2D024', '#7FBF5A', '#C060C7', '#4A9FE0', '#2c56fc', '#b5d334', '#E24B4A', '#4A9FE0'];
    const rotulo = function (id) { return esc([id.numero, id.etiqueta].filter(tieneContenido).join(' · ')); };
    return '<div class="pareja">' +
      '<a class="pareja__mitad pareja__mitad--camina" href="' + esc(rutaProyecto(camina.id, base)) + '">' +
      img('assets/img/marcas/camina-banner.png', 'pareja__globo', '') +
      '<p class="pareja__rotulo">' + rotulo(ic) + '</p>' +
      img('assets/img/marcas/camina-logo-blanco.png', 'pareja__logo', camina.nombre) +
      (tieneContenido(ic.resumenTeja) ? '<p class="pareja__resumen">' + esc(ic.resumenTeja) + '</p>' : '') +
      '<span class="pareja__ver">Ver ficha →</span></a>' +
      '<a class="pareja__mitad pareja__mitad--rally" href="' + esc(rutaProyecto(rally.id, base)) + '">' +
      '<span class="pareja__pagina" aria-hidden="true"></span>' +
      sellos.slice(0, 6).map(function (s, i) { return img(s.img, 'pareja__sello-disperso pareja__sello-disperso--' + i, ''); }).join('') +
      confeti.map(function (c, i) { return '<span class="pareja__confeti pareja__confeti--' + i + '" style="background:' + c + '" aria-hidden="true"></span>'; }).join('') +
      '<p class="pareja__rotulo">' + rotulo(ir) + '</p>' +
      img('assets/img/rally-living-lab/titulo-mapa-de-soluciones.svg', 'pareja__festival', 'Festival Santoto Camina Living Lab: Mapa de soluciones') +
      '<span class="pareja__nombre">' + esc(rally.nombre) + '</span>' +
      (tieneContenido(ir.resumenTeja) ? '<p class="pareja__resumen">' + esc(ir.resumenTeja) + '</p>' : '') + '</a>' +
      (pasos.length ? '<div class="pareja__franja" aria-hidden="true">' + pasos.map(function (x) {
        return '<span style="background:' + esc(x.color) + ';color:' + esc(x.colorTexto || '#ffffff') + '">' + esc(x.letra) + '</span>';
      }).join('') + '</div>' : '') +
      '<span class="pareja__vinculo" aria-hidden="true">Misma<br>metodología</span>' +
      '</div>';
  }

  // Atajos a metodología y cronograma.
  function renderAtajos(cron, base) {
    const max = Math.max.apply(null, (cron.meses || []).map(function (m) { return m.horas || 0; }).concat([1]));
    return '<a class="atajo atajo--claro" href="' + esc(base) + 'metodologia.html"><p class="antetitulo">Marco de referencia</p><h3>Metodología</h3>' +
      '<p>Ciclo de vida, Scrum, GitHub Issues y Milestones, Git y Conventional Commits, arquitectura cliente-servidor y levantamiento de requerimientos.</p></a>' +
      '<a class="atajo atajo--oscuro" href="' + esc(base) + 'cronograma.html"><p class="antetitulo">Dedicación horaria</p><h3>Cronograma</h3>' +
      '<div class="atajo__barras" aria-hidden="true">' + (cron.meses || []).map(function (m) {
        return '<div><span style="height:' + Math.max(3, Math.round((m.horas / max) * 85)) + '%;' + (m.horas ? '' : 'background:rgb(255 255 255 / .15)') + '"></span><small>' + esc(String(m.mes).slice(0, 3)) + '</small></div>';
      }).join('') + '</div></a>';
  }

  // Índice general del informe.
  function renderIndiceInforme(todos, base) {
    const proyectos = principales(todos);
    const sub = proyectos.map(function (p) { return '<li><a href="' + esc(rutaProyecto(p.id, base)) + '">' + esc((p.identidad || {}).nombreCorto || p.nombre) + '</a></li>'; }).join('');
    const e = [
      [base + 'index.html#resumen', 'Resumen ejecutivo', 'Contexto de la pasantía y frentes de trabajo.'],
      [base + 'index.html#proyectos', 'Proyectos desarrollados', 'Ficha técnica de cada frente.', sub],
      [base + 'metodologia.html', 'Metodología', 'Marco teórico y metodológico común a los desarrollos.'],
      [base + 'cronograma.html', 'Cronograma', 'Dedicación horaria, línea de tiempo y diagrama de Gantt.'],
      [base + 'conclusiones.html', 'Resultados y conclusiones', 'Resultados, dificultades, conclusiones, recomendaciones y anexos.']
    ];
    return '<ol>' + e.map(function (x) {
      return '<li><a href="' + esc(x[0]) + '">' + esc(x[1]) + '</a><p>' + esc(x[2]) + '</p>' + (x[3] ? '<ol>' + x[3] + '</ol>' : '') + '</li>';
    }).join('') + '</ol>';
  }

  /* ---------------------------------------------------------------------
   * Fichas de proyecto: héroes por tema
   * ------------------------------------------------------------------- */

  // Migas de pan de la ficha.
  function migas(p, base) {
    const padre = p.padre && (window.PROYECTOS || []).find(function (x) { return x.id === p.padre; });
    return '<nav class="migas" aria-label="Ruta de navegación"><ol><li><a href="' + esc(base) + 'index.html">Inicio</a></li>' +
      '<li><a href="' + esc(base) + 'index.html#proyectos">Proyectos</a></li>' +
      (padre ? '<li><a href="' + esc(rutaProyecto(padre.id, base)) + '">' + esc((padre.identidad || {}).nombreCorto || padre.nombre) + '</a></li>' : '') + '<li><span aria-current="page">' + esc((p.identidad || {}).nombreCorto || p.nombre) + '</span></li></ol></nav>';
  }

  // Rótulo "Proyecto 03 · Estado".
  function rotuloProyecto(p) {
    return 'Proyecto ' + ((p.identidad || {}).numero || '') + (tieneContenido(p.estado) ? ' · ' + p.estado : '');
  }

  // Botones a producción y repositorios.
  function botones(p, clasePrincipal, claseSecundaria, extra) {
    const b = [];
    if (urlExterna(p.urlProduccion)) b.push(enlaceExterno(p.urlProduccion, 'Ver en producción', 'boton ' + clasePrincipal));
    const maxSitios = (p.extras || {}).botonesSitios || 3;
    conContenido((p.extras || {}).sitios).filter(function (x) { return urlExterna(x.url); }).slice(0, maxSitios).forEach(function (x, i) {
      b.push(enlaceExterno(x.url, 'Abrir ' + x.nombre, 'boton ' + (i === 0 && !urlExterna(p.urlProduccion) ? clasePrincipal : claseSecundaria)));
    });
    conContenido(p.repositorios).filter(function (r) { return urlExterna(r.url); }).forEach(function (r) {
      b.push(enlaceExterno(r.url, r.nombre || 'Repositorio', 'boton ' + claseSecundaria));
    });
    if (extra) b.push(extra);
    return b.length ? '<div class="hero__botones">' + b.join('') + '</div>' : '';
  }

  // Datos destacados del encabezado (periodo, solicitante, horas).
  function datosHero(p) {
    const d = [
      ['Periodo', formatearPeriodo(p.periodo)],
      ['Solicitante', p.solicitante],
      ['Dedicación', tieneContenido(p.horasAproximadas) ? num(p.horasAproximadas) + ' horas' : '']
    ].filter(function (x) { return tieneContenido(x[1]); });
    return d.length ? '<dl class="hero__datos">' + d.map(function (x) { return '<div><dt>' + esc(x[0]) + '</dt><dd>' + esc(x[1]) + '</dd></div>'; }).join('') + '</dl>' : '';
  }

  // Logos de las tecnologías marcadas como destacadas; "" si no hay.
  function pilaTecnologias(p, base, clase) {
    const t = conContenido(p.tecnologias).filter(function (x) { return x.destacada && x.logo; });
    if (!t.length) return '';
    return '<ul class="pila ' + (clase || '') + '"' + (clase === 'pila--mini' ? ' aria-hidden="true"' : ' aria-label="Tecnologías principales"') + '>' + t.map(function (x) {
      return '<li title="' + esc(x.nombre) + '"><img src="' + esc(ruta(x.logo, base)) + '" alt=""><span>' + esc(x.nombre) + '</span></li>';
    }).join('') + '</ul>';
  }

  const HEROES = {
    // Micrositios: el navegador con una pestaña por sitio y su captura real.
    micrositios: function (p, base) {
      const sitios = conContenido((p.extras || {}).sitiosDetalle);
      const demo = sitios.length ? '<div class="app-demo">' +
        '<div class="app-demo__pestanas" role="tablist" aria-label="Sitios con mantenimiento">' + sitios.map(function (x, i) {
          return '<button type="button" role="tab" id="vista-' + i + '" aria-controls="panel-vista-' + i + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' + esc(x.nombre) + '</button>';
        }).join('') + '</div>' +
        '<div class="app-demo__ventana">' + sitios.map(function (x, i) {
          return '<div class="app-demo__vista app-demo__vista--web" role="tabpanel" id="panel-vista-' + i + '" aria-labelledby="vista-' + i + '"' + (i === 0 ? '' : ' hidden') + '>' +
            '<div class="navegador" aria-hidden="true"><span class="navegador__puntos"><i></i><i></i><i></i></span><span class="navegador__url">' + esc(x.corto || x.url) + '</span></div>' +
            '<img class="sitio-captura" src="' + esc(ruta(x.captura, base)) + '" alt="Captura de ' + esc(x.nombre) + ' (' + esc(x.dependencia || '') + ')"></div>';
        }).join('') + '</div><p class="app-demo__nota">Capturas de los sitios en producción.</p></div>' : '';
      return '<div class="contenedor hero__interior">' + migas(p, base) + '<div class="hero__rejilla"><div>' +
        '<p class="hero__marca-app"><img src="' + esc(ruta('assets/img/marcas/usta-escudo.webp', base)) + '" alt=""><span><b>Portales institucionales</b><small>Santo Tomás · Tunja</small></span></p>' +
        '<p class="hero__rotulo">' + esc(rotuloProyecto(p) + ' · ' + ((p.identidad || {}).etiqueta || '')) + '</p><h1>' + esc(p.nombre) + '</h1>' +
        (tieneContenido(p.subtitulo) ? '<p class="hero__bajada">' + esc(p.subtitulo) + '</p>' : '') +
        datosHero(p) + pilaTecnologias(p, base) + botones(p, 'boton--principal', 'boton--secundario') + '</div>' + demo + '</div></div>';
    },

    // CAMINA: réplica del banner de camina-front.
    camina: function (p, base) {
      const frases = String(p.subtitulo || '').split(/(?<=\.)\s+/).filter(Boolean);
      return '<div class="contenedor hero__interior">' + migas(p, base) + '<div class="hero__rejilla"><div>' +
        '<p class="hero__rotulo">' + esc(rotuloProyecto(p)) + '</p>' +
        '<img class="hero__logo" src="' + esc(ruta('assets/img/marcas/camina-logo-blanco.png', base)) + '" alt="Santoto CAMINA Living Lab">' +
        '<h1 class="sr-only">' + esc(p.nombre) + '</h1>' +
        '<p class="hero__lema">' + frases.map(function (f, i) { return '<span class="' + (i % 2 ? 'blanco' : 'lima') + '">' + esc(f) + '</span>'; }).join(' ') + '</p>' +
        datosHero(p) + botones(p, 'boton--principal', 'boton--secundario') + '</div>' +
        '<img class="hero__globo" src="' + esc(ruta('assets/img/marcas/camina-banner.png', base)) + '" alt="Ilustración del banner de CAMINA: el planeta rodeado de ciudad, naturaleza y ciencia"></div></div>';
    },

    // Rally Neotomasino: papel crema, banner de bienvenida y pasaporte abierto con sellos.
    neotomasino: function (p, base) {
      const sellos = conContenido((p.extras || {}).sellos).filter(function (s) { return s.img; }).slice(0, 4);
      return '<div class="contenedor hero__interior">' + migas(p, base) + '<div class="hero__rejilla"><div>' +
        '<p class="hero__rotulo">' + esc(rotuloProyecto(p)) + '</p>' +
        '<img class="hero__bienvenida" src="' + esc(ruta('assets/img/marcas/neotomasino-bienvenido.png', base)) + '" alt="¡Hola, Bienvenid@!">' +
        '<h1>' + esc(p.nombre) + '</h1>' +
        (tieneContenido(p.subtitulo) ? '<p class="hero__bajada">' + esc(p.subtitulo) + '</p>' : '') +
        datosHero(p) + botones(p, 'boton--principal', 'boton--secundario') + '</div>' +
        '<div class="pasaporte" aria-hidden="true"><div class="pasaporte__hoja">' +
        '<img src="' + esc(ruta('assets/img/marcas/usta-escudo.webp', base)) + '" alt="" class="pasaporte__escudo">' +
        '<p class="pasaporte__titulo">PASAPORTE<br>NEOTOMASINO</p><span class="pasaporte__linea"></span><span class="pasaporte__linea corta"></span>' +
        '<img src="' + esc(ruta('assets/img/marcas/neotomasino-soy-thommy.png', base)) + '" alt="" class="pasaporte__thommy"></div>' +
        '<div class="pasaporte__hoja pasaporte__sellos">' + sellos.map(function (s) { return '<img src="' + esc(ruta(s.img, base)) + '" alt="">'; }).join('') + '</div></div>' +
        '</div></div>';
    },

    // Rally Living Lab: blanco y azul CAMINA con el título del festival.
    livinglab: function (p, base) {
      const rel = (p.extras || {}).comparativa;
      const extra = rel ? '<a class="boton boton--secundario" href="' + esc(rutaProyecto(rel, base)) + '">Ver el rally original</a>' : '';
      return '<div class="hero__circulo" aria-hidden="true"></div><div class="hero__circulo hero__circulo--lima" aria-hidden="true"></div>' +
        '<div class="contenedor hero__interior">' + migas(p, base) + '<div class="hero__rejilla"><div>' +
        '<img class="hero__logo" src="' + esc(ruta('assets/img/marcas/rally-living-lab-logo.png', base)) + '" alt="Universidad Santo Tomás Tunja y Santoto Camina Living Lab">' +
        '<p class="hero__rotulo">' + esc(rotuloProyecto(p)) + '</p><h1>' + esc(p.nombre) + '</h1>' +
        (tieneContenido(p.subtitulo) ? '<p class="hero__lema">' + esc(p.subtitulo) + '</p>' : '') +
        datosHero(p) + botones(p, 'boton--principal', 'boton--secundario', extra) + '</div>' +
        '<img class="hero__titulo-img" src="' + esc(ruta('assets/img/rally-living-lab/titulo-mapa-de-soluciones.svg', base)) + '" alt="Festival Santoto Camina Living Lab: Mapa de soluciones"></div></div>';
    },

    // ReservaLab: la app con una pestaña por rol (calendario, firmas, bitácora y estadísticas).
    reservalab: function (p, base) {
      const grupos = conContenido((p.extras || {}).gruposModulos);
      const id = p.identidad || {};
      const icono = function (nombre) {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONOS_RIEL[nombre] || '<circle cx="12" cy="12" r="4"/>') + '</svg>';
      };
      // Calendario de ejemplo: clases (gris), reservas aprobadas (azul) y pendientes (amarillo).
      const ocupados = { 2: 'clase', 3: 'ok', 6: 'clase', 8: 'pend', 9: 'ok', 10: 'clase', 13: 'clase', 15: 'ok', 16: 'pend', 17: 'clase', 20: 'clase', 22: 'ok', 24: 'clase', 27: 'clase', 29: 'pend' };
      const calendario = '<p class="app-demo__titulo">Calendario</p><div class="rl-cal"><div class="rl-cal__cab">' + ['L', 'M', 'M', 'J', 'V'].map(function (d) { return '<span>' + d + '</span>'; }).join('') + '</div><div class="rl-cal__dias">' +
        Array.from({ length: 30 }, function (_, k) { const t = ocupados[k]; return '<span class="' + (t ? 'rl-cal__dia--' + t : '') + '" style="--i:' + k + '"><small>' + (k + 1) + '</small>' + (t ? '<i></i>' : '') + '</span>'; }).join('') +
        '</div><p class="rl-cal__ley"><em class="clase">Clase</em><em class="ok">Aprobada</em><em class="pend">Pendiente</em></p></div>';
      const firmas = '<p class="app-demo__titulo">Aprobaciones</p><ul class="rl-firmas">' + [['ok', 'ok'], ['ok', 'pend'], ['pend', '']].map(function (f, i) {
        const paso = function (estado, quien) { return '<span class="rl-firma rl-firma--' + (estado || 'espera') + '">' + (estado === 'ok' ? '✓' : estado === 'pend' ? '…' : '·') + ' ' + quien + '</span>'; };
        return '<li style="--i:' + i + '"><b class="esqueleto"></b><div>' + paso(f[0], 'Docente') + '<span class="rl-firma__flecha">→</span>' + paso(f[1], 'Laboratorista') + '</div></li>';
      }).join('') + '</ul>';
      const bitacora = '<p class="app-demo__titulo">Bitácora de uso</p><div class="rl-bita">' + [['Docencia', 24], ['Investigación', 6], ['Práctica libre', 11]].map(function (b, i) {
        return '<div style="--i:' + i + '"><span>' + b[0] + '</span><b class="esqueleto"></b><em>' + b[1] + ' asistentes</em></div>';
      }).join('') + '</div><span class="rl-excel">' + icono('Reportes') + 'Exportar Excel para Power BI</span>';
      const estadisticas = '<p class="app-demo__titulo">Estadísticas</p><div class="app-demo__barras">' + [62, 88, 45, 74, 53, 91, 38].map(function (h) { return '<span style="--alto:' + h + '%"></span>'; }).join('') + '</div><p class="app-demo__sub">Uso por laboratorio</p>';
      const pantallas = { 'Estudiante': calendario, 'Docente': firmas, 'Laboratorista': bitacora, 'Administrador': estadisticas };
      const inicial = 0;
      const demo = grupos.length ? '<div class="app-demo">' +
        '<div class="app-demo__pestanas" role="tablist" aria-label="Vistas de la plataforma por rol">' + grupos.map(function (g, i) {
          return '<button type="button" role="tab" id="vista-' + i + '" aria-controls="panel-vista-' + i + '" aria-selected="' + (i === inicial) + '" tabindex="' + (i === inicial ? 0 : -1) + '">' + esc(g.titulo) + '</button>';
        }).join('') + '</div>' +
        '<div class="app-demo__ventana">' + grupos.map(function (g, i) {
          const items = conContenido(g.items).slice(0, 8);
          return '<div class="app-demo__vista" role="tabpanel" id="panel-vista-' + i + '" aria-labelledby="vista-' + i + '"' + (i === inicial ? '' : ' hidden') + '>' +
            '<nav class="app-demo__riel" aria-label="Menú de ' + esc(g.titulo) + '"><img src="' + esc(ruta('assets/img/marcas/usta-escudo.webp', base)) + '" alt="">' +
            '<ul>' + items.map(function (it, j) { return '<li class="' + (j === (g.titulo === 'Docente' ? 3 : g.titulo === 'Laboratorista' ? 7 : g.titulo === 'Administrador' ? 5 : 1) ? 'activo' : '') + '" data-label="' + esc(it) + '">' + icono(it) + '<span class="sr-only">' + esc(it) + '</span></li>'; }).join('') + '</ul></nav>' +
            '<div class="app-demo__pantalla" aria-hidden="true">' + (pantallas[g.titulo] || '') + '</div></div>';
        }).join('') + '</div><p class="app-demo__nota">Recreación de la interfaz con datos de ejemplo.</p></div>' : '';
      return '<div class="contenedor hero__interior">' + migas(p, base) + '<div class="hero__rejilla"><div>' +
        '<p class="hero__marca-app"><img src="' + esc(ruta('assets/img/marcas/usta-escudo.webp', base)) + '" alt=""><span><b>ReservaLab</b><small>Santo Tomás · Tunja</small></span></p>' +
        '<p class="hero__chips"><span class="chip-estado">' + esc(rotuloProyecto(p)) + '</span>' + (id.nombreAnterior ? '<span class="chip-gris">Antes: ' + esc(id.nombreAnterior) + '</span>' : '') + '<span class="chip-gris">Proyecto de mayor alcance</span></p>' +
        '<h1>' + esc(p.nombre) + '</h1>' + (tieneContenido(p.subtitulo) ? '<p class="hero__bajada">' + esc(p.subtitulo) + '</p>' : '') +
        datosHero(p) + pilaTecnologias(p, base) + botones(p, 'boton--principal', 'boton--secundario') + '</div>' + demo + '</div></div>';
    },

    // Nómina: pantalla de inicio de la plataforma, con sus decoraciones.
    nomina: function (p, base) {
      const des = conContenido((p.extras || {}).desarrollos);
      const iconos = [
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>'
      ];
      return '<img class="hero__deco hero__deco--izq" src="' + esc(ruta('assets/img/marcas/nomina-deco-izquierda.webp', base)) + '" alt="" aria-hidden="true">' +
        '<img class="hero__deco hero__deco--der" src="' + esc(ruta('assets/img/marcas/nomina-deco-derecha.webp', base)) + '" alt="" aria-hidden="true">' +
        '<div class="contenedor hero__interior">' + migas(p, base) + '<div class="hero__centro">' +
        '<p class="hero__rotulo">' + esc(rotuloProyecto(p) + ' · ' + ((p.identidad || {}).etiqueta || '')) + '</p>' +
        '<div class="hero__marca"><img src="' + esc(ruta('assets/img/marcas/usta-escudo.webp', base)) + '" alt=""><div><h1>' + esc(p.nombre) + '</h1><p>Universidad Santo Tomás · Tunja</p></div></div>' +
        (tieneContenido(p.subtitulo) ? '<p class="hero__bajada">' + esc(p.subtitulo) + '</p>' : '') +
        (des.length ? '<div class="hero__modulos">' + des.map(function (d, i) {
          return '<a href="' + esc(d.ficha ? rutaProyecto(d.ficha, base) : '#' + d.id) + '">' + (iconos[i] || '') + '<strong>' + esc(d.modulo) + '</strong><span>' + esc(d.nombre) + '</span>' + (d.ficha ? '<em>Ver ficha →</em>' : '') + '</a>';
        }).join('') + '</div>' : '') + datosHero(p) + botones(p, 'boton--principal', 'boton--secundario') + '</div></div>';
    },

    // Mesas de ayuda: el navegador con la portada de cada mesa, una pestaña por mesa.
    mesas: function (p, base) {
      const ms = conContenido((p.extras || {}).mesas);
      const portada = function (m) {
        const c = m.colores || {};
        const po = m.portada || {};
        const cats = conContenido(m.categorias);
        const mini = conContenido(po.miniaturas);
        const host = String(m.url || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
        return '<div class="navegador" aria-hidden="true"><span class="navegador__puntos"><i></i><i></i><i></i></span><span class="navegador__url">' + esc(host) + '</span></div>' +
          '<div class="portada-mesa" aria-hidden="true" style="--m-fondo:' + esc(c.fondo || '#00336a') + ';--m-texto:' + esc(c.texto || '#fff') + ';--m-acento:' + esc(c.acento || '#fdc300') + ';--m-detalle:' + esc(c.detalle || c.acento || '#fdc300') + '">' +
          (po.banner ? '<img class="portada-mesa__banner" src="' + esc(ruta(po.banner, base)) + '" alt="">' :
            '<div class="portada-mesa__cabeza"><b>' + esc(po.titulo || m.nombre) + '</b>' + (tieneContenido(po.texto) ? '<p>' + esc(po.texto) + '</p>' : '') + '</div>') +
          '<div class="portada-mesa__botones"><span>' + lordicon('nuevoTicket', { primary: c.fondo, secondary: c.acento }) + 'Enviar un ticket</span><span>' + lordicon('ver', { primary: c.fondo, secondary: c.acento }) + 'Ver tickets existentes</span></div>' +
          '<div class="portada-mesa__categorias' + (mini.length ? ' portada-mesa__categorias--img' + (mini.length % 3 === 0 ? ' portada-mesa__categorias--tres' : '') : '') + '">' +
          (mini.length ? mini.map(function (src) { return '<img src="' + esc(ruta(src, base)) + '" alt="">'; }).join('') :
            cats.slice(0, 6).map(function (t, k) { return '<span class="portada-mesa__cat portada-mesa__cat--' + (k % 3) + '">' + esc(t) + '</span>'; }).join('')) +
          '</div></div>';
      };
      const demo = ms.length ? '<div class="app-demo">' +
        '<div class="app-demo__pestanas" role="tablist" aria-label="Portadas de las mesas de ayuda">' + ms.map(function (m, i) {
          return '<button type="button" role="tab" id="vista-' + i + '" aria-controls="panel-vista-' + i + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' + esc(m.nombre) + '</button>';
        }).join('') + '</div>' +
        '<div class="app-demo__ventana">' + ms.map(function (m, i) {
          return '<div class="app-demo__vista app-demo__vista--web" role="tabpanel" id="panel-vista-' + i + '" aria-labelledby="vista-' + i + '"' + (i === 0 ? '' : ' hidden') + '>' +
            '<p class="sr-only">Portada de la mesa ' + esc(m.nombre) + ': ' + esc(m.dependencia || '') + '.</p>' + portada(m) + '</div>';
        }).join('') + '</div><p class="app-demo__nota">Recreación de las portadas en producción' + (window.LORDICONS ? ' · íconos animados de Lordicon' : '') + '.</p></div>' : '';
      return '<div class="contenedor hero__interior">' + migas(p, base) + '<div class="hero__rejilla"><div>' +
        '<p class="hero__marca-app"><img src="' + esc(ruta('assets/img/marcas/usta-escudo.webp', base)) + '" alt=""><span><b>Mesas de ayuda</b><small>Santo Tomás · Tunja</small></span></p>' +
        '<p class="hero__rotulo">' + esc(rotuloProyecto(p) + ' · ' + ((p.identidad || {}).etiqueta || '')) + '</p><h1>' + esc(p.nombre) + '</h1>' +
        (tieneContenido(p.subtitulo) ? '<p class="hero__bajada">' + esc(p.subtitulo) + '</p>' : '') +
        datosHero(p) + pilaTecnologias(p, base) + botones(p, 'boton--principal', 'boton--secundario') + '</div>' + demo + '</div></div>';
    },

    // Novedades de Nómina: la app con una pestaña por rol y las decoraciones de la plataforma.
    novedades: function (p, base) {
      const grupos = conContenido((p.extras || {}).gruposModulos);
      const icono = function (nombre) {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONOS_RIEL[nombre] || '<circle cx="12" cy="12" r="4"/>') + '</svg>';
      };
      const barras = function (n) { return Array.from({ length: n }, function (_, i) { return '<b class="esqueleto' + (i % 2 ? ' corta' : '') + '"></b>'; }).join(''); };
      const pantallas = {
        'Administración': '<p class="app-demo__titulo">Nóminas</p>' +
          '<div class="nv-carga"><span class="nv-carga__icono">' + icono('Nóminas') + '</span><div><b>Cargar PDF de nómina</b><small>Reporte del programa · se extrae automáticamente</small></div><span class="nv-carga__boton">Subir PDF</span></div>' +
          '<ul class="nv-lista">' + [['Cerrada', 'cerrada'], ['En validación', 'validacion'], ['Cargada', 'cargada'], ['En validación', 'validacion']].map(function (e, i) {
            return '<li style="--i:' + i + '"><span class="nv-lista__prog"></span><b class="esqueleto"></b><span class="nv-estado nv-estado--' + e[1] + '">' + e[0] + '</span></li>';
          }).join('') + '</ul>',
        'Directivo': '<p class="app-demo__titulo">Mis programas</p>' +
          '<div class="nv-plazo"><b>Plazo de validación</b><span>Primeros 5 días hábiles del mes</span><i class="nv-plazo__dias">' + [1, 2, 3, 4, 5].map(function (d) { return '<em' + (d <= 3 ? ' class="hecho"' : '') + '>' + d + '</em>'; }).join('') + '</i></div>' +
          '<div class="nv-meses">' + [['Agosto', true], ['Septiembre', true], ['Octubre', false]].map(function (m, i) {
            return '<div class="nv-mes' + (m[1] ? ' nv-mes--ok' : '') + '" style="--i:' + i + '"><small>Mes de pago</small><b>' + m[0] + '</b>' + barras(2) + '<span>' + (m[1] ? '✓ Validado' : 'Por revisar') + '</span></div>';
          }).join('') + '</div>',
        'Coordinador': '<p class="app-demo__titulo">Usuarios</p><ul class="nv-lista">' + [0, 1, 2].map(function (i) {
          return '<li style="--i:' + i + '"><span class="nv-lista__avatar"></span><b class="esqueleto"></b><span class="nv-estado nv-estado--validacion">Directivo</span></li>';
        }).join('') + '</ul>'
      };
      const demo = grupos.length ? '<div class="app-demo">' +
        '<div class="app-demo__pestanas" role="tablist" aria-label="Vistas de la plataforma por rol">' + grupos.map(function (g, i) {
          return '<button type="button" role="tab" id="vista-' + i + '" aria-controls="panel-vista-' + i + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' + esc(g.titulo) + '</button>';
        }).join('') + '</div>' +
        '<div class="app-demo__ventana">' + grupos.map(function (g, i) {
          const items = conContenido(g.items);
          return '<div class="app-demo__vista" role="tabpanel" id="panel-vista-' + i + '" aria-labelledby="vista-' + i + '"' + (i === 0 ? '' : ' hidden') + '>' +
            '<nav class="app-demo__riel" aria-label="Menú de ' + esc(g.titulo) + '"><img src="' + esc(ruta('assets/img/marcas/usta-escudo.webp', base)) + '" alt="">' +
            '<ul>' + items.map(function (it, j) { return '<li class="' + (j === 0 ? 'activo' : '') + '" data-label="' + esc(it) + '">' + icono(it) + '<span class="sr-only">' + esc(it) + '</span></li>'; }).join('') + '</ul></nav>' +
            '<div class="app-demo__pantalla" aria-hidden="true">' + (pantallas[g.titulo] || '<p class="app-demo__titulo">' + esc(items[0] || g.titulo) + '</p>' + barras(4)) + '</div></div>';
        }).join('') + '</div><p class="app-demo__nota">Recreación de la interfaz con datos de ejemplo.</p></div>' : '';
      return '<img class="hero__deco hero__deco--izq" src="' + esc(ruta('assets/img/marcas/nomina-deco-izquierda.webp', base)) + '" alt="" aria-hidden="true">' +
        '<img class="hero__deco hero__deco--der" src="' + esc(ruta('assets/img/marcas/nomina-deco-derecha.webp', base)) + '" alt="" aria-hidden="true">' +
        '<div class="contenedor hero__interior">' + migas(p, base) + '<div class="hero__rejilla"><div>' +
        '<p class="hero__marca-app"><img src="' + esc(ruta('assets/img/marcas/usta-escudo.webp', base)) + '" alt=""><span><b>Nómina Docentes Posgrados</b><small>Santo Tomás · Tunja</small></span></p>' +
        '<p class="hero__rotulo">' + esc(rotuloProyecto(p) + ' · ' + ((p.identidad || {}).etiqueta || '')) + '</p><h1>' + esc(p.nombre) + '</h1>' +
        (tieneContenido(p.subtitulo) ? '<p class="hero__bajada">' + esc(p.subtitulo) + '</p>' : '') +
        datosHero(p) + pilaTecnologias(p, base) + botones(p, 'boton--principal', 'boton--secundario') + '</div>' + demo + '</div></div>';
    },

    // Gestión Docente: la app misma, con una pestaña por rol que cambia el riel y la pantalla.
    docente: function (p, base) {
      const grupos = conContenido((p.extras || {}).gruposModulos);
      const icono = function (nombre) {
        return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONOS_RIEL[nombre] || '<circle cx="12" cy="12" r="4"/>') + '</svg>';
      };
      const barras = function (n) { return Array.from({ length: n }, function (_, i) { return '<b class="esqueleto' + (i % 2 ? ' corta' : '') + '"></b>'; }).join(''); };
      const pantallas = {
        Administrador: '<p class="app-demo__titulo">Dashboard</p><div class="app-demo__stats">' +
          ['Docentes activos', 'Cumplen el mínimo', 'Sin inscripción'].map(function (t, i) {
            return '<div class="app-demo__stat app-demo__stat--' + i + '"><b class="esqueleto"></b><span>' + t + '</span></div>';
          }).join('') + '</div><p class="app-demo__sub">Cumplimiento por unidad</p><div class="app-demo__barras">' +
          [78, 54, 92, 63, 41, 85, 70].map(function (h) { return '<span style="--alto:' + h + '%"></span>'; }).join('') + '</div>',
        Tutor: '<p class="app-demo__titulo">Mis cursos</p><div class="app-demo__curso-cab"><i></i><div>' + barras(2) + '</div></div><ul class="app-demo__inscritos">' +
          [['Aprobado', 'ok'], ['Inscrito', 'info'], ['Aprobado', 'ok'], ['Reprobado', 'mal']].map(function (e) {
            return '<li><span class="app-demo__avatar"></span><b class="esqueleto"></b><span class="insignia insignia--' + e[1] + '">' + e[0] + '</span></li>';
          }).join('') + '</ul>',
        Docente: '<p class="app-demo__titulo">Mi panel</p><div class="app-demo__saldo"><div><b>Mi saldo de horas</b><small>Tiempo completo · rango exigido 40–80h</small>' +
          '<span class="medidor-docente"><i style="--llenado:65%"></i></span><span class="app-demo__marcas"><small>0h</small><small>mín. 40h</small><small>máx. 80h</small></span></div>' +
          '<dl><div><dt>Horas inscritas</dt><dd>52h</dd></div><div class="ok"><dt>Horas certificadas</dt><dd>36h</dd></div><div class="pendiente"><dt>¿Cumple mínimo?</dt><dd>Aún no</dd></div></dl></div>' +
          '<div class="app-demo__cursos">' + ['#00336a', '#004f9f'].map(function (c) {
            return '<div class="app-demo__tile"><span style="background:' + c + '">' + icono('Cursos') + '</span><div>' + barras(2) + '<p><em>20h</em><em>Lun · Mié</em><em>Por asistencia</em></p></div></div>';
          }).join('') + '</div>'
      };
      const inicial = Math.max(0, grupos.findIndex(function (g) { return g.titulo === 'Docente'; }));
      const demo = grupos.length ? '<div class="app-demo">' +
        '<div class="app-demo__pestanas" role="tablist" aria-label="Vistas de la plataforma por rol">' + grupos.map(function (g, i) {
          return '<button type="button" role="tab" id="vista-' + i + '" aria-controls="panel-vista-' + i + '" aria-selected="' + (i === inicial) + '" tabindex="' + (i === inicial ? 0 : -1) + '">' + esc(g.titulo) + '</button>';
        }).join('') + '</div>' +
        '<div class="app-demo__ventana">' + grupos.map(function (g, i) {
          const items = conContenido(g.items);
          return '<div class="app-demo__vista" role="tabpanel" id="panel-vista-' + i + '" aria-labelledby="vista-' + i + '"' + (i === inicial ? '' : ' hidden') + '>' +
            '<nav class="app-demo__riel" aria-label="Menú de ' + esc(g.titulo) + '"><img src="' + esc(ruta('assets/img/marcas/gestion-docente-logo.png', base)) + '" alt="">' +
            '<ul>' + items.map(function (it, j) { return '<li class="' + (j === 0 ? 'activo' : '') + '" data-label="' + esc(it) + '">' + icono(it) + '<span class="sr-only">' + esc(it) + '</span></li>'; }).join('') + '</ul></nav>' +
            '<div class="app-demo__pantalla" aria-hidden="true">' + (pantallas[g.titulo] || '<p class="app-demo__titulo">' + esc(items[0] || g.titulo) + '</p>' + barras(4)) + '</div></div>';
        }).join('') + '</div><p class="app-demo__nota">Recreación de la interfaz con datos de ejemplo.</p></div>' : '';
      return '<div class="contenedor hero__interior">' + migas(p, base) + '<div class="hero__rejilla"><div>' +
        '<p class="hero__marca-app"><img src="' + esc(ruta('assets/img/marcas/gestion-docente-logo.png', base)) + '" alt=""><span><b>Gestión Docente</b><small>Santo Tomás · Tunja</small></span></p>' +
        '<p class="hero__rotulo">' + esc(rotuloProyecto(p) + ' · ' + ((p.identidad || {}).etiqueta || '')) + '</p><h1>' + esc(p.nombre) + '</h1>' +
        (tieneContenido(p.subtitulo) ? '<p class="hero__bajada">' + esc(p.subtitulo) + '</p>' : '') +
        datosHero(p) + pilaTecnologias(p, base) + botones(p, 'boton--principal', 'boton--secundario') + '</div>' + demo + '</div></div>';
    }
  };

  /* ---------------------------------------------------------------------
   * Fichas de proyecto: secciones
   * ------------------------------------------------------------------- */

  // Construye una sección numerada; devuelve "" si el cuerpo está vacío.
  function seccion(ctx, id, titulo, cuerpo, clase) {
    if (!cuerpo || !cuerpo.trim()) return '';
    ctx.n += 1;
    return '<section class="sec' + (clase ? ' ' + clase : '') + '" id="' + esc(id) + '" aria-labelledby="' + esc(id) + '-t">' +
      '<p class="sec__num" aria-hidden="true">' + esc(ctx.tema.num(ctx.n)) + '</p><h2 class="sec__titulo" id="' + esc(id) + '-t">' + esc(titulo) + '</h2>' + cuerpo + '</section>';
  }

  // Subtítulo h3 con contenido; "" si el contenido está vacío.
  function sub(titulo, cuerpo) { return cuerpo ? '<h3 class="sec__sub">' + esc(titulo) + '</h3>' + cuerpo : ''; }

  const SECCIONES = [
    // Qué se hizo y por qué: lo primero de cada ficha.
    function (p, ctx) {
      const hechos = conContenido(p.queSeHizo);
      const que = parrafos(p.descripcion, 'sec__texto') + (hechos.length ? '<ul class="qpq__lista">' + hechos.map(function (h) {
        return '<li>' + esc(h) + '</li>';
      }).join('') + '</ul>' : '');
      const porque = parrafos(p.proposito, 'sec__texto');
      const bloques = (que ? '<div class="qpq__bloque qpq__bloque--que"><h3>Qué se hizo</h3>' + que + '</div>' : '') +
        (porque ? '<div class="qpq__bloque qpq__bloque--porque"><h3>Por qué se hizo</h3>' + porque + '</div>' : '');
      const ex = p.extras || {};
      const res = ex.resumen;
      if (res && (tieneContenido(res.declaracion) || conContenido(res.destacados).length)) {
        // [[texto]] marca las palabras que van con el degradado; cada palabra se ilumina con el scroll.
        const declaracion = tieneContenido(res.declaracion) ? '<p class="declaracion">' + String(res.declaracion).split(/(\[\[.*?\]\])/).map(function (trozo) {
          const acento = /^\[\[.*\]\]$/.test(trozo);
          return trozo.replace(/^\[\[|\]\]$/g, '').split(/(\s+)/).map(function (w) {
            if (!w) return '';
            return /^\s+$/.test(w) ? ' ' : '<span class="palabra' + (acento ? ' palabra--acento' : '') + '">' + esc(w) + '</span>';
          }).join('');
        }).join('') + '</p>' : '';
        const tarjetas = conContenido(res.destacados).map(function (d, i) {
          const animado = lordicon(d.lordicon, { primary: (ex.paletaIconos || {}).primary, secondary: (ex.paletaIconos || {}).secondary });
          return '<li class="destacado destacado--' + (i % 6) + (d.ancho === 2 ? ' destacado--ancho' : '') + '">' +
            (animado ? '<span class="destacado__icono destacado__icono--animado" aria-hidden="true">' + animado + '</span>' :
              '<span class="destacado__icono" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (ICONOS_RIEL[d.icono] || '<circle cx="12" cy="12" r="4"/>') + '</svg></span>') +
            '<h3>' + esc(d.titulo) + '</h3>' + (tieneContenido(d.texto) ? '<p>' + esc(d.texto) + '</p>' : '') +
            (d.medidor ? '<span class="medidor-docente" aria-hidden="true"><i style="--llenado:72%"></i></span>' : '') + '</li>';
        }).join('');
        return seccion(ctx, 'que-y-por-que', 'Qué se hizo y por qué', declaracion + (tarjetas ? '<ul class="destacados">' + tarjetas + '</ul>' : '') +
          (bloques ? '<details class="qpq-detalle"><summary>Leer el detalle completo</summary><div class="qpq">' + bloques + '</div></details>' : ''));
      }
      return seccion(ctx, 'que-y-por-que', 'Qué se hizo y por qué', bloques ? '<div class="qpq">' + bloques + '</div>' : '');
    },
    // Cómo se juega: los momentos de la dinámica, en orden (rallies).
    function (p, ctx) {
      const pasos = conContenido((p.extras || {}).dinamica);
      if (!pasos.length) return '';
      return seccion(ctx, 'dinamica', 'Cómo se juega', '<ol class="dinamica">' + pasos.map(function (x, i) {
        return '<li class="dinamica__paso"><span class="dinamica__num" aria-hidden="true">' + (i + 1) + '</span>' +
          '<h3>' + esc(x.titulo) + '</h3><p>' + esc(x.detalle) + '</p>' +
          (conContenido(x.datos).length ? '<ul class="dinamica__datos">' + conContenido(x.datos).map(function (d) { return '<li>' + esc(d) + '</li>'; }).join('') + '</ul>' : '') + '</li>';
      }).join('') + '</ol>');
    },
    // Franja de cifras con contador animado.
    function (p, ctx) {
      const c = conContenido((p.extras || {}).cifras).filter(function (x) { return typeof x.valor === 'number'; });
      return seccion(ctx, 'cifras', 'En cifras', c.length ? '<dl class="contador">' + c.map(function (x) {
        return '<div><dt>' + esc(x.texto) + '</dt><dd>' + (x.prefijo ? '<span class="contador__fijo">' + esc(x.prefijo) + '</span>' : '') + '<span data-contar="' + x.valor + '">' + num(x.valor) + '</span>' + (x.sufijo ? '<span class="contador__fijo">' + esc(x.sufijo) + '</span>' : '') + '</dd></div>';
      }).join('') + '</dl>' : '');
    },
    // Sitios intervenidos: una tarjeta por sitio con su captura.
    function (p, ctx) {
      const sitios = conContenido((p.extras || {}).sitiosDetalle);
      if (!sitios.length) return '';
      const notaSitios = (p.extras || {}).notaSitios;
      return seccion(ctx, 'sitios', 'Los sitios', (tieneContenido(notaSitios) ? '<p class="sec__nota" style="margin:0 0 var(--sp-5)">' + esc(notaSitios) + '</p>' : '') + '<div class="sitios">' + sitios.map(function (x, i) {
        const extra = x.extra && x.extra.captura ? '<figure class="sitio-tarjeta__extra"><img src="' + esc(ruta(x.extra.captura, ctx.base)) + '" alt="' + esc(x.extra.pie || '') + '" loading="lazy"><figcaption>' + esc(x.extra.pie || '') + '</figcaption></figure>' : '';
        return '<article class="sitio-tarjeta' + (x.destacado ? ' sitio-tarjeta--destacado' : '') + ' revelar" style="--retraso:' + (i * 70) + 'ms">' +
          '<div class="sitio-tarjeta__vista"><div class="navegador" aria-hidden="true"><span class="navegador__puntos"><i></i><i></i><i></i></span><span class="navegador__url">' + esc(x.corto || x.url) + '</span></div>' +
          '<img src="' + esc(ruta(x.captura, ctx.base)) + '" alt="Captura de ' + esc(x.nombre) + '" loading="lazy"></div>' +
          '<div class="sitio-tarjeta__cuerpo">' + (tieneContenido(x.tipo) ? '<span class="sitio-tarjeta__tipo' + (x.destacado ? ' sitio-tarjeta__tipo--desarrollo' : '') + '">' + esc(x.tipo) + '</span>' : '') +
          '<p class="sitio-tarjeta__dep">' + esc(x.dependencia || '') + '</p><h3>' + esc(x.nombre) + '</h3>' +
          (tieneContenido(x.trabajo) ? '<p class="sitio-tarjeta__texto">' + esc(x.trabajo) + '</p>' : '') +
          chips(x.tecnologias, 'chip--suave', 'Tecnologías del sitio') + extra +
          (urlExterna(x.url) ? '<p class="sitio-tarjeta__pie">' + enlaceExterno(x.url, 'Abrir el sitio', 'sitio-tarjeta__enlace') + '</p>' : '') + '</div></article>';
      }).join('') + '</div>');
    },
    // Recorrido por roles: pasos filtrables por rol. Cada rol toma un color
    // según su orden de aparición (r1, r2, r3).
    function (p, ctx) {
      const ex = p.extras || {};
      const pasos = conContenido(ex.recorrido);
      if (!pasos.length) return '';
      const roles = pasos.map(function (x) { return x.rol; }).filter(function (r, i, a) { return r && a.indexOf(r) === i; });
      const slot = function (r) { return 'r' + ((roles.indexOf(r) % 3) + 1); };
      const nombreRol = function (r) { return (ex.etiquetasRoles || {})[r] || ROLES[r] || r; };
      const filtros = '<div class="recorrido__filtros" role="group" aria-label="Resaltar los pasos de un rol">' +
        '<button type="button" data-filtro-rol="" aria-pressed="true">Todos</button>' + roles.map(function (r) {
          return '<button type="button" data-filtro-rol="' + esc(r) + '" aria-pressed="false"><i class="recorrido__punto recorrido__punto--' + slot(r) + '"></i>' + esc(nombreRol(r)) + '</button>';
        }).join('') + '</div>';
      const primero = pasos[0];
      const escenario = '<div class="escenario" aria-hidden="true"><div class="escenario__tarjeta escenario__tarjeta--' + slot(primero.rol) + '">' +
        '<p class="escenario__num"><b>01</b><span>/ ' + dos(pasos.length) + '</span></p><span class="escenario__rol">' + esc(nombreRol(primero.rol)) + '</span>' +
        '<p class="escenario__titulo">' + esc(primero.titulo) + '</p><p class="escenario__detalle">' + esc(primero.detalle || '') + '</p>' +
        '<ol class="escenario__puntos">' + pasos.map(function (x, i) { return '<li class="recorrido__punto--' + slot(x.rol) + (i === 0 ? ' es-activo' : '') + '"></li>'; }).join('') + '</ol>' +
        '<span class="escenario__barra"><i style="width:' + (100 / pasos.length).toFixed(2) + '%"></i></span></div></div>';
      return seccion(ctx, 'recorrido', ex.tituloRecorrido || 'El recorrido de un curso', '<div class="recorrido-caja">' + filtros + '<div class="recorrido-escena">' + escenario + '<ol class="recorrido">' + pasos.map(function (x, i) {
        return '<li class="recorrido__paso recorrido__paso--' + slot(x.rol) + ' revelar" data-rol="' + esc(x.rol) + '" data-slot="' + slot(x.rol) + '" style="--retraso:' + (i * 70) + 'ms">' +
          '<span class="recorrido__num" aria-hidden="true">' + dos(i + 1) + '</span><span class="recorrido__rol">' + esc(nombreRol(x.rol)) + '</span>' +
          '<h3>' + esc(x.titulo) + '</h3>' + (tieneContenido(x.detalle) ? '<p>' + esc(x.detalle) + '</p>' : '') + '</li>';
      }).join('') + '</ol></div></div>');
    },
    // Acróstico de la metodología (réplica de la sección "La ruta CAMINA" de camina-front).
    function (p, ctx) {
      const ac = (p.extras || {}).acrostico;
      const pasos = ac ? conContenido(ac.pasos) : [];
      if (!pasos.length) return '';
      const tarjetas = pasos.map(function (x, i) {
        return '<li class="ruta__paso" style="--paso:' + esc(x.color || '#b5d334') + ';--paso-texto:' + esc(x.colorTexto || '#ffffff') + '">' +
          '<div class="ruta__tarjeta"><span class="ruta__letra" aria-hidden="true">' + esc(x.letra) + '</span>' +
          '<p class="ruta__titulo"><span class="sr-only">' + esc(x.letra) + ' de </span>' + esc(x.titulo) + '</p><p class="ruta__desc">' + esc(x.descripcion) + '</p></div>' +
          (i < pasos.length - 1 ? '<svg class="ruta__flecha" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : '') + '</li>';
      }).join('');
      return seccion(ctx, 'metodologia', ac.titulo || 'Metodología',
        (tieneContenido(ac.nota) ? '<p class="sec__texto sec__suave" style="margin-bottom:var(--sp-5)">' + esc(ac.nota) + '</p>' : '') +
        '<div class="ruta"><p class="ruta__rotulo">' + esc(ac.rotulo || 'Metodología') + '</p>' +
        (tieneContenido(ac.nombre) && ac.nombre !== ac.titulo ? '<p class="ruta__nombre">' + esc(ac.nombre) + '</p>' : '<div style="height:var(--sp-7)"></div>') +
        '<ol class="ruta__pasos">' + tarjetas + '</ol>' + (tieneContenido(ac.cita) ? '<p class="ruta__cita">' + esc(ac.cita) + '</p>' : '') + '</div>');
    },
    // Programas intervenidos (micrositios).
    function (p, ctx) {
      const ex = p.extras || {};
      const n = ex.cantidadProgramas;
      if (!n) return '';
      const nombres = Array.isArray(ex.programas) ? ex.programas : [];
      const lista = '<ul class="programas">' + Array.from({ length: Math.max(n, conContenido(nombres).length) }, function (_, i) {
        return '<li class="programa programa--' + ((i + Math.floor(i / 4)) % 4) + '"><small>' + dos(i + 1) + '</small>' + (tieneContenido(nombres[i]) ? '<span>' + esc(nombres[i]) + '</span>' : '<span class="sr-only">Programa ' + (i + 1) + '</span>') + '</li>';
      }).join('') + '</ul>';
      const lin = conContenido(ex.lineamientos).filter(function (l) { return tieneContenido(l.detalle); });
      return seccion(ctx, 'programas', 'Programas intervenidos', lista) +
        seccion(ctx, 'lineamientos', 'Lineamientos aplicados', lin.length ? '<ul class="lineamientos">' + lin.map(function (l) {
          return '<li class="lineamiento"><strong>' + esc(l.titulo) + '</strong><p>' + esc(l.detalle) + '</p></li>';
        }).join('') + '</ul>' : '');
    },
    // Sellos (rallies).
    function (p, ctx) {
      const ex = p.extras || {};
      const s = conContenido(ex.sellos);
      if (!s.length) return '';
      const base = ctx.base;
      return seccion(ctx, 'sellos', ex.tituloSellos || 'Sellos',
        (tieneContenido(ex.notaSellos) ? '<p class="sec__texto sec__suave" style="margin-bottom:var(--sp-5)">' + esc(ex.notaSellos) + '</p>' : '') +
        '<ul class="sellos">' + s.map(function (x) {
          return '<li class="sello">' + (x.img ? '<img src="' + esc(ruta(x.img, base)) + '" alt="" loading="lazy">' : '') + '<span>' + esc(x.nombre) + '</span>' +
            (tieneContenido(x.detalle) ? '<small class="sello__detalle">' + esc(x.detalle) + '</small>' : '') + '</li>';
        }).join('') + '</ul>');
    },
    // Módulos por rol (ReservaLab).
    function (p, ctx) {
      const ex = p.extras || {};
      const g = conContenido(ex.gruposModulos);
      if (!g.length) return '';
      if (ctx.tema.rolesConIconos) {
        const claves = { Administrador: 'admin', Tutor: 'tutor', Docente: 'docente' };
        let k = 0;
        return seccion(ctx, 'navegacion', 'Módulos por rol', '<p class="sec__nota" style="margin:0 0 var(--sp-5)">' + esc(ex.notaRoles || 'Menú real de cada vista.') + '</p>' +
          '<div class="roles-app">' + g.map(function (x) {
            const items = conContenido(x.items);
            const clave = claves[x.titulo] || 'admin';
            return '<article class="rol-tarjeta rol-tarjeta--' + clave + '"><header class="rol-tarjeta__cabeza">' +
              '<span class="rol-tarjeta__avatar" aria-hidden="true">' + esc(String(x.titulo).charAt(0)) + '</span>' +
              '<div><h3>' + esc(x.titulo) + '</h3><p>' + items.length + (items.length === 1 ? ' pantalla' : ' pantallas') + '</p></div></header>' +
              (tieneContenido(x.descripcion) ? '<p class="rol-tarjeta__desc">' + esc(x.descripcion) + '</p>' : '') +
              '<ul>' + items.map(function (it) {
                k += 1;
                return '<li class="revelar" style="--retraso:' + ((k % 8) * 45) + 'ms"><span class="rol-tarjeta__icono" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
                  (ICONOS_RIEL[it] || '<circle cx="12" cy="12" r="4"/>') + '</svg></span>' + esc(it) + '</li>';
              }).join('') + '</ul></article>';
          }).join('') + '</div>');
      }
      return seccion(ctx, 'navegacion', 'Módulos por rol', '<p class="sec__nota">Organización real de la navegación de la aplicación.</p>' +
        '<div class="grupos">' + g.map(function (x) {
          return '<div class="grupo"><h3>' + esc(x.titulo) + '</h3><ul>' + conContenido(x.items).map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul></div>';
        }).join('') + '</div>' + sub('Roles', chips(ex.roles, 'chip--suave')));
    },
    // Mesas de ayuda: tarjetas con los colores de cada mesa y flujo de solicitudes.
    function (p, ctx) {
      const ex = p.extras || {};
      const m = conContenido(ex.mesas);
      const f = conContenido(ex.flujo);
      let cuerpo = '';
      if (m.length && ctx.tema.rolesConIconos) {
        cuerpo = '<p class="sec__nota" style="margin:0 0 var(--sp-5)">Cada tarjeta lleva los colores de la portada de su mesa.</p><div class="roles-app">' + m.map(function (x) {
          const c = x.colores || {};
          const estilo = (c.fondo ? '--c:' + c.fondo + ';--av-texto:' + c.fondo + ';' : '') + (c.texto ? '--c-texto:' + c.texto + ';' : '') + (c.acento ? '--av:' + c.acento + ';--c-acento:' + c.acento + ';' : '') + (c.detalle ? '--c-detalle:' + c.detalle + ';' : '');
          const avatar = lordicon(x.lordicon, { primary: c.iconos || c.fondo, secondary: c.acento });
          const cats = conContenido(x.categorias);
          return '<article class="rol-tarjeta mesa-tarjeta" style="' + esc(estilo) + '"><header class="rol-tarjeta__cabeza">' +
            '<span class="rol-tarjeta__avatar' + (avatar ? ' rol-tarjeta__avatar--animado' : '') + '" aria-hidden="true">' + (avatar || esc(String(x.nombre).charAt(0))) + '</span>' +
            '<div><h3>' + esc(x.nombre) + '</h3><p>' + cats.length + (cats.length === 1 ? ' categoría' : ' categorías') + '</p></div></header>' +
            (tieneContenido(x.dependencia) ? '<p class="mesa-tarjeta__dependencia">' + esc(x.dependencia) + '</p>' : '') +
            (tieneContenido(x.atiende) ? '<p class="rol-tarjeta__desc">' + esc(x.atiende) + '</p>' : '') +
            '<ul>' + cats.map(function (it, k) {
              return '<li class="revelar" style="--retraso:' + (k * 45) + 'ms"><span class="rol-tarjeta__icono" aria-hidden="true">' + dos(k + 1) + '</span>' + esc(it) + '</li>';
            }).join('') + '</ul>' +
            (urlExterna(x.url) ? '<p class="mesa-tarjeta__pie">' + enlaceExterno(x.url, 'Abrir la mesa', 'mesa-tarjeta__enlace') + (tieneContenido(x.herramienta) ? '<small>' + esc(x.herramienta) + '</small>' : '') + '</p>' : '') +
            '</article>';
        }).join('') + '</div>';
      } else if (m.length) {
        cuerpo = '<ul class="mesas">' + m.map(function (x) {
          return '<li class="mesa"><h3>' + esc(x.nombre) + '</h3>' + (tieneContenido(x.atiende) ? '<p>' + esc(x.atiende) + '</p>' : '') +
            chips([x.dependencia, x.herramienta].filter(tieneContenido)) + '</li>';
        }).join('') + '</ul>';
      }
      return seccion(ctx, 'mesas', ex.tituloMesas || 'Las mesas', cuerpo) +
        seccion(ctx, 'flujo', 'Ciclo de una solicitud', f.length ? '<ol class="flujo">' + f.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol>' : '');
    },
    // Demostración interactiva de campos condicionales (formulario de una mesa).
    function (p, ctx) {
      const d = (p.extras || {}).demoCascada;
      const campos = d ? conContenido(d.campos) : [];
      if (!campos.length) return '';
      const control = function (c) {
        const id = 'demo-' + c.id;
        if (c.tipo === 'radio') {
          return '<fieldset class="cascada__radios"><legend>' + esc(c.etiqueta) + '</legend>' + conContenido(c.opciones).map(function (o, k) {
            return '<label><input type="radio" name="' + esc(id) + '" value="' + esc(o) + '"' + (c.valor === o ? ' checked' : '') + '> ' + esc(o) + '</label>';
          }).join('') + '</fieldset>';
        }
        if (c.tipo === 'select') {
          return '<label for="' + esc(id) + '">' + esc(c.etiqueta) + '</label><select id="' + esc(id) + '" name="' + esc(id) + '"><option value="">Seleccione</option>' +
            conContenido(c.opciones).map(function (o) { return '<option' + (c.valor === o ? ' selected' : '') + '>' + esc(o) + '</option>'; }).join('') + '</select>';
        }
        return '<label for="' + esc(id) + '">' + esc(c.etiqueta) + '</label><input type="text" id="' + esc(id) + '" name="' + esc(id) + '" autocomplete="off">';
      };
      const campo = function (c) {
        return '<div class="cascada__campo" data-campo="' + esc(c.id) + '"' + (c.muestraSi ? ' data-muestra-campo="' + esc(c.muestraSi.campo) + '" data-muestra-valores="' + esc(JSON.stringify(c.muestraSi.valores || [])) + '"' : '') + '>' +
          '<div class="cascada__interior"><span class="cascada__id" aria-hidden="true">' + esc(c.id) + '</span>' + control(c) + '</div></div>';
      };
      const puntero = lordicon(d.lordicon, (p.extras || {}).paletaIconos);
      return seccion(ctx, 'demo-cascada', d.titulo || 'Pruébalo', (tieneContenido(d.nota) ? '<p class="cascada__nota lordicon-gatillo">' + puntero + '<span>' + esc(d.nota) + '</span></p>' : '') +
        '<div class="cascada" data-cascada><form class="cascada__form" aria-label="Formulario de demostración" onsubmit="return false">' + campos.map(campo).join('') + '</form>' +
        '<aside class="cascada__servidor" aria-live="polite"><p class="cascada__servidor-titulo">Lo que exige el servidor</p><p class="cascada__servidor-sub">$camposCondicionales en submit_ticket.php</p><ul>' +
        campos.map(function (c) { return '<li data-para="' + esc(c.id) + '"><code>' + esc(c.id) + '</code><span>' + esc(c.etiqueta) + '</span><b></b></li>'; }).join('') + '</ul></aside></div>');
    },
    // Reglas de negocio.
    function (p, ctx) {
      const r = conContenido((p.extras || {}).reglas).filter(function (x) { return tieneContenido(x.titulo); });
      return seccion(ctx, 'reglas', 'Reglas de negocio', r.length ? '<p class="sec__nota" style="margin:0 0 var(--sp-5)">Gira cada tarjeta para ver cómo lo resuelve la plataforma.</p><ul class="reglas">' + r.map(function (x, i) {
        return '<li class="regla revelar" style="--retraso:' + (i * 60) + 'ms"><div class="regla__interior">' +
          '<div class="regla__cara regla__frente"><span class="regla__num" aria-hidden="true">' + dos(i + 1) + '</span><strong>' + esc(x.titulo) + '</strong><span class="regla__pista" aria-hidden="true">Ver detalle ↻</span></div>' +
          '<div class="regla__cara regla__reverso"><span class="regla__reverso-titulo" aria-hidden="true">' + esc(x.titulo) + '</span>' + (tieneContenido(x.detalle) ? '<p>' + esc(x.detalle) + '</p>' : '') + '</div></div>' +
          '<button type="button" class="regla__girar" aria-pressed="false"><span class="sr-only">Girar la tarjeta: ' + esc(x.titulo) + '</span></button></li>';
      }).join('') + '</ul>' : '');
    },
    // Gestión ágil.
    function (p, ctx) {
      const ga = p.gestionAgil || {};
      if (!tieneContenido(ga.historiasUsuario) && !tieneContenido(ga.sprints)) return '';
      const ex = p.extras || {};
      const detalle = conContenido(ex.sprints);
      const sprints = detalle.length ? '<ol class="sprints-v">' + detalle.map(function (sp, i) {
        return '<li class="revelar" style="--retraso:' + (i * 60) + 'ms"><span class="sprints-v__num">' + dos(i + 1) + '</span><b>' + esc(sp.nombre) + '</b><p>' + esc(sp.objetivo) + '</p><small>' + esc(sp.historias || '') + '</small></li>';
      }).join('') + '</ol>' : (ga.sprints ? '<ol class="sprints">' + Array.from({ length: ga.sprints }, function (_, i) { return '<li>Sprint ' + (i + 1) + '</li>'; }).join('') + '</ol>' : '');
      const mo = conContenido(ex.moscow);
      const totalMo = mo.reduce(function (n, m) { return n + (m.valor || 0); }, 0);
      const moscow = mo.length && totalMo ? '<div class="moscow"><p class="moscow__titulo">Prioridad del backlog (MoSCoW)</p><div class="moscow__barra" role="img" aria-label="' + esc(mo.map(function (m) { return m.nombre + ': ' + m.valor; }).join(', ')) + '">' +
        mo.map(function (m, i) { return '<span class="moscow__tramo moscow__tramo--' + i + '" style="flex:' + m.valor + ' 0 0"><b>' + m.valor + '</b></span>'; }).join('') + '</div><ul class="moscow__ley">' +
        mo.map(function (m, i) { return '<li><i class="moscow__tramo--' + i + '"></i>' + esc(m.nombre) + ' · ' + m.valor + '</li>'; }).join('') + '</ul></div>' : '';
      const rq = ex.requerimientos;
      const reqs = rq ? '<dl class="reqs">' + [['funcionales', rq.funcionales, 'requerimientos funcionales'], ['no', rq.noFuncionales, 'requerimientos no funcionales'], ['reglas', rq.reglas, 'reglas de negocio']].filter(function (x) { return x[1]; }).map(function (x) {
        return '<div><dd>' + x[1] + '</dd><dt>' + x[2] + '</dt></div>';
      }).join('') + '</dl>' : '';
      return seccion(ctx, 'agil', 'Gestión ágil', '<dl class="cifras-ficha">' +
        (tieneContenido(ga.historiasUsuario) ? '<div><dt>historias de usuario</dt><dd>' + esc(ga.historiasUsuario) + '</dd></div>' : '') +
        (tieneContenido(ga.sprints) ? '<div><dt>sprints</dt><dd>' + esc(ga.sprints) + '</dd></div>' : '') + '</dl>' + reqs + moscow + sprints +
        (tieneContenido(ex.notaAgil) ? '<p class="sec__nota">' + esc(ex.notaAgil) + '</p>' : ''));
    },
    // Desarrollos (Nómina).
    function (p, ctx) {
      const d = conContenido((p.extras || {}).desarrollos);
      if (!d.length) return '';
      const cuerpo = d.map(function (x) {
        return '<article class="desarrollo" id="' + esc(x.id) + '"><span class="desarrollo__rotulo">' + esc(x.rotulo) + '</span>' +
          '<h3>' + esc(x.nombre) + '</h3><p class="desarrollo__modulo">Módulo «' + esc(x.modulo) + '» · ' + esc(x.descripcion) + '</p>' +
          '<div class="desarrollo__vistas">' + chips(x.vistas, '', 'Pantallas') + '</div>' +
          '<div class="desarrollo__tarjetas"><div class="tarjeta-dato"><span class="antetitulo">Backend</span><strong>' + esc(x.backend) + '</strong>' +
          (conContenido(x.modulosBackend).length ? '<p>Módulos: ' + esc(conContenido(x.modulosBackend).join(', ')) + '</p>' : '') + '</div></div>' +
          (x.ficha ? '<a class="boton boton--principal desarrollo__ir" href="' + esc(rutaProyecto(x.ficha, ctx.base)) + '">Ver la ficha de ' + esc(x.nombre) + ' →</a>' : '') + '</article>';
      }).join('') + (tieneContenido((p.extras || {}).baseNormativa) ? '<p class="sec__nota">Base normativa: ' + esc(p.extras.baseNormativa) + '</p>' : '');
      return seccion(ctx, 'desarrollos', 'Los dos desarrollos', cuerpo);
    },
    // Arquitectura: stack principal, todas las tecnologías (desplegable), diagramas y textos que no repiten a los diagramas.
    function (p, ctx) {
      const capas = conContenido(p.capas);
      const diagramas = renderDiagramas(p, ctx.base);
      const respaldo = diagramas || !capas.length ? '' : '<ol class="capas" aria-label="Capas de la arquitectura">' + capas.map(function (c, i) {
        return (i ? '<li class="capas__flecha" aria-hidden="true">→</li>' : '') + '<li class="capa capa--' + (i + 1) + '">' + (conContenido(c.logos).length ? '<p class="capa__logos">' + conContenido(c.logos).map(function (l) { return '<img src="' + esc(ruta(l, ctx.base)) + '" alt="">'; }).join('') + '</p>' : '') + '<p class="capa__rol">' + esc(c.rol) + '</p><p class="capa__nombre">' + esc(c.nombre) + '</p>' +
          (tieneContenido(c.detalle) ? '<p class="capa__detalle">' + esc(c.detalle) + '</p>' : '') + '</li>';
      }).join('') + '</ol>';
      const t = p.teoria || {};
      const textos = TEORIA.filter(function (x) { return tieneContenido(t[x.clave]); }).map(function (x) {
        return '<div><h3>' + esc(x.titulo) + '</h3>' + parrafos(t[x.clave], 'sec__texto') + '</div>';
      }).join('');
      const inicio = renderStack(p, ctx.base) + renderTodasTecnologias(p, ctx.base) + diagramas + respaldo;
      const breve = (p.extras || {}).arquitecturaBreve;
      if (breve) {
        // Versión sintetizada: petición de ejemplo animada + tarjetas; el texto completo queda plegado.
        const pet = breve.peticion || {};
        const pasos = conContenido(pet.pasos);
        const tuberia = pasos.length ? '<div class="peticion"><p class="peticion__titulo">' + esc(pet.titulo || 'Recorrido de una petición') + '</p>' +
          (tieneContenido(pet.ejemplo) ? '<p class="peticion__ejemplo">' + esc(pet.ejemplo) + '</p>' : '') +
          '<ol class="tuberia" style="--pasos:' + pasos.length + '">' + pasos.map(function (x, i) {
            return '<li style="--i:' + i + '"><span class="tuberia__num" aria-hidden="true">' + dos(i + 1) + '</span><strong>' + esc(x.nombre) + '</strong>' + (tieneContenido(x.detalle) ? '<small>' + esc(x.detalle) + '</small>' : '') + '</li>';
          }).join('') + '</ol></div>' : '';
        const tarjetas = conContenido(breve.tarjetas).map(function (d, i) {
          return '<li class="destacado destacado--' + (i % 6) + '"><span class="destacado__icono" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
            (ICONOS_RIEL[d.icono] || '<circle cx="12" cy="12" r="4"/>') + '</svg></span>' + (tieneContenido(d.rotulo) ? '<span class="destacado__rotulo">' + esc(d.rotulo) + '</span>' : '') +
            '<h3>' + esc(d.titulo) + '</h3>' + (tieneContenido(d.texto) ? '<p>' + esc(d.texto) + '</p>' : '') + '</li>';
        }).join('');
        return seccion(ctx, 'arquitectura', 'Arquitectura', inicio + tuberia + (tarjetas ? '<ul class="destacados destacados--dos">' + tarjetas + '</ul>' : '') +
          (textos ? '<details class="qpq-detalle"><summary>Leer el detalle completo</summary><div class="bloques-texto" style="margin-top:var(--sp-5)">' + textos + '</div></details>' : ''));
      }
      return seccion(ctx, 'arquitectura', 'Arquitectura', inicio + (textos ? '<div class="bloques-texto" style="margin-top:var(--sp-6)">' + textos + '</div>' : ''));
    },
    // Archivos modificados (proyectos que personalizan software existente).
    function (p, ctx) {
      const a = conContenido((p.extras || {}).archivos).filter(function (x) { return tieneContenido(x.archivo); });
      return seccion(ctx, 'archivos', 'Archivos modificados', a.length ? tabla(a.map(function (x) {
        return { archivo: '<code>' + esc(x.archivo) + '</code>', mesa: x.mesa, cambio: x.cambio };
      }), [{ clave: 'archivo', titulo: 'Archivo', html: true }, { clave: 'mesa', titulo: 'Mesa' }, { clave: 'cambio', titulo: 'Qué cambió' }], 'Archivos modificados') : '');
    },
    // Módulos del backend: tabla si hay detalle, chips si solo hay nombres.
    function (p, ctx) {
      const m = conContenido(p.modulos);
      if (!m.length) return '';
      const conDetalle = m.some(function (x) { return tieneContenido(x.responsabilidad) || tieneContenido(x.entidades) || tieneContenido(x.endpoints); });
      const cuerpo = conDetalle ? tabla(m.map(function (x) {
        return { nombre: x.nombre, responsabilidad: x.responsabilidad, entidades: x.entidades, endpoints: tieneContenido(x.endpoints) ? '<code>' + esc(x.endpoints) + '</code>' : '' };
      }), [
        { clave: 'nombre', titulo: 'Módulo' }, { clave: 'responsabilidad', titulo: 'Responsabilidad' },
        { clave: 'entidades', titulo: 'Entidades' }, { clave: 'endpoints', titulo: 'Endpoints', html: true }
      ], 'Módulos del backend') : '<p class="sec__nota">Módulos de NestJS en src/ del backend.</p>' + chips(m.map(function (x) { return x.nombre; }), 'chip--codigo');
      return seccion(ctx, 'modulos', 'Módulos del backend', cuerpo);
    },
    // Modelo de datos.
    function (p, ctx) {
      const md = p.modeloDatos || {};
      const resumen = datos([
        { etiqueta: 'Motor', valor: md.motor }, { etiqueta: 'ORM', valor: md.orm },
        { etiqueta: 'Migraciones', valor: md.migraciones }, { etiqueta: 'Datos semilla', valor: md.seeds }
      ]);
      return seccion(ctx, 'modelo-datos', 'Modelo de datos', (resumen ? '<div class="modelo-resumen">' + resumen + '</div>' : '') + (conContenido(md.entidades).length ? '<div style="margin-top:var(--sp-5)">' + tabla(md.entidades, [
        { clave: 'nombre', titulo: 'Entidad' }, { clave: 'campos', titulo: 'Campos principales' }, { clave: 'relaciones', titulo: 'Relaciones' }
      ], 'Entidades del modelo de datos') + '</div>' : ''));
    },
    // Despliegue y versiones: mapa del servidor, variables agrupadas, repositorios y convención de commits.
    function (p, ctx) {
      const d = p.despliegue || {};
      const h = p.herramientas || {};
      const conDiagrama = !!((p.diagramas || {}).despliegue);
      const destinos = conContenido(d.destinos);
      const cuerpo = (destinos.length ? renderServidor(d, ctx.base) : renderDespliegueBasico(d, conDiagrama)) +
        renderVariables(d.variablesEntorno) +
        (!conDiagrama && tieneContenido(h.estrategiaRamas) ? sub('Estrategia de ramas', parrafos(h.estrategiaRamas, 'sec__texto')) : '') +
        renderWorkflows(conDiagrama ? [] : conContenido(h.actions)) +
        sub('Otras herramientas', chips(h.otras)) +
        renderRepositorios(p.repositorios, ctx.base) +
        renderCommits(h);
      return seccion(ctx, 'despliegue', 'Despliegue y versiones', cuerpo);
    },
    // Calidad y seguridad: pruebas y la lista única de medidas de seguridad.
    function (p, ctx) {
      const c = p.calidad || {};
      const lista = function (x) { const v = conContenido(x); return v.length ? '<ul class="sec__texto">' + v.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>' : ''; };
      return seccion(ctx, 'calidad', 'Calidad y seguridad', sub('Pruebas', parrafos(c.pruebas, 'sec__texto')) +
        sub('Seguridad', lista(c.seguridad)) + sub('Rendimiento', lista(c.rendimiento)) + sub('Accesibilidad', lista(c.accesibilidad)));
    },
    // Hitos.
    function (p, ctx) {
      const h = conContenido(p.hitos).filter(function (x) { return tieneContenido(x.descripcion); })
        .sort(function (a, b) { return String(a.fecha).localeCompare(String(b.fecha)); });
      return seccion(ctx, 'hitos', 'Hitos', h.length ? '<ol class="hitos">' + h.map(function (x) {
        const f = aFecha(x.fecha);
        return '<li class="hito">' + (f ? '<time datetime="' + aIso(f) + '">' + esc(formatearFecha(x.fecha)) + '</time>' : '') + '<p>' + esc(x.descripcion) + '</p></li>';
      }).join('') + '</ol>' : '');
    },
    // Comparativa de identidades (Rally Living Lab).
    function (p, ctx) {
      const otro = (p.extras || {}).comparativa;
      if (!otro) return '';
      return seccion(ctx, 'identidades', 'Un código, dos identidades', '<div class="comparativa">' +
        '<div class="comparativa__lado comparativa__lado--neo"><span class="antetitulo">Rally Neotomasino</span><div class="comparativa__paleta" aria-hidden="true"><span style="background:#00336a"></span><span style="background:#f39200"></span><span style="background:#fff1dc;border:1px solid #e7d3b3"></span><span style="background:#7eb20b"></span></div><p>Poppins · radios de 6 a 10 px · sellos por dependencia</p></div>' +
        '<div class="comparativa__lado comparativa__lado--ll"><span class="antetitulo">Rally Living Lab</span><div class="comparativa__paleta" aria-hidden="true"><span style="background:#2c56fc"></span><span style="background:#b5d334"></span><span style="background:#ffffff;border:1px solid #c7d2fe"></span><span style="background:#121212"></span></div><p>Nunito · formas redondeadas · sellos por etapa del método</p></div>' +
        '</div><p class="sec__nota">Mismo frontend y backend; la identidad se cambia en src/styles/theme.css y src/lib/theme.js.</p>');
    },
    // Proyecto relacionado.
    function (p, ctx) {
      const rel = (p.extras || {}).relacionado;
      const otro = rel && (window.PROYECTOS || []).find(function (x) { return x.id === rel; });
      if (!otro) return '';
      const logo = otro.id === 'rally-living-lab' || otro.id === 'camina' ? '<img src="' + esc(ruta('assets/img/marcas/rally-living-lab-logo.png', ctx.base)) + '" alt="">' : '';
      return seccion(ctx, 'relacionado', 'Proyecto relacionado', '<a class="relacionado" href="' + esc(rutaProyecto(otro.id, ctx.base)) + '">' + logo +
        '<strong>' + esc((otro.identidad || {}).nombreCorto || otro.nombre) + ' →</strong></a>');
    },
    // Galería de capturas.
    function (p, ctx) {
      const cap = conContenido(p.capturas).filter(function (c) { return ruta(c.src, ctx.base); });
      return seccion(ctx, 'capturas', 'Capturas', cap.length ? '<ul class="galeria">' + cap.map(function (c) {
        const src = ruta(c.src, ctx.base);
        const alt = tieneContenido(c.alt) ? c.alt : (c.pie || 'Captura de ' + p.nombre);
        return '<li><figure><button type="button" class="galeria__boton" data-src="' + esc(src) + '" data-alt="' + esc(alt) + '" data-pie="' + esc(c.pie || '') + '" aria-label="Ampliar: ' + esc(alt) + '">' +
          '<img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy"></button>' + (tieneContenido(c.pie) ? '<figcaption>' + esc(c.pie) + '</figcaption>' : '') + '</figure></li>';
      }).join('') + '</ul>' : '');
    }
  ];

  /* ---------------------------------------------------------------------
   * Logos de tecnologías (Devicon y Simple Icons, en assets/img/tecnologias/)
   * ------------------------------------------------------------------- */

  // Prefijo del nombre de la tecnología → archivo del logo. Los más largos van primero.
  const LOGOS = [
    ['react router', 'reactrouter'], ['react', 'react'], ['vite', 'vite'], ['typescript', 'typescript'],
    ['javascript', 'javascript'], ['nestjs', 'nestjs'], ['node', 'nodedotjs'], ['mariadb', 'mariadb'],
    ['mysql', 'mysql'], ['typeorm', 'typeorm'], ['angular', 'angular'], ['github actions', 'githubactions'],
    ['github', 'github'], ['cpanel', 'cpanel'], ['pm2', 'pm2'], ['swagger', 'swagger'], ['docker', 'docker'],
    ['jest', 'jest'], ['pnpm', 'pnpm'], ['passport', 'passport'], ['jwt', 'jsonwebtokens'],
    ['2 jwt', 'jsonwebtokens'], ['axios', 'axios'], ['postman', 'postman'], ['eslint', 'eslint'],
    ['prettier', 'prettier'], ['pwa', 'pwa'], ['supabase', 'supabase'], ['vitest', 'vitest'], ['php', 'php'],
    ['python', 'python'], ['fastapi', 'fastapi'], ['pandas', 'pandas'], ['sass', 'sass'], ['scss', 'sass'],
    ['bootstrap', 'bootstrap'], ['jquery', 'jquery'], ['wordpress', 'wordpress'], ['html', 'html'], ['css', 'css'],
    ['excel', 'excel'], ['microsoft', 'microsoft']
  ];

  // Devuelve el archivo del logo de una tecnología, o "" si no hay.
  function archivoLogo(nombre) {
    const n = String(nombre || '').trim().toLowerCase();
    const hit = LOGOS.find(function (l) { return n === l[0] || n.indexOf(l[0] + ' ') === 0 || n.indexOf(l[0]) === 0 && /[^a-z]/.test(n.charAt(l[0].length) || ' '); });
    return hit ? hit[1] : '';
  }

  // Logo como <img> decorativo; si no existe, un monograma con la inicial.
  function logoTec(nombre, base, clase) {
    const a = archivoLogo(nombre);
    if (a) return '<img class="' + (clase || 'logo-tec') + '" src="' + esc(ruta('assets/img/tecnologias/' + a + '.svg', base)) + '" alt="" aria-hidden="true">';
    return '<span class="' + (clase || 'logo-tec') + ' logo-tec--monograma" aria-hidden="true">' + esc(String(nombre || '?').trim().charAt(0).toUpperCase()) + '</span>';
  }

  // Franja "Stack principal": logo, nombre, versión (tomada de tecnologias) y papel en el proyecto.
  function renderStack(p, base) {
    const stack = conContenido(p.stackPrincipal);
    if (!stack.length) return '';
    const tecs = conContenido(p.tecnologias);
    return '<div class="stack"><p class="stack__titulo">Stack principal</p><ul class="stack__lista">' + stack.map(function (s) {
      const t = tecs.find(function (x) { return String(x.nombre).toLowerCase() === String(s.nombre).toLowerCase(); }) || {};
      const version = s.version || t.version;
      return '<li class="stack__item"><span class="stack__logo">' + logoTec(s.nombre, base, 'stack__img') + '</span>' +
        '<span class="stack__texto"><b>' + esc(s.nombre) + '</b>' + (tieneContenido(version) && /^\d/.test(version) ? ' <small>' + esc(version) + '</small>' : '') +
        (tieneContenido(s.rol) ? '<em>' + esc(s.rol) + '</em>' : '') + '</span></li>';
    }).join('') + '</ul></div>';
  }

  // Todas las tecnologías agrupadas por categoría; desplegable si ya hay stack principal.
  function renderTodasTecnologias(p, base) {
    const tecs = conContenido(p.tecnologias).filter(function (x) { return tieneContenido(x.nombre); });
    if (!tecs.length) return '';
    const claves = CATEGORIAS.map(function (c) { return c.clave; });
    const grupos = CATEGORIAS.concat([{ clave: '_', etiqueta: 'Otras', chip: '' }]).map(function (c) {
      const items = tecs.filter(function (x) { return c.clave === '_' ? claves.indexOf(x.categoria) === -1 : x.categoria === c.clave; });
      if (!items.length) return '';
      return '<div class="grupo-tec"><h3>' + esc(c.etiqueta) + '</h3>' + chips(items.map(function (x) {
        // Un logo declarado en los datos manda sobre el que se deduce del nombre.
        const logo = x.logo ? '' : (archivoLogo(x.nombre) ? logoTec(x.nombre, base, 'chip__logo') : '');
        return { texto: x.nombre, extra: x.version, titulo: x.uso, clase: c.chip, logo: logo, img: ruta(x.logo, base) };
      })) + '</div>';
    }).join('');
    const rejilla = '<div class="grupos-tec">' + grupos + '</div>';
    if (!conContenido(p.stackPrincipal).length) return rejilla;
    return '<details class="todas-tec"><summary>Ver las ' + tecs.length + ' tecnologías y versiones</summary>' + rejilla + '</details>';
  }

  /* ---------------------------------------------------------------------
   * Despliegue y versiones (componentes visuales)
   * ------------------------------------------------------------------- */

  // Mapa del servidor: marco de la plataforma con una tarjeta por destino (frontend, API…).
  function renderServidor(d, base) {
    const destinos = conContenido(d.destinos);
    const evid = String(d.evidencia || '').split('·').map(function (x) { return x.trim(); }).filter(Boolean);
    return '<div class="srv"><div class="srv__cabeza"><span class="srv__logo">' + logoTec(d.plataforma || 'cPanel', base, 'srv__img') + '</span>' +
      '<div><p class="srv__nombre">' + esc(d.plataforma || '') + '</p>' + (tieneContenido(d.servidor) ? '<p class="srv__detalle">' + esc(d.servidor) + '</p>' : '') + '</div></div>' +
      '<ul class="srv__destinos">' + destinos.map(function (x) {
        const filas = [
          ['Ruta', x.ruta, true],
          [x.proceso ? 'Proceso PM2' : 'Servido por', x.proceso || x.servidor, !!x.proceso],
          ['Arranque', x.script, true]
        ].filter(function (f) { return tieneContenido(f[1]); });
        return '<li class="destino"><p class="destino__capa">' + logoTec(x.tecnologia || x.capa, base, 'destino__img') + esc(x.capa) + '</p>' +
          '<p class="destino__nombre">' + esc(x.nombre) + '</p>' +
          (filas.length ? '<dl class="destino__datos">' + filas.map(function (f) {
            return '<div><dt>' + esc(f[0]) + '</dt><dd>' + (f[2] ? '<code>' + esc(f[1]) + '</code>' : esc(f[1])) + '</dd></div>';
          }).join('') + '</dl>' : '') +
          (tieneContenido(x.ruta) ? '' : '<p class="destino__pendiente">Ruta en el servidor por confirmar</p>') + '</li>';
      }).join('') + '</ul>' +
      (evid.length ? '<div class="srv__evidencia"><p>Evidencia en el repositorio</p><ul>' + evid.map(function (e) {
        return '<li><span aria-hidden="true">▤</span><code>' + esc(e) + '</code></li>';
      }).join('') + '</ul></div>' : '') + '</div>';
  }

  // Bloque de despliegue anterior, para fichas sin destinos estructurados.
  function renderDespliegueBasico(d, conDiagrama) {
    const pm2 = d.pm2 || {};
    const comandos = conDiagrama ? [] : [d.comandoBuild, d.comandoStart].filter(tieneContenido);
    const interior = datos([
      { etiqueta: 'Rutas en el servidor', valor: d.servidorWeb, codigo: true },
      { etiqueta: 'Proceso PM2', valor: pm2.proceso, codigo: true },
      { etiqueta: 'Script', valor: pm2.script, codigo: true },
      { etiqueta: 'Modo', valor: pm2.modo }, { etiqueta: 'Instancias', valor: pm2.instancias },
      { etiqueta: 'Logs', valor: pm2.logs, codigo: true },
      { etiqueta: 'Puerto', valor: d.puerto, codigo: true }, { etiqueta: 'CORS', valor: d.cors, codigo: true },
      { etiqueta: 'Evidencia en el repositorio', valor: d.evidencia, codigo: true }
    ]) + (comandos.length ? '<div><p class="despliegue__sub">Comandos</p><pre><code>' + comandos.map(function (c) { return '<b>$</b> ' + esc(c); }).join('\n') + '</code></pre></div>' : '');
    if (!tieneContenido(d.plataforma) && !interior) return '';
    return '<div class="despliegue">' + (tieneContenido(d.plataforma) ? '<p class="despliegue__plataforma"><span class="antetitulo">Plataforma</span><strong>' + esc(d.plataforma) + '</strong></p>' : '') + interior + '</div>';
  }

  // Grupos de variables de entorno según su prefijo (el orden importa: el primero que coincide gana).
  const GRUPOS_VARIABLES = [
    ['Servidor', /^(NODE_ENV|PORT|FRONTEND_URL|VITE_API_URL)$/],
    ['Base de datos', /^DB_/],
    ['Correo', /^(MAIL_|SMTP_)/],
    ['Reglas del rally', /^(RALLY_|COOLDOWN|CODE_|CHALLENGE_)/],
    ['Sesiones y cuentas', /(JWT|SECRET|ADMIN|RESET|TOTP|TENANT|CLIENT_ID|APPLICATION_ID|DEV_)/],
    ['Otras', /./]
  ];

  // Variables de entorno agrupadas por función; solo nombres.
  function renderVariables(lista) {
    const vars = conContenido(lista);
    if (!vars.length) return '';
    const grupos = GRUPOS_VARIABLES.map(function (g) { return { nombre: g[0], re: g[1], items: [] }; });
    vars.forEach(function (v) { grupos.find(function (g) { return g.re.test(v); }).items.push(v); });
    return sub('Variables de entorno', '<p class="sec__nota" style="margin-bottom:var(--sp-3)">Solo se listan los nombres; los valores viven en el servidor y nunca en el repositorio.</p>' +
      '<div class="vars">' + grupos.filter(function (g) { return g.items.length; }).map(function (g) {
        return '<div class="vars__grupo"><p class="vars__titulo">' + esc(g.nombre) + ' <span>' + g.items.length + '</span></p><ul>' +
          g.items.map(function (v) { return '<li><code>' + esc(v) + '</code></li>'; }).join('') + '</ul></div>';
      }).join('') + '</div>');
  }

  // Workflows de GitHub Actions (solo si no hay diagrama de despliegue).
  function renderWorkflows(wf) {
    return sub('Workflows de GitHub Actions', wf.length ? '<ul class="workflows">' + wf.map(function (w) {
      return '<li class="workflow"><div class="workflow__cabeza"><strong>' + esc(w.nombre) + '</strong>' + (tieneContenido(w.disparador) ? '<code>' + esc(w.disparador) + '</code>' : '') + '</div>' +
        (tieneContenido(w.automatiza) ? '<p>' + esc(w.automatiza) + '</p>' : '') + '</li>';
    }).join('') + '</ul>' : '');
  }

  // Repositorios como tarjetas: nombre, commits destacados y rango de fechas.
  function renderRepositorios(lista, base) {
    const repos = conContenido(lista).filter(function (r) { return tieneContenido(r.nombre); });
    if (!repos.length) return '';
    return sub('Repositorios', '<ul class="repos">' + repos.map(function (r) {
      const nombre = urlExterna(r.url) ? enlaceExterno(r.url, r.nombre) : esc(r.nombre);
      const desde = fechaCorta(r.primerCommit);
      const hasta = fechaCorta(r.ultimoCommit);
      return '<li class="repo"><div class="repo__cabeza">' + logoTec('GitHub', base, 'repo__img') + '<p class="repo__nombre">' + nombre + '</p></div>' +
        (tieneContenido(r.commits) ? '<p class="repo__commits"><strong>' + esc(num(r.commits)) + '</strong> commits</p>' : '') +
        (desde || hasta ? '<p class="repo__fechas">' + esc(desde) + (hasta && hasta !== desde ? ' → ' + esc(hasta) : '') + (aFecha(r.ultimoCommit) ? ' de ' + aFecha(r.ultimoCommit).getFullYear() : '') + '</p>' : '') + '</li>';
    }).join('') + '</ul>' + (tieneContenido(repos[0].nota) ? '<p class="sec__nota">' + esc(repos[0].nota) + '</p>' : ''));
  }

  // Convención de commits con ejemplos reales del historial, al estilo de git log.
  function renderCommits(h) {
    const ejemplos = conContenido(h.ejemplosCommits);
    if (!tieneContenido(h.convencionCommits) && !ejemplos.length) return '';
    const linea = function (c) {
      const m = /^([a-z]+)(\([^)]*\))?(!)?:\s*(.*)$/.exec(c.mensaje || '');
      const tipo = m ? m[1] : '';
      return '<li class="gitlog__fila"><code class="gitlog__hash">' + esc(c.hash || '') + '</code>' +
        (tipo ? '<span class="gitlog__tipo gitlog__tipo--' + esc(tipo) + '">' + esc(tipo) + '</span>' : '') +
        '<span class="gitlog__msg">' + (m && m[2] ? '<b>' + esc(m[2]) + '</b> ' : '') + esc(m ? m[4] : c.mensaje) + '</span>' +
        (tieneContenido(c.fecha) ? '<time class="gitlog__fecha" datetime="' + esc(c.fecha) + '">' + esc(fechaCorta(c.fecha)) + '</time>' : '') + '</li>';
    };
    return sub('Convención de commits', parrafos(h.convencionCommits, 'sec__texto') +
      (ejemplos.length ? '<div class="gitlog"><p class="gitlog__cabeza"><span aria-hidden="true">●●●</span> git log --oneline · ejemplos reales</p><ul>' + ejemplos.map(linea).join('') + '</ul></div>' : ''));
  }

  /* ---------------------------------------------------------------------
   * Diagramas de arquitectura (carrusel de vistas)
   * ------------------------------------------------------------------- */

  // Vista de contexto: carriles de usuarios → cliente → servidor → datos, unidos por conectores rotulados.
  function vistaContexto(c, base) {
    const cols = conContenido(c.columnas);
    if (!cols.length) return '';
    const conectores = c.conectores || [];
    let html = '';
    cols.forEach(function (col, i) {
      html += '<div class="dg-carril dg-carril--' + i + '"><p class="dg-carril__titulo">' + esc(col.titulo) + '</p>' +
        conContenido(col.nodos).map(function (n) {
          return '<div class="dg-nodo' + (n.tipo ? ' dg-nodo--' + esc(n.tipo) : '') + '"><p class="dg-nodo__nombre">' + esc(n.nombre) + '</p>' +
            (tieneContenido(n.detalle) ? '<p class="dg-nodo__detalle">' + esc(n.detalle) + '</p>' : '') +
            (conContenido(n.etiquetas).length ? '<ul class="dg-nodo__etiquetas">' + conContenido(n.etiquetas).map(function (e) {
              return '<li>' + (archivoLogo(e) ? logoTec(e, base, 'dg-logo') : '') + esc(e) + '</li>';
            }).join('') + '</ul>' : '') +
            (tieneContenido(n.aloja) ? '<p class="dg-nodo__aloja"><span aria-hidden="true">⌂</span> ' + esc(n.aloja) + '</p>' : '') + '</div>';
        }).join('') + '</div>';
      if (i < cols.length - 1) {
        html += '<div class="dg-conector" role="presentation"><span class="dg-conector__linea" aria-hidden="true"></span>' +
          (tieneContenido(conectores[i]) ? '<span class="dg-conector__rotulo">' + esc(conectores[i]) + '</span>' : '') + '</div>';
      }
    });
    const plantilla = 'repeat(' + (cols.length - 1) + ', minmax(0, 1fr) 4.75rem) minmax(0, 1fr)';
    return '<div class="dg-contexto" style="grid-template-columns:' + plantilla + '">' + html + '</div>' +
      (tieneContenido(c.nota) ? '<p class="sec__nota dg-nota">' + esc(c.nota) + '</p>' : '');
  }

  // Vista de flujo: secuencia numerada de una petición real, coloreada por capa.
  function vistaPeticion(f) {
    const pasos = conContenido(f.pasos);
    if (!pasos.length) return '';
    const capas = { cliente: 'Cliente', seguridad: 'Seguridad', aplicacion: 'Aplicación', datos: 'Datos' };
    const leyenda = Object.keys(capas).filter(function (k) { return pasos.some(function (x) { return x.capa === k; }); });
    return (tieneContenido(f.titulo) ? '<p class="dg-escenario"><span>Escenario</span> ' + esc(f.titulo) + '</p>' : '') +
      '<ol class="dg-flujo">' + pasos.map(function (x, i) {
        return '<li class="dg-paso dg-paso--' + esc(x.capa || 'aplicacion') + '"><span class="dg-paso__num" aria-hidden="true">' + (i + 1) + '</span>' +
          '<div><p class="dg-paso__nombre">' + esc(x.nombre) + ' <span class="dg-paso__capa">' + esc(capas[x.capa] || '') + '</span></p>' +
          (tieneContenido(x.detalle) ? '<p class="dg-paso__detalle">' + esc(x.detalle) + '</p>' : '') + '</div></li>';
      }).join('') + '</ol>' +
      '<ul class="dg-leyenda" aria-label="Capas">' + leyenda.map(function (k) { return '<li class="dg-paso--' + k + '"><span aria-hidden="true"></span>' + capas[k] + '</li>'; }).join('') + '</ul>';
  }

  // Vista de despliegue: etapas del pipeline, de la rama al servidor.
  function vistaDespliegue(d) {
    const etapas = conContenido(d.etapas);
    if (!etapas.length) return '';
    return '<ol class="dg-pipeline">' + etapas.map(function (e, i) {
      return '<li class="dg-etapa"><p class="dg-etapa__num" aria-hidden="true">' + dos(i + 1) + '</p><p class="dg-etapa__nombre">' + esc(e.nombre) + '</p>' +
        (tieneContenido(e.lugar) ? '<p class="dg-etapa__lugar">' + esc(e.lugar) + '</p>' : '') +
        (conContenido(e.items).length ? '<ul>' + conContenido(e.items).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : '') + '</li>';
    }).join('') + '</ol>' + (tieneContenido(d.nota) ? '<p class="sec__nota dg-nota">' + esc(d.nota) + '</p>' : '');
  }

  // Carrusel con las vistas disponibles; pestañas y flechas (activadas en activarCarruseles).
  function renderDiagramas(p, base) {
    const d = p.diagramas || {};
    const vistas = [
      { id: 'contexto', titulo: 'Contexto', subtitulo: 'Qué piezas hay y cómo se comunican', html: d.contexto ? vistaContexto(d.contexto, base) : '' },
      { id: 'peticion', titulo: 'Flujo de una petición', subtitulo: 'Qué pasa por dentro', html: d.peticion ? vistaPeticion(d.peticion) : '' },
      { id: 'despliegue', titulo: 'Despliegue', subtitulo: 'Cómo llega el código a producción', html: d.despliegue ? vistaDespliegue(d.despliegue) : '' }
    ].filter(function (v) { return v.html; });
    if (!vistas.length) return '';
    const pref = 'dg-' + esc(p.id);
    return '<div class="carrusel" data-carrusel>' +
      '<div class="carrusel__barra"><div class="carrusel__pestanas" role="tablist" aria-label="Vistas de la arquitectura">' +
      vistas.map(function (v, i) {
        return '<button type="button" role="tab" class="carrusel__pestana" id="' + pref + '-t-' + v.id + '" aria-controls="' + pref + '-p-' + v.id + '" aria-selected="' + (i === 0) + '"' + (i ? ' tabindex="-1"' : '') + '>' +
          '<span class="carrusel__n" aria-hidden="true">' + (i + 1) + '</span>' + esc(v.titulo) + '</button>';
      }).join('') + '</div>' +
      (vistas.length > 1 ? '<div class="carrusel__flechas"><button type="button" class="carrusel__flecha" data-dir="-1" aria-label="Vista anterior">‹</button>' +
        '<span class="carrusel__contador" aria-hidden="true"><b>1</b> / ' + vistas.length + '</span>' +
        '<button type="button" class="carrusel__flecha" data-dir="1" aria-label="Vista siguiente">›</button></div>' : '') + '</div>' +
      vistas.map(function (v, i) {
        return '<div class="carrusel__panel" role="tabpanel" id="' + pref + '-p-' + v.id + '" aria-labelledby="' + pref + '-t-' + v.id + '" tabindex="0"' + (i ? ' data-oculto' : '') + '>' +
          '<p class="carrusel__subtitulo"><b>' + esc(v.titulo) + '.</b> ' + esc(v.subtitulo) + '</p>' + v.html + '</div>';
      }).join('') + '</div>';
  }

  // Activa pestañas, flechas y teclado de los carruseles de diagramas.
  function activarCarruseles(raizDom) {
    (raizDom || document).querySelectorAll('[data-carrusel]').forEach(function (c) {
      const tabs = Array.prototype.slice.call(c.querySelectorAll('[role="tab"]'));
      const panels = Array.prototype.slice.call(c.querySelectorAll('[role="tabpanel"]'));
      const contador = c.querySelector('.carrusel__contador b');
      let actual = 0;
      const ir = function (i, foco) {
        actual = (i + tabs.length) % tabs.length;
        tabs.forEach(function (t, k) {
          t.setAttribute('aria-selected', String(k === actual));
          t.tabIndex = k === actual ? 0 : -1;
          panels[k].hidden = k !== actual;
        });
        if (contador) contador.textContent = String(actual + 1);
        if (foco) tabs[actual].focus();
      };
      c.classList.add('carrusel--activo');
      tabs.forEach(function (t, k) { t.addEventListener('click', function () { ir(k); }); });
      c.querySelectorAll('.carrusel__flecha').forEach(function (b) {
        b.addEventListener('click', function () { ir(actual + Number(b.getAttribute('data-dir'))); });
      });
      c.querySelector('[role="tablist"]').addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); ir(actual + 1, true); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); ir(actual - 1, true); }
        if (e.key === 'Home') { e.preventDefault(); ir(0, true); }
        if (e.key === 'End') { e.preventDefault(); ir(tabs.length - 1, true); }
      });
      let x0 = null;
      c.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      c.addEventListener('touchend', function (e) {
        if (x0 === null) return;
        const dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 60 && !e.target.closest('.dg-contexto, .dg-pipeline')) ir(actual + (dx < 0 ? 1 : -1));
        x0 = null;
      }, { passive: true });
      ir(0);
    });
  }

  // Devuelve el HTML completo de una ficha: héroe del tema, índice y secciones.
  function renderProyecto(id, proyectos, base) {
    const lista = proyectos || window.PROYECTOS || [];
    const r = base || raiz();
    const p = lista.find(function (x) { return x.id === id; });
    if (!p) return '<div class="contenedor"><p class="aviso">No se encontró el proyecto «' + esc(id) + '» en data/proyectos.js.</p></div>';
    const t = tema(p);
    const clave = (p.identidad || {}).tema || 'base';
    const ctx = { n: 0, tema: t, base: r };
    const cuerpo = SECCIONES.map(function (fn) { return fn(p, ctx); }).join('') ||
      '<p class="aviso">La ficha de este frente todavía no tiene contenido. Se completa en <code>data/proyectos.js</code>.</p>';
    const heroFn = HEROES[clave];
    const hero = heroFn ? heroFn(p, r) : '<div class="contenedor hero__interior">' + migas(p, r) + '<h1>' + esc(p.nombre) + '</h1></div>';
    const indice = '<aside class="indice-caja" aria-label="Secciones de la ficha"></aside>';
    if (t.heroDentro) {
      return '<div class="contenedor ficha__cuerpo con-indice">' + indice + '<div class="con-indice__cuerpo"><header class="hero hero--' + esc(clave) + '">' + hero + '</header>' + cuerpo + '</div></div>';
    }
    return '<header class="hero hero--' + esc(clave) + '">' + hero + '</header>' +
      '<div class="contenedor ficha__cuerpo con-indice">' + indice + '<div class="con-indice__cuerpo">' + cuerpo + '</div></div>';
  }

  // Enlaces al proyecto anterior y siguiente, con el color de cada uno.
  function renderPaginador(id, todos, base) {
    const yo = (todos || []).find(function (p) { return p.id === id; });
    if (yo && yo.padre) {
      const padre = todos.find(function (p) { return p.id === yo.padre; });
      const hermanos = todos.filter(function (p) { return p.padre === yo.padre; });
      const k = hermanos.indexOf(yo);
      const otro = hermanos[k + 1] || hermanos[k - 1];
      const c = function (p) { return (p.identidad || {}).color || '#00336a'; };
      return (padre ? '<a class="paginador__anterior" href="' + esc(rutaProyecto(padre.id, base)) + '" style="background:#ffffff;color:#00336a"><span>← Volver</span><strong>' + esc(padre.nombre) + '</strong></a>' : '') +
        (otro ? '<a class="paginador__siguiente" href="' + esc(rutaProyecto(otro.id, base)) + '" style="background:' + esc(c(otro)) + ';color:' + textoSobre(c(otro)) + '"><span>Otro desarrollo →</span><strong>' + esc((otro.identidad || {}).nombreCorto || otro.nombre) + '</strong></a>' : '');
    }
    const proyectos = principales(todos);
    const i = proyectos.findIndex(function (p) { return p.id === id; });
    if (i === -1) return '';
    const enlace = function (p, rotulo, clase) {
      const c = (p.identidad || {}).color || '#00336a';
      return '<a class="' + clase + '" href="' + esc(rutaProyecto(p.id, base)) + '" style="background:' + esc(c) + ';color:' + textoSobre(c) + '"><span>' + rotulo + '</span><strong>' + esc((p.identidad || {}).nombreCorto || p.nombre) + '</strong></a>';
    };
    const ant = proyectos[i - 1];
    const sig = proyectos[i + 1];
    return (ant ? enlace(ant, '← Anterior', 'paginador__anterior') : '<a class="paginador__anterior" href="' + esc(base) + 'index.html#proyectos" style="background:#ffffff;color:#00336a"><span>← Volver</span><strong>Todos los proyectos</strong></a>') +
      (sig ? enlace(sig, 'Siguiente →', 'paginador__siguiente') : '<a class="paginador__siguiente" href="' + esc(base) + 'index.html#proyectos" style="background:#00336a;color:#ffffff"><span>Volver →</span><strong>Todos los proyectos</strong></a>');
  }

  /* ---------------------------------------------------------------------
   * Cronograma
   * ------------------------------------------------------------------- */

  // Cifra principal y barra de horas de la cabecera del cronograma.
  function renderCabeceraCronograma(cron) {
    const meta = cron.metaHoras || 0;
    const hechas = cron.horasAcumuladas || 0;
    const pct = meta ? (hechas / meta) * 100 : 0;
    const meses = (cron.meses || []).filter(function (m) { return m.horas > 0; });
    const colores = ['#004f9f', '#009fe3', '#7fd0f1', '#fdc300'];
    return '<div class="crono-cifra"><p><strong>' + num(hechas) + '</strong><span> de ' + num(meta) + ' horas</span></p>' +
      '<p><b>' + num(pct) + ' %</b> de la meta' + (meta > hechas ? ' · faltan ' + num(meta - hechas) + ' h' : '') + '</p></div>' +
      '<div class="crono-barra" role="progressbar" aria-valuemin="0" aria-valuemax="' + esc(meta) + '" aria-valuenow="' + esc(hechas) + '" aria-valuetext="' + esc(num(hechas) + ' de ' + num(meta) + ' horas') + '">' +
      meses.map(function (m, i) {
        const c = colores[i % colores.length];
        return '<span style="flex:' + m.horas + ' 0 0;background:' + c + ';color:' + textoSobre(c) + '">' + esc(String(m.mes).slice(0, 3)) + '</span>';
      }).join('') + (meta > hechas ? '<span style="flex:' + (meta - hechas) + ' 0 0"></span>' : '') + '</div>';
  }

  // Tarjetas mensuales, tabla resumen y semanas de cada mes.
  function renderCronograma(cronograma) {
    const c = cronograma || window.CRONOGRAMA || { meses: [] };
    const meta = c.metaHoras || 0;
    const meses = c.meses || [];
    const max = Math.max.apply(null, meses.map(function (m) { return m.horas || 0; }).concat([1]));
    const tarjetas = '<ul class="meses">' + meses.map(function (m) {
      return '<li class="mes"><h3>' + esc(m.mes) + '</h3><div class="mes__columna" aria-hidden="true"><span style="height:' + Math.round(((m.horas || 0) / max) * 100) + '%"></span></div>' +
        '<p class="mes__horas">' + num(m.horas || 0) + '<small> h</small></p><p class="mes__acum">Acumulado ' + num(m.acumulado || 0) + ' h</p></li>';
    }).join('') + '</ul>';
    const tablaMeses = tabla(meses.map(function (m) {
      return { mes: m.mes + ' ' + m.anio, horas: num(m.horas || 0), acum: num(m.acumulado || 0), pct: meta ? num(((m.acumulado || 0) / meta) * 100) + ' %' : '' };
    }), [
      { clave: 'mes', titulo: 'Mes' }, { clave: 'horas', titulo: 'Horas del mes', clase: 'num' },
      { clave: 'acum', titulo: 'Acumulado', clase: 'num' }, { clave: 'pct', titulo: 'Avance de la meta', clase: 'num' }
    ], 'Resumen de horas por mes', '<tfoot><tr><th scope="row">Total</th><td class="num">' + num(c.horasAcumuladas || 0) + '</td><td class="num">' +
      num(c.horasAcumuladas || 0) + '</td><td class="num">' + (meta ? num(((c.horasAcumuladas || 0) / meta) * 100) + ' %' : '') + '</td></tr></tfoot>');
    const semanas = '<ol class="semanas-mes">' + meses.map(function (m) {
      const s = (m.semanas || []).filter(function (x) { return tieneContenido(x.horas) || tieneContenido(x.titulo) || tieneContenido(x.actividades); });
      return '<li><div><h3>' + esc(m.mes + ' ' + m.anio) + '</h3><p class="semanas-mes__meta">' + num(m.horas || 0) + ' h · acumulado ' + num(m.acumulado || 0) + ' h</p></div>' +
        (s.length ? '<ol class="semanas">' + s.map(function (x) {
          return '<li class="semana"><p class="semana__cabeza">' + esc(x.rango) + (tieneContenido(x.horas) ? '<span>' + num(x.horas) + ' h</span>' : '') + '</p>' +
            (tieneContenido(x.titulo) ? '<p class="semana__titulo">' + esc(x.titulo) + '</p>' : '') +
            (conContenido(x.actividades).length ? '<ul>' + conContenido(x.actividades).map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul>' : '') + '</li>';
        }).join('') + '</ol>' : '<p class="vacio">' + (m.horas > 0 ? 'Actividades semanales por registrar.' : 'Sin horas registradas todavía.') + '</p>') + '</li>';
    }).join('') + '</ol>';
    return '<section class="seccion" id="meses" aria-labelledby="meses-t"><h2 class="seccion__titulo" id="meses-t">Mes a mes</h2>' + tarjetas +
      '<div style="margin-top:var(--sp-5)">' + tablaMeses + '</div></section>' +
      '<section class="seccion" id="semanas" aria-labelledby="semanas-t"><h2 class="seccion__titulo" id="semanas-t">Actividades por semana</h2>' + semanas + '</section>';
  }

  // Diagrama de Gantt en HTML/CSS con posiciones en % calculadas desde las fechas.
  function renderGantt(proyectos, cronograma, general, base, hoy, soloCuerpo) {
    const lista = principales(proyectos || window.PROYECTOS);
    const c = cronograma || window.CRONOGRAMA || { meses: [] };
    const g = general || window.GENERAL || {};
    const r = base || raiz();
    const fechaHoy = hoy || new Date();
    const inicio = aFecha(c.inicio) || aFecha(g.periodo && g.periodo.inicio);
    const fin = aFecha(g.periodo && g.periodo.fin) || finDeUltimoMes(c.meses || []);
    if (!inicio || !fin || fin <= inicio) return '';
    const total = Math.round((fin - inicio) / DIA_MS) + 1;
    const pct = function (f) { return Math.min(100, Math.max(0, (Math.round((f - inicio) / DIA_MS) / total) * 100)); };
    const sig = function (f) { return new Date(f.getFullYear(), f.getMonth(), f.getDate() + 1); };

    const meses = [];
    let cur = new Date(inicio.getFullYear(), inicio.getMonth(), 1);
    while (cur <= fin) {
      const desde = cur < inicio ? inicio : cur;
      const prox = new Date(cur.getFullYear(), cur.getMonth() + 1, 1);
      meses.push({ nombre: MESES[cur.getMonth()], izq: pct(desde), ancho: pct(prox) - pct(desde) });
      cur = prox;
    }
    const hoyVisible = fechaHoy >= inicio && fechaHoy <= fin;
    const posHoy = hoyVisible ? pct(fechaHoy).toFixed(2) : null;
    const fondo = meses.slice(1).map(function (m) { return '<span class="gantt__division" style="left:' + m.izq.toFixed(2) + '%"></span>'; }).join('') +
      (hoyVisible ? '<span class="gantt__hoy" style="left:' + posHoy + '%"></span>' : '');
    const barra = function (a, b, color, abierta) {
      const izq = pct(a);
      const ancho = Math.max(pct(sig(b)) - izq, 0.8);
      const texto = abierta ? 'Desde el ' + formatearFecha(aIso(a)) + ', en curso' : formatearPeriodo({ inicio: aIso(a), fin: aIso(b) });
      const corto = abierta ? 'en curso' : (fechaCorta(aIso(a)) + ' – ' + fechaCorta(aIso(b)));
      return '<span class="gantt__barra' + (abierta ? ' gantt__barra--abierta' : '') + '" style="left:' + izq.toFixed(2) + '%;width:' + ancho.toFixed(2) + '%;background:' + color + ';color:' + textoSobre(color) + '" title="' + esc(texto) + '">' +
        '<span aria-hidden="true">' + esc(corto) + '</span><span class="sr-only">' + esc(texto) + '</span></span>';
    };
    // Plan de la propuesta (CRONOGRAMA.plan): semanas 1–16 → fechas reales.
    // Cada mes del plan empieza en la primera semana de ese mes en el cronograma.
    const plan = c.plan || {};
    const semanasPorMes = {};
    let idx = 0;
    (c.meses || []).forEach(function (m) {
      (m.semanas || []).forEach(function () {
        if (!(m.mes in semanasPorMes)) semanasPorMes[m.mes] = idx;
        idx += 1;
      });
    });
    const fechaSemana = function (n, alFinal) {
      const mes = conContenido(plan.meses)[Math.floor((n - 1) / 4)];
      if (!(mes in semanasPorMes)) return null;
      const lunes = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate() + 7 * (semanasPorMes[mes] + (n - 1) % 4));
      if (!alFinal) return lunes;
      const viernes = new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate() + 4);
      return viernes > fin ? fin : viernes;
    };
    const tramoPlan = function (p) {
      const ids = [p.id].concat((proyectos || window.PROYECTOS || []).filter(function (x) { return x.padre === p.id; }).map(function (x) { return x.id; }));
      const sems = [];
      conContenido(plan.fases).forEach(function (f) {
        if (ids.indexOf(f.proyecto) === -1) return;
        conContenido(f.actividades).forEach(function (a) { (a.semanas || []).forEach(function (n) { sems.push(n); }); });
      });
      if (!sems.length) return null;
      const a = fechaSemana(Math.min.apply(null, sems));
      const b = fechaSemana(Math.max.apply(null, sems), true);
      return a && b ? { a: a, b: b } : null;
    };
    const franja = function (t, color, conTexto) {
      const izq = pct(t.a);
      const ancho = Math.max(pct(sig(t.b)) - izq, 0.8);
      const texto = 'Plan de la propuesta: ' + formatearPeriodo({ inicio: aIso(t.a), fin: aIso(t.b) });
      return '<span class="gantt__plan" style="left:' + izq.toFixed(2) + '%;width:' + ancho.toFixed(2) + '%;--c:' + esc(color) + '" title="' + esc(texto) + '">' +
        (conTexto ? '<span aria-hidden="true">Plan · ' + esc(fechaCorta(aIso(t.a)) + ' – ' + fechaCorta(aIso(t.b))) + '</span>' : '') + '<span class="sr-only">' + esc(texto) + '</span></span>';
    };
    const filas = '<li class="gantt__fila"><span class="gantt__etiqueta">Periodo de pasantía</span><div class="gantt__pista">' + fondo + barra(inicio, fin, '#e6eef8') + '</div></li>' +
      lista.map(function (p) {
        const a = aFecha(p.periodo && p.periodo.inicio);
        const b = aFecha(p.periodo && p.periodo.fin);
        const color = (p.identidad || {}).color || '#004f9f';
        const t = tramoPlan(p);
        let cont = t ? franja(t, color, !a) : '<span class="gantt__pendiente">Fechas por definir</span>';
        if (a) {
          const hasta = b || (hoyVisible ? fechaHoy : fin);
          cont = (t ? franja(t, color, false) : '') + barra(a, hasta < a ? a : hasta, color, !b);
        }
        return '<li class="gantt__fila"><span class="gantt__etiqueta"><a href="' + esc(rutaProyecto(p.id, r)) + '">' + esc((p.identidad || {}).nombreCorto || p.nombre) + '</a></span><div class="gantt__pista">' + fondo + cont + '</div></li>';
      }).join('');
    const cabecera = '<div class="gantt__fila" aria-hidden="true"><span></span><div class="gantt__pista gantt__pista--meses">' + meses.map(function (m) {
      return '<span class="gantt__mes" style="left:' + m.izq.toFixed(2) + '%;width:' + m.ancho.toFixed(2) + '%">' + esc(m.nombre) + '</span>';
    }).join('') + (hoyVisible ? '<span class="gantt__hoy-rotulo" style="left:' + posHoy + '%">Hoy</span>' : '') + '</div></div>';
    const leyenda = conContenido(plan.fases).length ? '<p class="gantt__leyenda"><span class="gantt__leyenda-real"></span>Ejecución real, según las fechas de cada ficha<span class="gantt__leyenda-plan"></span>Plan de la propuesta (Tabla 2)</p>' : '';
    const cuerpoGantt = '<p class="seccion__entradilla">Del ' + esc(formatearFecha(aIso(inicio))) + ' al ' + esc(formatearFecha(aIso(fin))) + '. Cada barra lleva el color de su proyecto.</p>' + leyenda +
      '<div class="gantt-caja" role="region" tabindex="0" aria-label="Diagrama de Gantt de los proyectos"><div class="gantt">' + cabecera + '<ul class="gantt__filas">' + filas + '</ul></div></div>';
    if (soloCuerpo) return cuerpoGantt;
    return '<section class="seccion" id="gantt" aria-labelledby="gantt-t"><h2 class="seccion__titulo" id="gantt-t">Proyectos en el tiempo</h2>' +
      '<p class="seccion__entradilla">Del ' + esc(formatearFecha(aIso(inicio))) + ' al ' + esc(formatearFecha(aIso(fin))) + '. Cada barra lleva el color de su proyecto.</p>' +
      '<div class="gantt-caja" role="region" tabindex="0" aria-label="Diagrama de Gantt de los proyectos"><div class="gantt">' + cabecera + '<ul class="gantt__filas">' + filas + '</ul></div></div></section>';
  }

  // Héroe del cronograma: textos a la izquierda y anillo de horas por mes a la derecha.
  function renderCronoHero(cron, g, base) {
    const meta = cron.metaHoras || 0;
    const hechas = cron.horasAcumuladas || 0;
    const pct = meta ? Math.min(100, (hechas / meta) * 100) : 0;
    const meses = (cron.meses || []).filter(function (m) { return m.horas > 0; });
    const colores = ['#00336a', '#004f9f', '#009fe3', '#7fd0f1', '#fdc300'];
    const radio = 80;
    const largo = 2 * Math.PI * radio;
    let acumulado = 0;
    const arcos = meses.map(function (m, i) {
      const tramo = meta ? largo * (m.horas / meta) : 0;
      const arco = '<circle class="anillo__tramo" r="' + radio + '" cx="100" cy="100" stroke="' + colores[i % colores.length] + '" stroke-dasharray="' + tramo.toFixed(2) + ' ' + largo.toFixed(2) + '" stroke-dashoffset="' + (-acumulado).toFixed(2) + '" style="--retraso:' + (i * 180) + 'ms;--tramo:' + tramo.toFixed(2) + '"/>';
      acumulado += tramo;
      return arco;
    }).join('');
    const corte = aFecha(cron.fechaCorte);
    const cumplida = meta && hechas >= meta;
    const leyenda = '<ul class="anillo__leyenda">' + meses.map(function (m, i) {
      return '<li><i style="background:' + colores[i % colores.length] + '"></i>' + esc(m.mes) + '<b>' + num(m.horas) + ' h</b></li>';
    }).join('') + '</ul>';
    const periodo = (g.periodo && g.periodo.texto) || formatearPeriodo(g.periodo);
    return '<div class="contenedor hero__interior"><nav class="migas" aria-label="Ruta de navegación"><ol><li><a href="' + esc(base) + 'index.html">Inicio</a></li><li><span aria-current="page">Cronograma</span></li></ol></nav>' +
      '<div class="hero__rejilla"><div>' +
      '<p class="hero__marca-app"><img src="' + esc(ruta('assets/img/marcas/usta-escudo.webp', base)) + '" alt=""><span><b>Informe de pasantía</b><small>Santo Tomás · Tunja</small></span></p>' +
      '<p class="hero__rotulo">Dedicación horaria' + (cumplida ? ' · Meta cumplida' : '') + '</p><h1>Cronograma</h1>' +
      '<p class="hero__bajada">' + esc(num(hechas)) + ' horas de práctica en la Dirección de Comunicaciones' + (cumplida && corte ? ', completadas el ' + esc(formatearFecha(cron.fechaCorte)) : '') + '. Aquí está cómo se repartieron, qué se planeó en la propuesta y qué pasó semana a semana.</p>' +
      '<dl class="hero__datos"><div><dt>Periodo</dt><dd>' + esc(periodo) + '</dd></div><div><dt>Meta</dt><dd>' + esc(num(meta)) + ' horas</dd></div></dl></div>' +
      '<div class="anillo"><svg viewBox="0 0 200 200" role="img" aria-label="' + esc(num(hechas) + ' de ' + num(meta) + ' horas: ' + meses.map(function (m) { return m.mes + ' ' + num(m.horas); }).join(', ')) + '">' +
      '<circle class="anillo__fondo" r="' + radio + '" cx="100" cy="100"/>' + arcos + '</svg>' +
      '<div class="anillo__centro" aria-hidden="true"><b data-contar="' + hechas + '">' + num(hechas) + '</b><span>de ' + num(meta) + ' horas</span><em>' + num(pct) + ' %</em></div>' + leyenda + '</div>' +
      '</div></div>';
  }

  // Secciones del cronograma.
  function renderCronoSecciones(todos, cron, g, base) {
    const ctx = { n: 0, tema: TEMA_BASE, base: base };
    const meta = cron.metaHoras || 0;
    const meses = cron.meses || [];
    const plan = cron.plan || {};
    const fases = conContenido(plan.fases);
    const proyectoDe = function (id) { return (todos || []).find(function (p) { return p.id === id; }); };
    const colorDe = function (id) { const p = proyectoDe(id); return (p && (p.identidad || {}).color) || '#00336a'; };
    const semanasTotales = meses.reduce(function (n, m) { return n + (m.semanas || []).length; }, 0);

    // 1. Cifras
    const cifras = [
      [cron.horasAcumuladas || 0, 'horas cumplidas de ' + num(meta)],
      [semanasTotales, 'semanas de práctica'],
      [principales(todos).length, 'frentes de trabajo'],
      [fases.filter(function (f) { return !f.transversal; }).length, 'fases en el plan de la propuesta']
    ];
    const secCifras = seccion(ctx, 'cifras', 'En cifras', '<dl class="contador">' + cifras.map(function (c) {
      return '<div><dt>' + esc(c[1]) + '</dt><dd data-contar="' + c[0] + '">' + num(c[0]) + '</dd></div>';
    }).join('') + '</dl>');

    // 2. Mes a mes
    const max = Math.max.apply(null, meses.map(function (m) { return m.horas || 0; }).concat([1]));
    const tarjetas = '<ol class="crono-meses">' + meses.map(function (m, i) {
      const pctAcum = meta ? Math.min(100, ((m.acumulado || 0) / meta) * 100) : 0;
      return '<li class="crono-mes revelar" style="--retraso:' + (i * 80) + 'ms"><p class="crono-mes__nombre">' + esc(m.mes) + '<small>' + esc(m.anio) + '</small></p>' +
        '<p class="crono-mes__horas"><b data-contar="' + (m.horas || 0) + '">' + num(m.horas || 0) + '</b> h</p>' +
        '<span class="crono-mes__barra" aria-hidden="true"><i style="width:' + Math.round(((m.horas || 0) / max) * 100) + '%"></i></span>' +
        '<p class="crono-mes__acum">Acumulado ' + num(m.acumulado || 0) + ' h · ' + num(pctAcum) + ' %</p>' +
        '<span class="crono-mes__meta" aria-hidden="true"><i style="width:' + pctAcum.toFixed(1) + '%"></i></span></li>';
    }).join('') + '</ol>';
    const tablaMeses = tabla(meses.map(function (m) {
      return { mes: m.mes + ' ' + m.anio, horas: num(m.horas || 0), acum: num(m.acumulado || 0), pct: meta ? num(((m.acumulado || 0) / meta) * 100) + ' %' : '' };
    }), [
      { clave: 'mes', titulo: 'Mes' }, { clave: 'horas', titulo: 'Horas del mes', clase: 'num' },
      { clave: 'acum', titulo: 'Acumulado', clase: 'num' }, { clave: 'pct', titulo: 'Avance de la meta', clase: 'num' }
    ], 'Resumen de horas por mes', '<tfoot><tr><th scope="row">Total</th><td class="num">' + num(cron.horasAcumuladas || 0) + '</td><td class="num">' +
      num(cron.horasAcumuladas || 0) + '</td><td class="num">' + (meta ? num(((cron.horasAcumuladas || 0) / meta) * 100) + ' %' : '') + '</td></tr></tfoot>');
    const secMeses = seccion(ctx, 'meses', 'Mes a mes', tarjetas + '<div style="margin-top:var(--sp-5)">' + tablaMeses + '</div>');

    // 3. Plan de la propuesta (Tabla 2)
    const nMeses = conContenido(plan.meses).length;
    const nSem = nMeses * 4;
    const celdas = function (sems, color, clase) {
      return Array.from({ length: nSem }, function (_, k) {
        const on = sems.indexOf(k + 1) !== -1;
        return '<td class="' + (k % 4 === 0 ? 'plan__inicio-mes ' : '') + (on ? 'plan__on ' + (clase || '') : '') + '"' + (on ? ' style="--c:' + esc(color) + '"' : '') + '>' + (on ? '<span class="sr-only">sí</span>' : '') + '</td>';
      }).join('');
    };
    const secPlan = fases.length ? seccion(ctx, 'plan', 'Plan de la propuesta',
      '<p class="sec__nota" style="margin:0 0 var(--sp-5)">Tabla 2 de la propuesta de pasantía: 4 meses de 4 semanas, de junio a septiembre. Cada fase lleva el color de su proyecto; ábrela para ver sus actividades.</p>' +
      '<div class="plan" role="region" tabindex="0" aria-label="Plan de actividades por semana"><table class="plan__tabla"><caption class="sr-only">Plan de actividades de la propuesta por fase y semana</caption>' +
      '<thead><tr><th scope="col" rowspan="2" class="plan__cab-fase">Fase</th>' + conContenido(plan.meses).map(function (m) { return '<th scope="colgroup" colspan="4" class="plan__mes">' + esc(m) + '</th>'; }).join('') + '</tr>' +
      '<tr>' + Array.from({ length: nSem }, function (_, k) { return '<th scope="col" class="plan__sem' + (k % 4 === 0 ? ' plan__inicio-mes' : '') + '">' + ((k % 4) + 1) + '</th>'; }).join('') + '</tr></thead>' +
      fases.map(function (f, i) {
        const color = colorDe(f.proyecto);
        const p = proyectoDe(f.proyecto);
        const todas = conContenido(f.actividades).reduce(function (a, x) { return a.concat(x.semanas || []); }, []);
        const nombre = p ? '<a href="' + esc(rutaProyecto(p.id, base)) + '">' + esc(f.nombre) + '</a>' : esc(f.nombre);
        return '<tbody class="plan__grupo' + (f.transversal ? ' plan__grupo--transversal' : '') + '" id="plan-fase-' + i + '">' +
          '<tr class="plan__fase"><th scope="row"><button type="button" class="plan__abrir" aria-expanded="false" aria-controls="plan-fase-' + i + '"><i style="background:' + esc(color) + '"></i><span class="sr-only">Mostrar actividades de </span></button>' +
          (f.transversal ? '' : '<small>Fase ' + (i + 1) + '</small>') + nombre + '</th>' + celdas(todas, color, 'plan__on--fase') + '</tr>' +
          conContenido(f.actividades).map(function (a) {
            return '<tr class="plan__act"><th scope="row">' + esc(a.nombre) + '</th>' + celdas(a.semanas || [], color) + '</tr>';
          }).join('') + '</tbody>';
      }).join('') + '</table></div>') : '';

    // 4. Semana a semana: lo planeado y los hitos reales de cada proyecto
    const inicio = aFecha(cron.inicio);
    const hitos = [];
    (todos || []).forEach(function (p) {
      conContenido(p.hitos).forEach(function (h) {
        const f = aFecha(h.fecha);
        if (f && tieneContenido(h.descripcion)) hitos.push({ f: f, p: p, texto: h.descripcion });
      });
    });
    let k = 0;
    const planDe = function (mesIdx, ord) {
      if (mesIdx < 0 || mesIdx >= nMeses) return [];
      const sem = mesIdx * 4 + Math.min(4, ord);
      const res = [];
      fases.forEach(function (f) {
        if (f.transversal) return;
        conContenido(f.actividades).forEach(function (a) { if ((a.semanas || []).indexOf(sem) !== -1) res.push({ fase: f, act: a }); });
      });
      return res;
    };
    const bloques = meses.map(function (m, mi) {
      const sems = (m.semanas || []);
      if (!sems.length) return '';
      const mesPlan = conContenido(plan.meses).indexOf(m.mes);
      return '<li class="crono-semanas__mes"><h3>' + esc(m.mes + ' ' + m.anio) + '<small>' + num(m.horas || 0) + ' h</small></h3><ol>' + sems.map(function (s, si) {
        const desde = inicio ? new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate() + 7 * k) : null;
        const hasta = desde ? new Date(desde.getFullYear(), desde.getMonth(), desde.getDate() + 6) : null;
        k += 1;
        const deEsta = hitos.filter(function (h) { return desde && h.f >= desde && h.f <= hasta; }).sort(function (a, b) { return a.f - b.f; });
        const planeado = planDe(mesPlan, si + 1);
        return '<li class="semana-v revelar" style="--retraso:' + (si * 60) + 'ms"><p class="semana-v__rango">Semana ' + dos(k) + '<span>' + esc(s.rango) + '</span>' + (tieneContenido(s.horas) ? '<b>' + num(s.horas) + ' h</b>' : '') + '</p>' +
          (tieneContenido(s.titulo) ? '<p class="semana-v__titulo">' + esc(s.titulo) + '</p>' : '') +
          (deEsta.length ? '<ul class="semana-v__hitos">' + deEsta.map(function (h) {
            const c = (h.p.identidad || {}).color || '#00336a';
            return '<li style="--c:' + esc(c) + '"><time datetime="' + aIso(h.f) + '">' + esc(fechaCorta(aIso(h.f))) + '</time><a href="' + esc(rutaProyecto(h.p.id, base)) + '">' + esc((h.p.identidad || {}).nombreCorto || h.p.nombre) + '</a><span>' + esc(h.texto) + '</span></li>';
          }).join('') + '</ul>' : '') +
          (conContenido(s.actividades).length ? '<ul class="semana-v__act">' + conContenido(s.actividades).map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ul>' : '') +
          (planeado.length ? '<p class="semana-v__plan"><span>Según el plan</span>' + planeado.map(function (x) {
            return '<em style="--c:' + esc(colorDe(x.fase.proyecto)) + '" title="' + esc(x.act.nombre) + '">' + esc(x.fase.nombre.replace(/ \(.*\)$/, '')) + ' · ' + esc(x.act.nombre) + '</em>';
          }).join('') + '</p>' : '') + '</li>';
      }).join('') + '</ol></li>';
    }).join('');
    const secSemanas = seccion(ctx, 'semanas', 'Semana a semana', '<p class="sec__nota" style="margin:0 0 var(--sp-5)">Los hitos salen del historial de cada proyecto; las etiquetas grises muestran lo que el plan de la propuesta preveía para esa semana.</p><ol class="crono-semanas">' + bloques + '</ol>');

    // 5. Proyectos en el tiempo (Gantt real)
    const secGantt = seccion(ctx, 'gantt', 'Proyectos en el tiempo', renderGantt(todos, cron, g, base, null, true));
    return secCifras + secMeses + secPlan + secSemanas + secGantt;
  }

  // Plan: cada fase se abre y se cierra para mostrar sus actividades.
  function activarPlan(cont) {
    if (!cont) return;
    cont.addEventListener('click', function (e) {
      const b = e.target.closest('.plan__abrir');
      if (!b) return;
      const g = b.closest('.plan__grupo');
      const abierto = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', String(abierto));
      g.classList.toggle('esta-abierto', abierto);
    });
  }

  /* ---------------------------------------------------------------------
   * Conclusiones
   * ------------------------------------------------------------------- */

  // Resultados, aportes, dificultades, conclusiones, recomendaciones y anexos.
  function renderConclusiones(g, todos, cron, base) {
    const proyectos = principales(todos);
    const conPendientes = todos || [];
    const ci = g.cierre || {};
    const meta = cron.metaHoras || 0;
    const hechas = cron.horasAcumuladas || 0;
    const micro = (g.indicadores || {}).micrositiosIntervenidos;
    const prod = proyectos.filter(function (p) { return p.estado === 'En producción'; });
    let s = 'Al corte de este informe se acumulan ' + num(hechas) + ' de ' + num(meta) + ' horas (' + num(meta ? (hechas / meta) * 100 : 0) + ' % de la meta), distribuidas en ' + proyectos.length + ' frentes de trabajo.';
    if (tieneContenido(micro)) s += ' En el frente de micrositios se intervinieron las páginas de ' + String(micro).replace(/^(\d+)\s*\+$/, 'más de $1') + ' programas académicos.';
    if (prod.length) s += ' ' + prod.length + (prod.length === 1 ? ' aplicación se encuentra' : ' aplicaciones se encuentran') + ' en producción.';
    const filas = proyectos.map(function (p) {
      return {
        nombre: '<a href="' + esc(rutaProyecto(p.id, base)) + '">' + esc((p.identidad || {}).nombreCorto || p.nombre) + '</a>',
        estado: esc(p.estado), periodo: esc(formatearPeriodo(p.periodo)),
        repos: String(conContenido(p.repositorios).filter(function (r) { return urlExterna(r.url); }).length || ''),
        prod: urlExterna(p.urlProduccion) ? enlaceExterno(p.urlProduccion, 'Abrir') : ''
      };
    });
    const ctx = { n: 0, tema: TEMA_BASE, base: base };
    const lista = function (x, tag) { const v = conContenido(x); return v.length ? '<' + tag + ' class="sec__texto">' + v.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</' + tag + '>' : ''; };
    const dif = conContenido(ci.dificultades);
    const pend = conPendientes.filter(function (p) { return conContenido(p.pendientes).length; });
    const anexos = conContenido(ci.anexos);
    const partes = [
      ['resultados', 'Resultados consolidados', '<p class="sec__texto">' + esc(s) + '</p>' + conContenido(ci.resultados).map(function (r) { return '<p class="sec__texto">' + esc(r) + '</p>'; }).join('') +
        '<div style="margin-top:var(--sp-5)">' + tabla(filas, [
          { clave: 'nombre', titulo: 'Frente', html: true }, { clave: 'estado', titulo: 'Estado', html: true }, { clave: 'periodo', titulo: 'Periodo', html: true },
          { clave: 'repos', titulo: 'Repositorios', clase: 'num' }, { clave: 'prod', titulo: 'Producción', html: true }
        ], 'Resultados por frente') + '</div>'],
      ['aportes', 'Aportes a la dependencia', lista(ci.aportes, 'ul')],
      ['dificultades', 'Dificultades y cómo se resolvieron', dif.length ? '<ul class="workflows">' + dif.map(function (d) {
        return '<li class="workflow"><div class="workflow__cabeza"><strong>' + esc(d.dificultad) + '</strong></div>' + (tieneContenido(d.solucion) ? '<p>' + esc(d.solucion) + '</p>' : '') + '</li>';
      }).join('') + '</ul>' : ''],
      ['conclusiones', 'Conclusiones', lista(ci.conclusiones, 'ol')],
      ['recomendaciones', 'Recomendaciones', lista(ci.recomendaciones, 'ul')],
      ['pendientes', 'Trabajo pendiente por frente', pend.map(function (p) { return sub(p.nombre, lista(p.pendientes, 'ul')); }).join('')],
      ['anexos', 'Anexos', anexos.length ? '<ul class="sec__texto">' + anexos.map(function (a) {
        const t = urlExterna(a.url) ? enlaceExterno(a.url, a.titulo || a.url) : (tieneContenido(a.url) ? '<a href="' + esc(ruta(a.url, base)) + '">' + esc(a.titulo || a.url) + '</a>' : esc(a.titulo));
        return '<li>' + t + (tieneContenido(a.descripcion) ? ' — ' + esc(a.descripcion) : '') + '</li>';
      }).join('') + '</ul>' : '']
    ];
    const faltan = partes.filter(function (x) { return !x[2] && x[0] !== 'pendientes'; }).map(function (x) { return x[1]; });
    return (faltan.length ? '<p class="aviso no-imprimir" style="margin-bottom:var(--sp-6)"><strong>Borrador.</strong> Pendiente de completar en <code>data/general.js</code> (<code>cierre</code>): ' + esc(faltan.join(', ')) + '.</p>' : '') +
      partes.map(function (x) { return seccion(ctx, x[0], x[1], x[2]); }).join('');
  }

  /* ---------------------------------------------------------------------
   * Navegación e interacciones
   * ------------------------------------------------------------------- */

  // Resalta en la barra superior el enlace de la sección actual.
  function marcarNavegacionActiva() {
    const actual = document.body.getAttribute('data-seccion');
    const esFicha = document.body.getAttribute('data-pagina') === 'proyecto';
    document.querySelectorAll('.menu a[data-seccion]').forEach(function (a) {
      if (a.getAttribute('data-seccion') === actual) {
        a.classList.add('es-actual');
        a.setAttribute('aria-current', esFicha ? 'true' : 'page');
      }
    });
  }

  // Botón de menú en pantallas estrechas.
  function activarMenuMovil() {
    const boton = document.querySelector('.menu-boton');
    const menu = document.getElementById('menu-principal');
    if (!boton || !menu) return;
    const fijar = function (v) { boton.setAttribute('aria-expanded', String(v)); menu.classList.toggle('esta-abierto', v); };
    boton.addEventListener('click', function () { fijar(boton.getAttribute('aria-expanded') !== 'true'); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) fijar(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && boton.getAttribute('aria-expanded') === 'true') { fijar(false); boton.focus(); } });
  }

  // Construye el índice lateral desde las secciones; desplegable en pantallas estrechas.
  function construirIndiceLateral(contenedor, destino, titulo) {
    if (!contenedor || !destino) return;
    const hs = Array.prototype.slice.call(contenedor.querySelectorAll('section[id] > h2'));
    if (!hs.length) { destino.innerHTML = ''; destino.hidden = true; return; }
    destino.innerHTML = '<details class="indice" open><summary>' + esc(titulo || 'En esta página') + '</summary><nav aria-label="Secciones de esta página"><ol>' +
      hs.map(function (h, i) { return '<li><a href="#' + esc(h.parentElement.id) + '"><span class="indice__marca" aria-hidden="true">' + (i + 1) + '</span>' + esc(h.textContent) + '</a></li>'; }).join('') +
      '</ol></nav></details>';
    const det = destino.querySelector('details');
    const ancho = window.matchMedia('(min-width: 64rem)');
    const sync = function () { det.open = ancho.matches; };
    sync();
    if (ancho.addEventListener) ancho.addEventListener('change', sync); else if (ancho.addListener) ancho.addListener(sync);
    destino.querySelector('summary').addEventListener('click', function (e) { if (ancho.matches) e.preventDefault(); });
    destino.addEventListener('click', function (e) { if (e.target.closest('a') && !ancho.matches) det.open = false; });
    if (!('IntersectionObserver' in window)) return;
    const enlaces = {};
    destino.querySelectorAll('a').forEach(function (a) { enlaces[a.getAttribute('href').slice(1)] = a; });
    const obs = new IntersectionObserver(function (ent) {
      ent.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(enlaces).forEach(function (k) { enlaces[k].removeAttribute('aria-current'); });
        if (enlaces[e.target.id]) enlaces[e.target.id].setAttribute('aria-current', 'true');
        destino.dispatchEvent(new CustomEvent('indice:cambio', { detail: e.target.id }));
      });
    }, { rootMargin: '-15% 0px -70% 0px' });
    hs.forEach(function (h) { obs.observe(h.parentElement); });
  }

  // Visor modal para las capturas de la galería.
  function activarGaleria(cont) {
    if (!cont || !cont.querySelector('.galeria__boton')) return;
    let visor = document.querySelector('.visor');
    if (!visor) {
      visor = document.createElement('dialog');
      visor.className = 'visor';
      visor.setAttribute('aria-label', 'Captura ampliada');
      visor.innerHTML = '<img src="" alt=""><div class="visor__barra"><p></p><button type="button" class="visor__cerrar">Cerrar</button></div>';
      document.body.appendChild(visor);
      visor.querySelector('.visor__cerrar').addEventListener('click', function () { visor.close(); });
      visor.addEventListener('click', function (e) { if (e.target === visor) visor.close(); });
    }
    cont.addEventListener('click', function (e) {
      const b = e.target.closest('.galeria__boton');
      if (!b) return;
      if (typeof visor.showModal !== 'function') { window.open(b.getAttribute('data-src'), '_blank', 'noopener'); return; }
      const img = visor.querySelector('img');
      img.src = b.getAttribute('data-src');
      img.alt = b.getAttribute('data-alt');
      visor.querySelector('p').textContent = b.getAttribute('data-pie') || b.getAttribute('data-alt');
      visor.showModal();
    });
  }

  // Pestañas accesibles (role="tablist"): clic y flechas del teclado.
  function activarPestanas(cont) {
    if (!cont) return;
    cont.querySelectorAll('[role="tablist"]').forEach(function (lista) {
      const tabs = Array.prototype.slice.call(lista.querySelectorAll('[role="tab"]'));
      const elegir = function (tab, foco) {
        tabs.forEach(function (t) {
          const activa = t === tab;
          t.setAttribute('aria-selected', String(activa));
          t.tabIndex = activa ? 0 : -1;
          const panel = document.getElementById(t.getAttribute('aria-controls'));
          if (panel) panel.hidden = !activa;
        });
        if (foco) tab.focus();
      };
      lista.addEventListener('click', function (e) { const t = e.target.closest('[role="tab"]'); if (t) elegir(t); });
      lista.addEventListener('keydown', function (e) {
        const i = tabs.indexOf(document.activeElement);
        if (i === -1) return;
        const destino = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (destino === undefined) return;
        e.preventDefault();
        elegir(tabs[(destino + tabs.length) % tabs.length], true);
      });
    });
  }

  // Botones que resaltan los pasos de un rol dentro de .recorrido-caja.
  function activarFiltroRoles(cont) {
    if (!cont) return;
    cont.querySelectorAll('.recorrido-caja').forEach(function (caja) {
      caja.addEventListener('click', function (e) {
        const b = e.target.closest('[data-filtro-rol]');
        if (!b) return;
        const rol = b.getAttribute('data-filtro-rol');
        caja.querySelectorAll('[data-filtro-rol]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        if (rol) caja.setAttribute('data-rol', rol); else caja.removeAttribute('data-rol');
        caja.querySelectorAll('.recorrido__paso').forEach(function (x) { x.classList.toggle('coincide', !!rol && x.getAttribute('data-rol') === rol); });
      });
    });
  }

  // Aparición suave de los elementos .revelar al entrar en pantalla.
  function activarRevelado(cont) {
    if (!cont) return;
    const els = cont.querySelectorAll('.revelar');
    if (!els.length) return;
    const quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (quieto || !('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('es-visible'); }); return; }
    document.documentElement.classList.add('con-revelado');
    const obs = new IntersectionObserver(function (ent) {
      ent.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('es-visible'); obs.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    els.forEach(function (el) { obs.observe(el); });
  }

  // Cuenta de 0 al valor final cuando la cifra entra en pantalla.
  function activarContadores(cont) {
    if (!cont) return;
    const els = cont.querySelectorAll('[data-contar]');
    const quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!els.length || quieto || !('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(function (ent) {
      ent.forEach(function (e) {
        if (!e.isIntersecting) return;
        obs.unobserve(e.target);
        const el = e.target;
        const fin = Number(el.getAttribute('data-contar'));
        const t0 = performance.now();
        const paso = function (t) {
          const k = Math.min(1, (t - t0) / 1400);
          el.textContent = num(k < 1 ? Math.round(fin * (1 - Math.pow(1 - k, 3))) : fin);
          if (k < 1) requestAnimationFrame(paso);
        };
        requestAnimationFrame(paso);
      });
    }, { threshold: 0.6 });
    els.forEach(function (el) { el.textContent = '0'; obs.observe(el); });
  }

  // Escenario fijo del recorrido: refleja el paso que está en el centro de la pantalla.
  function activarEscenario(cont) {
    if (!cont || !('IntersectionObserver' in window)) return;
    cont.querySelectorAll('.recorrido-escena').forEach(function (zona) {
      const tarjeta = zona.querySelector('.escenario__tarjeta');
      const pasos = Array.prototype.slice.call(zona.querySelectorAll('.recorrido__paso'));
      if (!tarjeta || !pasos.length) return;
      const puntos = tarjeta.querySelectorAll('.escenario__puntos li');
      let actual = -1;
      const mostrar = function (i) {
        if (i === actual) return;
        actual = i;
        const p = pasos[i];
        const rol = p.getAttribute('data-rol');
        pasos.forEach(function (x, j) { x.classList.toggle('es-activo', j === i); });
        puntos.forEach(function (x, j) { x.classList.toggle('es-activo', j <= i); });
        tarjeta.className = 'escenario__tarjeta escenario__tarjeta--' + (p.getAttribute('data-slot') || rol);
        tarjeta.querySelector('.escenario__num b').textContent = dos(i + 1);
        tarjeta.querySelector('.escenario__rol').textContent = p.querySelector('.recorrido__rol').textContent;
        tarjeta.querySelector('.escenario__titulo').textContent = p.querySelector('h3').textContent;
        const d = p.querySelector('p');
        tarjeta.querySelector('.escenario__detalle').textContent = d ? d.textContent : '';
        tarjeta.querySelector('.escenario__barra i').style.width = ((i + 1) / pasos.length * 100).toFixed(2) + '%';
        void tarjeta.offsetWidth;
        tarjeta.classList.add('es-cambio');
      };
      const obs = new IntersectionObserver(function (ent) {
        ent.forEach(function (e) { if (e.isIntersecting) mostrar(pasos.indexOf(e.target)); });
      }, { rootMargin: '-45% 0px -50% 0px' });
      pasos.forEach(function (x) { obs.observe(x); });
      mostrar(0);
    });
  }

  // Tarjetas que giran: botón (clic, Enter o espacio) además del hover.
  function activarVolteo(cont) {
    if (!cont) return;
    cont.addEventListener('click', function (e) {
      const b = e.target.closest('.regla__girar');
      if (!b) return;
      const li = b.closest('.regla');
      const girada = !li.classList.contains('esta-girada');
      li.classList.toggle('esta-girada', girada);
      b.setAttribute('aria-pressed', String(girada));
    });
  }

  // Palabras que se iluminan a medida que la frase atraviesa la pantalla.
  function activarDeclaracion(cont) {
    if (!cont) return;
    const frases = Array.prototype.slice.call(cont.querySelectorAll('.declaracion'));
    const quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!frases.length || quieto) return;
    document.documentElement.classList.add('con-declaracion');
    let pendiente = false;
    const pintar = function () {
      pendiente = false;
      const alto = window.innerHeight;
      frases.forEach(function (f) {
        const caja = f.getBoundingClientRect();
        const avance = Math.min(1, Math.max(0, (alto * 0.85 - caja.top) / (caja.height + alto * 0.35)));
        const palabras = f.querySelectorAll('.palabra');
        const encendidas = avance * palabras.length;
        palabras.forEach(function (w, i) { w.style.opacity = String(Math.max(0.16, Math.min(1, encendidas - i))); });
      });
    };
    const pedir = function () { if (!pendiente) { pendiente = true; requestAnimationFrame(pintar); } };
    window.addEventListener('scroll', pedir, { passive: true });
    window.addEventListener('resize', pedir);
    pintar();
  }

  // Índice como la corona de un reloj: los enlaces giran alrededor del centro.
  // La rueda del mouse sobre el menú lo recorre sin mover la página; tras dos
  // segundos sin elegir, vuelve a la sección en la que está la lectura.
  function activarRueda(caja) {
    if (!caja) return;
    const ol = caja.querySelector('nav ol');
    if (!ol) return;
    const items = Array.prototype.slice.call(ol.children);
    const ancho = window.matchMedia('(min-width: 64rem)');
    const quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let activo = 0;
    let vista = 0;
    let acumulado = 0;
    let espera = null;
    let conFoco = false;
    let destino = null;
    let quieta = null;
    ol.classList.add('rueda');
    // El elegido queda siempre en el centro y la lista se desplaza a su
    // alrededor; la curvatura depende de la distancia al centro.
    const colocar = function () {
      const on = ancho.matches;
      caja.classList.toggle('con-rueda', on);
      caja.classList.toggle('esta-explorando', on && destino === null && vista !== activo);
      caja.classList.toggle('esta-saltando', on && destino !== null);
      const alto = ol.clientHeight || 1;
      // Cada enlace puede ocupar una o dos líneas: se apilan según su altura real.
      const sep = 4;
      const altos = items.map(function (li) { return li.offsetHeight || 40; });
      const centros = [];
      let acumulado = 0;
      altos.forEach(function (h) { centros.push(acumulado + h / 2); acumulado += h + sep; });
      items.forEach(function (li, i) {
        const d = i - vista;
        const a = Math.abs(d);
        const y = centros[i] - centros[vista];
        const curva = Math.max(-1, Math.min(1, y / (alto / 2)));
        li.classList.toggle('es-centro', d === 0);
        li.style.transform = on ? 'translateY(' + (y - altos[i] / 2).toFixed(1) + 'px) translateX(' + (d === 0 ? 0.35 : 0) + 'rem) rotateX(' + (quieto ? 0 : (-curva * 38).toFixed(1)) + 'deg) scale(' + (d === 0 ? 1.02 : Math.max(0.86, 1 - a * 0.025)) + ')' : '';
        const fuera = Math.abs(y) > alto / 2;
        li.style.opacity = on ? String(fuera ? 0 : Math.max(0.4, 1 - a * 0.08)) : '';
        li.style.pointerEvents = on && fuera ? 'none' : '';
      });
    };
    const volverLuego = function () {
      clearTimeout(espera);
      espera = setTimeout(function () { if (!conFoco) { vista = activo; colocar(); } }, 2000);
    };
    caja.addEventListener('indice:cambio', function (e) {
      const i = items.findIndex(function (li) { const a = li.querySelector('a'); return a && a.getAttribute('href') === '#' + e.detail; });
      if (i === -1) return;
      // Durante el desplazamiento tras un clic, las secciones intermedias no mueven la rueda.
      if (destino !== null) return;
      const seguia = vista === activo;
      activo = i;
      if (seguia || espera === null) vista = i;
      colocar();
    });
    caja.addEventListener('wheel', function (e) {
      if (!ancho.matches) return;
      e.preventDefault();
      acumulado += e.deltaY * (e.deltaMode === 1 ? 16 : 1);
      let cambio = false;
      while (Math.abs(acumulado) >= 45) {
        const paso = acumulado > 0 ? 1 : -1;
        acumulado -= paso * 45;
        const nueva = Math.min(items.length - 1, Math.max(0, vista + paso));
        if (nueva !== vista) { vista = nueva; cambio = true; }
      }
      if (cambio) colocar();
      volverLuego();
    }, { passive: false });
    // Al elegir una sección, la rueda se queda en ella mientras la página se
    // desplaza y vuelve a seguir la lectura cuando el scroll se detiene.
    const soltar = function () {
      if (destino === null) return;
      activo = vista = destino;
      items.forEach(function (li, i) { const a = li.querySelector('a'); if (a) { if (i === destino) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); } });
      destino = null;
      window.removeEventListener('scroll', alDesplazar);
      colocar();
    };
    const alDesplazar = function () { clearTimeout(quieta); quieta = setTimeout(soltar, 200); };
    ol.addEventListener('click', function (e) {
      const li = e.target.closest('li');
      if (!li) return;
      clearTimeout(espera);
      espera = null;
      destino = activo = vista = items.indexOf(li);
      window.addEventListener('scroll', alDesplazar, { passive: true });
      alDesplazar();
      colocar();
    });
    // Con teclado, el enlace enfocado pasa al centro mientras tenga el foco.
    ol.addEventListener('focusin', function (e) { const i = items.indexOf(e.target.closest('li')); if (i !== -1) { conFoco = true; vista = i; colocar(); } });
    ol.addEventListener('focusout', function () { conFoco = false; volverLuego(); });
    if (ancho.addEventListener) ancho.addEventListener('change', colocar);
    window.addEventListener('resize', colocar);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(colocar);
    colocar();
  }

  // Botón flotante al sitio en producción; aparece cuando el héroe sale de pantalla.
  function activarFlotante(p, art) {
    const sitios = conContenido(((p && p.extras) || {}).sitios).filter(function (x) { return urlExterna(x.url); });
    if (sitios.length && !document.querySelector('.flotante')) return activarFlotanteMenu(sitios, art, (p.extras || {}).textoFlotante);
    const url = urlExterna(p && p.urlProduccion);
    if (!url || document.querySelector('.flotante')) return;
    const a = document.createElement('a');
    a.className = 'flotante';
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.innerHTML = '<span class="flotante__punto" aria-hidden="true"></span><span>Abrir ' + esc((p.identidad || {}).nombreCorto || p.nombre) + ' en vivo</span><span aria-hidden="true">↗</span>' + EXTERNO;
    document.body.appendChild(a);
    const hero = art && art.querySelector('.hero');
    if (!hero || !('IntersectionObserver' in window)) { a.classList.add('es-visible'); return; }
    new IntersectionObserver(function (ent) {
      a.classList.toggle('es-visible', !ent[0].isIntersecting);
    }).observe(hero);
  }

  // Reproduce los íconos de Lordicon: los pinta con sus colores, los anima al
  // entrar en pantalla y otra vez al pasar el mouse por la tarjeta que los contiene.
  function activarLordicons(cont) {
    if (!cont || !window.lottie || !window.LORDICONS) return;
    const els = cont.querySelectorAll('[data-lordicon]');
    if (!els.length) return;
    const quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const aRgb = function (hex) {
      const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || '').trim());
      if (!m) return null;
      const n = parseInt(m[1], 16);
      return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
    };
    // Los iconos de Lordicon exponen sus colores como controles "primary"/"secondary".
    const pintar = function (nodo, mapa) {
      if (Array.isArray(nodo)) { nodo.forEach(function (x) { pintar(x, mapa); }); return; }
      if (!nodo || typeof nodo !== 'object') return;
      if (nodo.ty === 5 && mapa[nodo.nm] && Array.isArray(nodo.ef)) {
        nodo.ef.forEach(function (e) {
          if (e && e.ty === 2 && e.v && Array.isArray(e.v.k)) e.v.k = mapa[nodo.nm].concat(e.v.k.slice(3));
        });
      }
      Object.keys(nodo).forEach(function (k) { if (nodo[k] && typeof nodo[k] === 'object') pintar(nodo[k], mapa); });
    };
    const obs = 'IntersectionObserver' in window ? new IntersectionObserver(function (ent) {
      ent.forEach(function (e) {
        if (!e.isIntersecting || !e.target._anim) return;
        obs.unobserve(e.target);
        if (!quieto) e.target._anim.goToAndPlay(0, true);
      });
    }, { threshold: 0.4 }) : null;
    els.forEach(function (el) {
      const datos = JSON.parse(JSON.stringify(window.LORDICONS[el.getAttribute('data-lordicon')] || null));
      if (!datos) return;
      const mapa = {};
      String(el.getAttribute('data-colores') || '').split(',').forEach(function (par) {
        const kv = par.split(':');
        const rgb = aRgb(kv[1]);
        if (kv[0] && rgb) mapa[kv[0].trim()] = rgb;
      });
      pintar(datos, mapa);
      const anim = window.lottie.loadAnimation({ container: el, renderer: 'svg', loop: false, autoplay: false, animationData: datos, rendererSettings: { preserveAspectRatio: 'xMidYMid meet' } });
      el._anim = anim;
      anim.addEventListener('DOMLoaded', function () { anim.goToAndStop(Math.max(0, anim.totalFrames - 1), true); });
      const gatillo = el.closest('.destacado, .rol-tarjeta, .portada-mesa__botones span, .lordicon-gatillo') || el;
      if (!quieto) gatillo.addEventListener('mouseenter', function () { anim.goToAndPlay(0, true); });
      if (obs) obs.observe(el);
    });
  }

  // Variante del botón flotante con un menú de sitios (varias mesas en producción).
  function activarFlotanteMenu(sitios, art, texto) {
    const caja = document.createElement('div');
    caja.className = 'flotante flotante--menu';
    caja.innerHTML = '<ul class="flotante__lista" id="flotante-lista" hidden>' + sitios.map(function (x) {
      return '<li><a href="' + esc(x.url) + '" target="_blank" rel="noopener noreferrer">' + esc(x.nombre) + '<span aria-hidden="true">↗</span>' + EXTERNO + '</a></li>';
    }).join('') + '</ul><button type="button" class="flotante__boton" aria-expanded="false" aria-controls="flotante-lista">' +
      '<span class="flotante__punto" aria-hidden="true"></span><span>' + esc(texto || 'Abrir en vivo') + '</span><span class="flotante__flecha" aria-hidden="true">▴</span></button>';
    document.body.appendChild(caja);
    const boton = caja.querySelector('button');
    const lista = caja.querySelector('ul');
    const fijar = function (v) { boton.setAttribute('aria-expanded', String(v)); lista.hidden = !v; caja.classList.toggle('esta-abierto', v); };
    boton.addEventListener('click', function () { fijar(lista.hidden); });
    document.addEventListener('click', function (e) { if (!caja.contains(e.target)) fijar(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lista.hidden) { fijar(false); boton.focus(); } });
    const hero = art && art.querySelector('.hero');
    if (!hero || !('IntersectionObserver' in window)) { caja.classList.add('es-visible'); return; }
    new IntersectionObserver(function (ent) {
      const ver = !ent[0].isIntersecting;
      caja.classList.toggle('es-visible', ver);
      if (!ver) fijar(false);
    }).observe(hero);
  }

  // Formulario de demostración: muestra u oculta campos según su condición y
  // refleja qué exigiría el servidor (mismo mapa en ambos lados).
  function activarCascada(cont) {
    if (!cont) return;
    cont.querySelectorAll('[data-cascada]').forEach(function (caja) {
      const form = caja.querySelector('form');
      const campos = Array.prototype.slice.call(caja.querySelectorAll('.cascada__campo'));
      const valor = function (id) {
        const radio = form.querySelector('input[type="radio"][name="demo-' + id + '"]:checked');
        if (radio) return radio.value;
        const el = form.querySelector('#demo-' + CSS.escape(id));
        return el ? el.value : '';
      };
      const evaluar = function () {
        const visible = {};
        campos.forEach(function (c) {
          const id = c.getAttribute('data-campo');
          const padre = c.getAttribute('data-muestra-campo');
          let ver = true;
          if (padre) {
            let valores = [];
            try { valores = JSON.parse(c.getAttribute('data-muestra-valores') || '[]'); } catch (e) { valores = []; }
            ver = !!visible[padre] && valores.indexOf(valor(padre)) !== -1;
          }
          visible[id] = ver;
          c.classList.toggle('es-oculto', !ver);
          c.querySelectorAll('input, select').forEach(function (el) {
            el.disabled = !ver;
            if (!ver) { if (el.type === 'radio') el.checked = false; else el.value = ''; }
          });
          const li = caja.querySelector('.cascada__servidor li[data-para="' + id + '"]');
          if (li) {
            li.classList.toggle('es-exigido', ver);
            li.querySelector('b').textContent = ver ? 'Obligatorio' : 'No se exige';
          }
        });
      };
      form.addEventListener('change', evaluar);
      form.addEventListener('input', evaluar);
      evaluar();
    });
  }

  /* ---------------------------------------------------------------------
   * Montaje por página
   * ------------------------------------------------------------------- */

  // Reúne los datos globales con valores por defecto seguros.
  function datosGlobales() {
    return { proyectos: window.PROYECTOS || [], cron: window.CRONOGRAMA || { meses: [] }, general: window.GENERAL || {} };
  }

  // Inserta HTML en el elemento indicado si existe.
  function montar(sel, html) {
    const el = document.querySelector(sel);
    if (el) el.innerHTML = html;
    return el;
  }

  // Comportamiento común a todas las páginas.
  function iniciarComun() {
    window.addEventListener('beforeprint', function () { document.querySelectorAll('details.qpq-detalle').forEach(function (d) { d.open = true; }); });
    marcarNavegacionActiva();
    activarMenuMovil();
    if (!window.PROYECTOS || !window.CRONOGRAMA || !window.GENERAL) {
      const m = document.querySelector('main');
      if (m) m.insertAdjacentHTML('afterbegin', '<div class="contenedor"><p class="aviso">No se pudieron cargar los archivos de <code>data/</code>. Revisa que las rutas de los scripts sean relativas.</p></div>');
    }
  }

  // Inicio: portada, cifras, resumen, mosaico, atajos e índice.
  function montarInicio() {
    iniciarComun();
    const d = datosGlobales();
    const b = raiz();
    montar('#portada', renderPortada(d.general, d.cron));
    montar('#cifras', renderCifras(d.general, d.proyectos, d.cron));
    montar('#resumen-texto', conContenido(d.general.resumenEjecutivo).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join(''));
    montar('#tarjetas-proyectos', renderTarjetasProyectos(d.proyectos, b));
    montar('#atajos', renderAtajos(d.cron, b));
    montar('#indice-informe', renderIndiceInforme(d.proyectos, b));
  }

  // Ficha de proyecto: aplica el tema, renderiza y activa índice y galería.
  function montarProyecto(id) {
    iniciarComun();
    const d = datosGlobales();
    const b = raiz();
    const p = d.proyectos.find(function (x) { return x.id === id; });
    const art = montar('#proyecto', renderProyecto(id, d.proyectos, b));
    if (p) {
      document.title = ((p.identidad || {}).nombreCorto || p.nombre) + ' · Informe de pasantía';
      document.body.classList.add('tema-' + ((p.identidad || {}).tema || 'base'));
    }
    if (art) {
      construirIndiceLateral(art.querySelector('.con-indice__cuerpo'), art.querySelector('.indice-caja'), p ? tema(p).indice : '');
      activarGaleria(art);
      activarCarruseles(art);
      activarPestanas(art);
      activarFiltroRoles(art);
      activarRevelado(art);
      activarContadores(art);
      activarEscenario(art);
      activarVolteo(art);
      activarFlotante(p, art);
      activarDeclaracion(art);
      activarCascada(art);
      activarLordicons(art);
      if (p && tema(p).rueda) activarRueda(art.querySelector('.indice-caja'));
    }
    montar('#paginador', renderPaginador(id, d.proyectos, b));
  }

  // Metodología: índice lateral sobre el contenido estático.
  function montarMetodologia() {
    iniciarComun();
    construirIndiceLateral(document.querySelector('.con-indice__cuerpo'), document.querySelector('.indice-caja'), 'Contenido');
  }

  // Cronograma: cabecera, meses, semanas y Gantt.
  function montarCronograma() {
    iniciarComun();
    const d = datosGlobales();
    const b = raiz();
    // Página en formato "ficha viva": héroe con anillo de horas, secciones e índice en rueda.
    if (document.getElementById('crono-hero')) {
      montar('#crono-hero', renderCronoHero(d.cron, d.general, b));
      activarContadores(document.getElementById('crono-hero'));
      const cuerpo = montar('#cronograma', renderCronoSecciones(d.proyectos, d.cron, d.general, b));
      construirIndiceLateral(cuerpo, document.querySelector('.indice-caja'), 'En esta página');
      activarRevelado(cuerpo);
      activarContadores(cuerpo);
      activarPlan(cuerpo);
      activarRueda(document.querySelector('.indice-caja'));
      return;
    }
    montar('#crono-cabecera', renderCabeceraCronograma(d.cron));
    montar('#cronograma', renderCronograma(d.cron));
    montar('#gantt', renderGantt(d.proyectos, d.cron, d.general, b));
  }

  // Conclusiones: secciones desde GENERAL.cierre e índice lateral.
  function montarConclusiones() {
    iniciarComun();
    const d = datosGlobales();
    const c = montar('#conclusiones', renderConclusiones(d.general, d.proyectos, d.cron, raiz()));
    construirIndiceLateral(c, document.querySelector('.indice-caja'), 'Contenido');
  }

  window.App = {
    renderTarjetasProyectos: renderTarjetasProyectos,
    renderProyecto: renderProyecto,
    renderCronograma: renderCronograma,
    renderGantt: renderGantt,
    renderConclusiones: renderConclusiones,
    marcarNavegacionActiva: marcarNavegacionActiva,
    construirIndiceLateral: construirIndiceLateral,
    montarInicio: montarInicio,
    montarProyecto: montarProyecto,
    montarMetodologia: montarMetodologia,
    montarCronograma: montarCronograma,
    montarConclusiones: montarConclusiones,
    utilidades: { esc: esc, tieneContenido: tieneContenido, aFecha: aFecha, formatearPeriodo: formatearPeriodo, textoSobre: textoSobre }
  };
})();
