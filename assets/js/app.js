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
    micrositios: { indice: 'Contenido', num: function (n) { return dos(n); }, teja: 'ancho-3', orden: 7 },
    camina: { indice: 'En esta ficha', num: function (n) { return dos(n); }, teja: 'ancho-2', orden: 3 },
    neotomasino: { indice: 'Estaciones', num: function (n) { return 'Estación ' + dos(n); }, teja: 'ancho-2', orden: 1 },
    livinglab: { indice: 'Mapa', num: function (n) { return dos(n); }, teja: '', orden: 4 },
    reservalab: { indice: 'Ficha del proyecto', num: function (n) { return dos(n) + ' ·'; }, teja: 'alto-2', orden: 2, heroDentro: true },
    nomina: { indice: 'En esta ficha', num: function (n) { return dos(n); }, teja: 'ancho-2', orden: 5 },
    mesas: { indice: 'En esta ficha', num: function (n) { return dos(n); }, teja: '', orden: 6 }
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
        (o.titulo ? ' title="' + esc(o.titulo) + '"' : '') + '>' + (o.logo || '') + esc(o.texto) +
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
    const total = (window.PROYECTOS || []).length;
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
  function renderCifras(g, proyectos, cron) {
    const conEstado = proyectos.filter(function (p) { return tieneContenido(p.estado); });
    const prod = proyectos.filter(function (p) { return p.estado === 'En producción'; }).length;
    const items = [
      [num(cron.horasAcumuladas || 0) + ' h', 'de práctica registradas'],
      [String(proyectos.length), 'frentes de trabajo'],
      [tieneContenido((g.indicadores || {}).micrositiosIntervenidos) ? g.indicadores.micrositiosIntervenidos : '—', 'micrositios intervenidos'],
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
      interior = '<div>' + rotulo + nombre + '</div>' +
        '<div class="teja__tickets" aria-hidden="true"><span>Solicitud <b style="color:#fdc300">Abierta</b></span><span>Solicitud <b style="color:#7fd0f1">Resuelta</b></span></div>' +
        '<div class="teja__pie">' + ver + '</div>';
    } else if (t === 'micrositios') {
      const tonos = ['#00336a', '#ffffff', '#004f9f', '#fdc300'];
      const n = (p.extras || {}).cantidadProgramas || 16;
      interior = '<div>' + rotulo + nombre + '<p class="teja__pie">Más de ' + esc(n) + ' sitios intervenidos · Ver ficha →</p></div>' +
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
    const lista = (proyectos || window.PROYECTOS || []).slice();
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
  function renderIndiceInforme(proyectos, base) {
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
    return '<nav class="migas" aria-label="Ruta de navegación"><ol><li><a href="' + esc(base) + 'index.html">Inicio</a></li>' +
      '<li><a href="' + esc(base) + 'index.html#proyectos">Proyectos</a></li><li><span aria-current="page">' + esc((p.identidad || {}).nombreCorto || p.nombre) + '</span></li></ol></nav>';
  }

  // Rótulo "Proyecto 03 · Estado".
  function rotuloProyecto(p) {
    return 'Proyecto ' + ((p.identidad || {}).numero || '') + (tieneContenido(p.estado) ? ' · ' + p.estado : '');
  }

  // Botones a producción y repositorios.
  function botones(p, clasePrincipal, claseSecundaria, extra) {
    const b = [];
    if (urlExterna(p.urlProduccion)) b.push(enlaceExterno(p.urlProduccion, 'Ver en producción', 'boton ' + clasePrincipal));
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

  const HEROES = {
    // Micrositios: cerúleo institucional con mosaico de programas.
    micrositios: function (p, base) {
      const tonos = ['#00336a', '#ffffff', '#004f9f', '#fdc300', '#7fd0f1'];
      const n = (p.extras || {}).cantidadProgramas;
      return '<div class="hero__mosaico" aria-hidden="true">' + Array.from({ length: 16 }, function (_, i) { return '<span style="background:' + tonos[(i * 3 + 1) % 5] + '"></span>'; }).join('') + '</div>' +
        '<div class="contenedor hero__interior">' + migas(p, base) +
        '<p class="hero__rotulo">' + esc(rotuloProyecto(p)) + '</p><h1>' + esc(p.nombre) + '</h1>' +
        (tieneContenido(p.subtitulo) ? '<p class="hero__bajada">' + esc(p.subtitulo) + '</p>' : '') +
        (n ? '<p class="hero__cifra">' + esc(n) + '+</p><p class="hero__cifra-texto">sitios de programas intervenidos</p>' : '') +
        datosHero(p) + botones(p, 'boton--principal', 'boton--secundario') + '</div>';
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

    // ReservaLab: tarjeta dentro del área de contenido, junto al riel.
    reservalab: function (p, base) {
      const id = p.identidad || {};
      const ga = p.gestionAgil || {};
      const ex = p.extras || {};
      const pantallas = conContenido(ex.gruposModulos).reduce(function (s, g) { return s + conContenido(g.items).length; }, 0);
      const metricas = [
        ['Historias de usuario', ga.historiasUsuario], ['Sprints', ga.sprints],
        ['Roles', conContenido(ex.roles).length || null], ['Pantallas', pantallas || null]
      ].filter(function (m) { return tieneContenido(m[1]); });
      return migas(p, base) + '<div class="hero__tarjeta"><div>' +
        '<p class="hero__chips"><span class="chip-estado">' + esc(tieneContenido(p.estado) ? p.estado : 'Proyecto ' + (id.numero || '')) + '</span>' +
        (id.nombreAnterior ? '<span class="chip-gris">Antes: ' + esc(id.nombreAnterior) + '</span>' : '') + '</p>' +
        '<h1>' + esc(p.nombre) + '</h1>' + (tieneContenido(p.subtitulo) ? '<p class="hero__bajada">' + esc(p.subtitulo) + '</p>' : '') + datosHero(p) + '</div>' +
        botones(p, 'boton--principal', 'boton--secundario') + '</div>' +
        (metricas.length ? '<dl class="metricas">' + metricas.map(function (m) { return '<div><dt>' + esc(m[0]) + '</dt><dd>' + esc(m[1]) + '</dd></div>'; }).join('') + '</dl>' : '');
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
          return '<a href="#' + esc(d.id) + '">' + (iconos[i] || '') + '<strong>' + esc(d.modulo) + '</strong><span>' + esc(d.nombre) + '</span></a>';
        }).join('') + '</div>' : '') + datosHero(p) + botones(p, 'boton--principal', 'boton--secundario') + '</div></div>';
    },

    // Mesas de ayuda: noche institucional con tarjetas de solicitud.
    mesas: function (p, base) {
      const mesas = conContenido((p.extras || {}).mesas);
      const estados = [['Abierta', 'e1'], ['En atención', 'e2'], ['Resuelta', 'e3'], ['Cerrada', 'e4']];
      return '<div class="contenedor hero__interior">' + migas(p, base) + '<div class="hero__rejilla"><div>' +
        '<p class="hero__rotulo">' + esc(rotuloProyecto(p) + ' · ' + ((p.identidad || {}).etiqueta || '')) + '</p><h1>' + esc(p.nombre) + '</h1>' +
        (tieneContenido(p.subtitulo) ? '<p class="hero__bajada">' + esc(p.subtitulo) + '</p>' : '') +
        (mesas.length ? '<p class="hero__cifra">' + mesas.length + '</p><p class="hero__cifra-texto">mesas de ayuda creadas</p>' : '') +
        datosHero(p) + botones(p, 'boton--principal', 'boton--secundario') + '</div>' +
        '<div class="tickets" aria-hidden="true">' + estados.map(function (e, i) {
          return '<div class="ticket ticket--' + i + '"><span class="ticket__num">#' + dos(i + 1) + '</span><span class="ticket__estado ' + e[1] + '">' + e[0] + '</span><span class="ticket__linea"></span><span class="ticket__linea corta"></span></div>';
        }).join('') + '</div></div></div>';
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
      return seccion(ctx, 'navegacion', 'Módulos por rol', '<p class="sec__nota">Organización real de la navegación de la aplicación.</p>' +
        '<div class="grupos">' + g.map(function (x) {
          return '<div class="grupo"><h3>' + esc(x.titulo) + '</h3><ul>' + conContenido(x.items).map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul></div>';
        }).join('') + '</div>' + sub('Roles', chips(ex.roles, 'chip--suave')));
    },
    // Gestión ágil.
    function (p, ctx) {
      const ga = p.gestionAgil || {};
      if (!tieneContenido(ga.historiasUsuario) && !tieneContenido(ga.sprints)) return '';
      const sprints = ga.sprints ? '<ol class="sprints">' + Array.from({ length: ga.sprints }, function (_, i) { return '<li>Sprint ' + (i + 1) + '</li>'; }).join('') + '</ol>' : '';
      return seccion(ctx, 'agil', 'Gestión ágil', '<dl class="cifras-ficha">' +
        (tieneContenido(ga.historiasUsuario) ? '<div><dt>historias de usuario</dt><dd>' + esc(ga.historiasUsuario) + '</dd></div>' : '') +
        (tieneContenido(ga.sprints) ? '<div><dt>sprints</dt><dd>' + esc(ga.sprints) + '</dd></div>' : '') + '</dl>' + sprints +
        '<p class="sec__nota">Cada sprint se gestiona como un Milestone de GitHub y cada historia como un issue con sus criterios de aceptación.</p>');
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
          (conContenido(x.modulosBackend).length ? '<p>Módulos: ' + esc(conContenido(x.modulosBackend).join(', ')) + '</p>' : '') + '</div></div></article>';
      }).join('') + (tieneContenido((p.extras || {}).baseNormativa) ? '<p class="sec__nota">Base normativa: ' + esc(p.extras.baseNormativa) + '</p>' : '');
      return seccion(ctx, 'desarrollos', 'Los dos desarrollos', cuerpo);
    },
    // Mesas de ayuda y flujo de solicitudes.
    function (p, ctx) {
      const ex = p.extras || {};
      const m = conContenido(ex.mesas);
      const f = conContenido(ex.flujo);
      return seccion(ctx, 'mesas', 'Las mesas', m.length ? '<ul class="mesas">' + m.map(function (x) {
        return '<li class="mesa"><h3>' + esc(x.nombre) + '</h3>' + (tieneContenido(x.atiende) ? '<p>' + esc(x.atiende) + '</p>' : '') +
          chips([x.dependencia, x.herramienta].filter(tieneContenido)) + '</li>';
      }).join('') + '</ul>' : '') +
        seccion(ctx, 'flujo', 'Ciclo de una solicitud', f.length ? '<ol class="flujo">' + f.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol>' : '');
    },
    // Arquitectura: stack principal, todas las tecnologías (desplegable), diagramas y textos que no repiten a los diagramas.
    function (p, ctx) {
      const capas = conContenido(p.capas);
      const diagramas = renderDiagramas(p, ctx.base);
      const respaldo = diagramas || !capas.length ? '' : '<ol class="capas" aria-label="Capas de la arquitectura">' + capas.map(function (c, i) {
        return (i ? '<li class="capas__flecha" aria-hidden="true">→</li>' : '') + '<li class="capa capa--' + (i + 1) + '"><p class="capa__rol">' + esc(c.rol) + '</p><p class="capa__nombre">' + esc(c.nombre) + '</p>' +
          (tieneContenido(c.detalle) ? '<p class="capa__detalle">' + esc(c.detalle) + '</p>' : '') + '</li>';
      }).join('') + '</ol>';
      const t = p.teoria || {};
      const textos = TEORIA.filter(function (x) { return tieneContenido(t[x.clave]); }).map(function (x) {
        return '<div><h3>' + esc(x.titulo) + '</h3>' + parrafos(t[x.clave], 'sec__texto') + '</div>';
      }).join('');
      return seccion(ctx, 'arquitectura', 'Arquitectura', renderStack(p, ctx.base) + renderTodasTecnologias(p, ctx.base) + diagramas + respaldo +
        (textos ? '<div class="bloques-texto" style="margin-top:var(--sp-6)">' + textos + '</div>' : ''));
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
      return seccion(ctx, 'modelo-datos', 'Modelo de datos', datos([
        { etiqueta: 'Motor', valor: md.motor }, { etiqueta: 'ORM', valor: md.orm },
        { etiqueta: 'Migraciones', valor: md.migraciones }, { etiqueta: 'Datos semilla', valor: md.seeds }
      ]) + (conContenido(md.entidades).length ? '<div style="margin-top:var(--sp-5)">' + tabla(md.entidades, [
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
   * Logos de tecnologías (Simple Icons, CC0, en assets/img/tecnologias/)
   * ------------------------------------------------------------------- */

  // Prefijo del nombre de la tecnología → archivo del logo. Los más largos van primero.
  const LOGOS = [
    ['react router', 'reactrouter'], ['react', 'react'], ['vite', 'vite'], ['typescript', 'typescript'],
    ['javascript', 'javascript'], ['nestjs', 'nestjs'], ['node', 'nodedotjs'], ['mariadb', 'mariadb'],
    ['mysql', 'mysql'], ['typeorm', 'typeorm'], ['angular', 'angular'], ['github actions', 'githubactions'],
    ['github', 'github'], ['cpanel', 'cpanel'], ['pm2', 'pm2'], ['swagger', 'swagger'], ['docker', 'docker'],
    ['jest', 'jest'], ['pnpm', 'pnpm'], ['passport', 'passport'], ['jwt', 'jsonwebtokens'],
    ['2 jwt', 'jsonwebtokens'], ['axios', 'axios'], ['postman', 'postman'], ['eslint', 'eslint'],
    ['prettier', 'prettier'], ['pwa', 'pwa'], ['supabase', 'supabase']
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
        return { texto: x.nombre, extra: x.version, titulo: x.uso, clase: c.chip, logo: archivoLogo(x.nombre) ? logoTec(x.nombre, base, 'chip__logo') : '' };
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
      { etiqueta: 'Puerto', valor: d.puerto, codigo: true },
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
  function renderPaginador(id, proyectos, base) {
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
  function renderGantt(proyectos, cronograma, general, base, hoy) {
    const lista = proyectos || window.PROYECTOS || [];
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
    const filas = '<li class="gantt__fila"><span class="gantt__etiqueta">Periodo de pasantía</span><div class="gantt__pista">' + fondo + barra(inicio, fin, '#e6eef8') + '</div></li>' +
      lista.map(function (p) {
        const a = aFecha(p.periodo && p.periodo.inicio);
        const b = aFecha(p.periodo && p.periodo.fin);
        const color = (p.identidad || {}).color || '#004f9f';
        let cont = '<span class="gantt__pendiente">Fechas por definir</span>';
        if (a) {
          const hasta = b || (hoyVisible ? fechaHoy : fin);
          cont = barra(a, hasta < a ? a : hasta, color, !b);
        }
        return '<li class="gantt__fila"><span class="gantt__etiqueta"><a href="' + esc(rutaProyecto(p.id, r)) + '">' + esc((p.identidad || {}).nombreCorto || p.nombre) + '</a></span><div class="gantt__pista">' + fondo + cont + '</div></li>';
      }).join('');
    const cabecera = '<div class="gantt__fila" aria-hidden="true"><span></span><div class="gantt__pista gantt__pista--meses">' + meses.map(function (m) {
      return '<span class="gantt__mes" style="left:' + m.izq.toFixed(2) + '%;width:' + m.ancho.toFixed(2) + '%">' + esc(m.nombre) + '</span>';
    }).join('') + (hoyVisible ? '<span class="gantt__hoy-rotulo" style="left:' + posHoy + '%">Hoy</span>' : '') + '</div></div>';
    return '<section class="seccion" id="gantt" aria-labelledby="gantt-t"><h2 class="seccion__titulo" id="gantt-t">Proyectos en el tiempo</h2>' +
      '<p class="seccion__entradilla">Del ' + esc(formatearFecha(aIso(inicio))) + ' al ' + esc(formatearFecha(aIso(fin))) + '. Cada barra lleva el color de su proyecto.</p>' +
      '<div class="gantt-caja" role="region" tabindex="0" aria-label="Diagrama de Gantt de los proyectos"><div class="gantt">' + cabecera + '<ul class="gantt__filas">' + filas + '</ul></div></div></section>';
  }

  /* ---------------------------------------------------------------------
   * Conclusiones
   * ------------------------------------------------------------------- */

  // Resultados, aportes, dificultades, conclusiones, recomendaciones y anexos.
  function renderConclusiones(g, proyectos, cron, base) {
    const ci = g.cierre || {};
    const meta = cron.metaHoras || 0;
    const hechas = cron.horasAcumuladas || 0;
    const micro = (g.indicadores || {}).micrositiosIntervenidos;
    const prod = proyectos.filter(function (p) { return p.estado === 'En producción'; });
    let s = 'Al corte de este informe se acumulan ' + num(hechas) + ' de ' + num(meta) + ' horas (' + num(meta ? (hechas / meta) * 100 : 0) + ' % de la meta), distribuidas en ' + proyectos.length + ' frentes de trabajo.';
    if (tieneContenido(micro)) s += ' En el frente de micrositios se intervinieron ' + String(micro).replace(/^(\d+)\s*\+$/, 'más de $1') + ' sitios de programas académicos.';
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
    const pend = proyectos.filter(function (p) { return conContenido(p.pendientes).length; });
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
    montar('#crono-cabecera', renderCabeceraCronograma(d.cron));
    montar('#cronograma', renderCronograma(d.cron));
    montar('#gantt', renderGantt(d.proyectos, d.cron, d.general, raiz()));
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
