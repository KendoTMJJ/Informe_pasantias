/*
 * data/proyectos.js — Fichas de los frentes de trabajo de la pasantía.
 *
 * Cada proyecto tiene TODOS los campos del esquema. Lo vacío ("", null o una
 * plantilla en blanco dentro de un arreglo) no se muestra: la sección
 * correspondiente desaparece sin dejar títulos huérfanos.
 *
 * Reglas:
 *  - Fechas en formato ISO "AAAA-MM-DD".
 *  - estado: "En producción" | "Entregado" | "En desarrollo".
 *  - tecnologias[].categoria: "frontend" | "backend" | "bd" | "devops" | "herramienta".
 *  - despliegue.variablesEntorno: SOLO nombres de variables, jamás valores.
 *  - capturas[].src: ruta relativa a la raíz, sin "/" inicial
 *    (ej.: "assets/img/reservalab/calendario.png").
 *
 * Campos adicionales al esquema original:
 *  - identidad: tema visual de la ficha (ver assets/css/temas/<tema>.css),
 *    color para el Gantt y número/etiqueta de la tarjeta en la portada.
 *  - capas: diagrama de arquitectura [{ rol, nombre, detalle }].
 *  - gestionAgil: historias de usuario y sprints.
 *  - extras: contenido propio de cada frente (sellos, grupos de módulos,
 *    desarrollos, mesas…). Cada ficha usa solo los que le aplican.
 *
 * Los datos de repositorios, versiones, workflows, procesos PM2 y nombres de
 * variables se tomaron de los repositorios el 1 de octubre de 2026.
 */
window.PROYECTOS = [
  {
    id: "micrositios",
    nombre: "Micrositios institucionales",
    subtitulo: "Intervención de los sitios de más de 16 programas académicos",
    estado: "",
    solicitante: "",
    periodo: { inicio: "", fin: "" },
    horasAproximadas: null,
    proposito: "",
    descripcion: "",
    identidad: { tema: "micrositios", color: "#009fe3", numero: "01", etiqueta: "Portales institucionales" },
    capas: [],
    teoria: {
      arquitectura: "", organizacion: "", flujoPeticion: "",
      autenticacion: "", manejoErrores: "", documentacionApi: ""
    },
    modulos: [
      { nombre: "", responsabilidad: "", entidades: "", endpoints: "" }
    ],
    modeloDatos: {
      motor: "", orm: "", migraciones: "", seeds: "",
      entidades: [{ nombre: "", campos: "", relaciones: "" }]
    },
    tecnologias: [
      { nombre: "", version: "", uso: "", categoria: "" }
    ],
    herramientas: {
      convencionCommits: "", estrategiaRamas: "",
      actions: [{ nombre: "", disparador: "", jobs: "", automatiza: "" }],
      otras: [""]
    },
    gestionAgil: { historiasUsuario: null, sprints: null },
    despliegue: {
      plataforma: "", evidencia: "",
      pm2: { proceso: "", script: "", modo: "", instancias: "", logs: "" },
      servidorWeb: "", comandoBuild: "", comandoStart: "",
      variablesEntorno: [""], puerto: "", cors: ""
    },
    calidad: { pruebas: "", rendimiento: [""], accesibilidad: [""], seguridad: [""] },
    hitos: [{ fecha: "", descripcion: "" }],
    repositorios: [{ nombre: "", url: "", commits: null, primerCommit: "", ultimoCommit: "" }],
    urlProduccion: "",
    capturas: [{ src: "", alt: "", pie: "" }],
    pendientes: [""],
    extras: {
      cantidadProgramas: 16,
      programas: [""],               // nombres de los programas intervenidos
      lineamientos: [
        { titulo: "Imagen institucional", detalle: "" },
        { titulo: "Accesibilidad", detalle: "" },
        { titulo: "Rendimiento", detalle: "" }
      ]
    }
  },

  {
    id: "camina",
    nombre: "CAMINA-Living-Lab",
    subtitulo: "Retos reales. Soluciones co-creadas. Impacto territorial.",
    estado: "",
    solicitante: "",
    periodo: { inicio: "", fin: "" },
    horasAproximadas: null,
    proposito: "",
    descripcion: "Landing del ecosistema de innovación abierta de la Universidad Santo Tomás – Seccional Tunja, con panel administrativo para retos, servicios, noticias y aliados.",
    identidad: { tema: "camina", color: "#2c56fc", numero: "02", etiqueta: "Living Lab" },
    capas: [
      { rol: "Landing", nombre: "React 19 + Vite 8", detalle: "camina-front" },
      { rol: "API REST", nombre: "NestJS 11", detalle: "camina-back" },
      { rol: "Datos", nombre: "TypeORM · mysql2", detalle: "con migraciones" }
    ],
    teoria: {
      arquitectura: "", organizacion: "", flujoPeticion: "",
      autenticacion: "", manejoErrores: "", documentacionApi: ""
    },
    modulos: [
      { nombre: "auth", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "user", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "challenges", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "challenge-types", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "submissions", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "services", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "news", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "partners", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "uploads", responsabilidad: "", entidades: "", endpoints: "" }
    ],
    modeloDatos: {
      motor: "", orm: "TypeORM", migraciones: "TypeORM (src/migrations)", seeds: "",
      entidades: [{ nombre: "", campos: "", relaciones: "" }]
    },
    tecnologias: [
      { nombre: "React", version: "19.2", uso: "", categoria: "frontend" },
      { nombre: "Vite", version: "8", uso: "", categoria: "frontend" },
      { nombre: "NestJS", version: "11", uso: "", categoria: "backend" },
      { nombre: "TypeORM", version: "1.0", uso: "", categoria: "backend" },
      { nombre: "mysql2", version: "3.22", uso: "", categoria: "bd" },
      { nombre: "GitHub Actions", version: "", uso: "", categoria: "devops" },
      { nombre: "PM2", version: "", uso: "", categoria: "devops" },
      { nombre: "pnpm", version: "", uso: "", categoria: "herramienta" }
    ],
    herramientas: {
      convencionCommits: "",
      estrategiaRamas: "develop para integración; deploy dispara la compilación; cpanel-dist guarda solo el resultado compilado.",
      actions: [
        { nombre: "Build CPanel (front)", disparador: "push a deploy", jobs: "build", automatiza: "Compila con pnpm y publica el dist en cpanel-dist; cPanel lo copia con rsync a public_html/CaminaLivingLab/." },
        { nombre: "Build CPanel (back)", disparador: "push a deploy", jobs: "build", automatiza: "Compila la API y publica el dist en cpanel-dist." }
      ],
      otras: [""]
    },
    gestionAgil: { historiasUsuario: null, sprints: null },
    despliegue: {
      plataforma: "cPanel",
      evidencia: ".github/workflows/build-cpanel.yml · deploy/cpanel-deploy.sh",
      pm2: { proceso: "api-LivingLab", script: "main.js", modo: "", instancias: "", logs: "" },
      servidorWeb: "public_html/CaminaLivingLab/",
      comandoBuild: "pnpm build",
      comandoStart: "pm2 start main.js --name api-LivingLab",
      variablesEntorno: ["DB_HOST", "DB_PORT", "DB_USER", "DB_PASSWORD", "DB_NAME", "NODE_ENV", "PORT", "FRONTEND_URL", "JWT_SECRET", "MAIL_HOST", "MAIL_PORT", "MAIL_USER", "MAIL_PASS", "MAIL_FROM", "SEED_ADMIN_NAME", "SEED_ADMIN_EMAIL", "SEED_ADMIN_PASSWORD"],
      puerto: "", cors: "FRONTEND_URL"
    },
    calidad: { pruebas: "", rendimiento: [""], accesibilidad: [""], seguridad: [""] },
    hitos: [{ fecha: "", descripcion: "" }],
    repositorios: [
      { nombre: "CAMINA-Living-Lab-front", url: "https://github.com/Santoto-Web/CAMINA-Living-Lab-front", commits: 59, primerCommit: "2026-06-19", ultimoCommit: "2026-10-01" },
      { nombre: "CAMINA-Living-Lab-back", url: "https://github.com/Santoto-Web/CAMINA-Living-Lab-back", commits: 48, primerCommit: "2026-06-17", ultimoCommit: "2026-10-01" }
    ],
    urlProduccion: "",
    capturas: [{ src: "", alt: "", pie: "" }],
    pendientes: [""],
    extras: { relacionado: "rally-living-lab" }
  },

  {
    id: "rally-neotomasino",
    nombre: "Pasaporte Neotomasino",
    subtitulo: "Rally de bienvenida: los estudiantes nuevos recorren el campus, visitan dependencias y sellan su pasaporte.",
    estado: "",
    solicitante: "",
    periodo: { inicio: "2026-07-14", fin: "2026-07-31" },
    horasAproximadas: null,
    proposito: "",
    descripcion: "",
    identidad: { tema: "neotomasino", color: "#f39200", numero: "03", etiqueta: "Rally de bienvenida", nombreCorto: "Rally Neotomasino" },
    capas: [
      { rol: "Cliente", nombre: "React 18 + Vite 5", detalle: "Pasaporte y panel de staff" },
      { rol: "API REST", nombre: "NestJS 11", detalle: "rally-back" },
      { rol: "Datos", nombre: "MariaDB", detalle: "TypeORM · mysql2" }
    ],
    teoria: {
      arquitectura: "", organizacion: "", flujoPeticion: "",
      autenticacion: "", manejoErrores: "", documentacionApi: ""
    },
    modulos: [
      { nombre: "auth", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "admin", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "students", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "teams", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "stations", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "stamps", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "stages", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "buildings", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "challenge", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "staff", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "mail", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "uploads", responsabilidad: "", entidades: "", endpoints: "" }
    ],
    modeloDatos: {
      motor: "MariaDB", orm: "TypeORM", migraciones: "", seeds: "",
      entidades: [{ nombre: "", campos: "", relaciones: "" }]
    },
    tecnologias: [
      { nombre: "React", version: "18.3", uso: "", categoria: "frontend" },
      { nombre: "Vite", version: "5.4", uso: "", categoria: "frontend" },
      { nombre: "Poppins", version: "autoalojada", uso: "Tipografía de marca", categoria: "frontend" },
      { nombre: "NestJS", version: "11", uso: "", categoria: "backend" },
      { nombre: "TypeORM", version: "1.1", uso: "", categoria: "backend" },
      { nombre: "MariaDB", version: "", uso: "", categoria: "bd" },
      { nombre: "mysql2", version: "3.23", uso: "", categoria: "bd" }
    ],
    herramientas: {
      convencionCommits: "", estrategiaRamas: "",
      actions: [{ nombre: "", disparador: "", jobs: "", automatiza: "" }],
      otras: [""]
    },
    gestionAgil: { historiasUsuario: null, sprints: null },
    despliegue: {
      plataforma: "", evidencia: "",
      pm2: { proceso: "", script: "", modo: "", instancias: "", logs: "" },
      servidorWeb: "", comandoBuild: "", comandoStart: "",
      variablesEntorno: [""], puerto: "", cors: ""
    },
    calidad: { pruebas: "", rendimiento: [""], accesibilidad: [""], seguridad: [""] },
    hitos: [
      { fecha: "2026-07-14", descripcion: "Inicio del desarrollo" },
      { fecha: "2026-07-29", descripcion: "" },
      { fecha: "2026-07-31", descripcion: "Cierre del periodo de desarrollo" }
    ],
    repositorios: [
      // Repositorios compartidos con el Rally Living Lab (el commit b10d088 es el rally original).
      { nombre: "Rally_Tomasino_front", url: "https://github.com/Santoto-Web/Rally_Tomasino_front", commits: 7, primerCommit: "2026-09-22", ultimoCommit: "2026-10-01" },
      { nombre: "Rally_Tomasino_back", url: "https://github.com/Santoto-Web/Rally_Tomasino_back", commits: 7, primerCommit: "2026-09-22", ultimoCommit: "2026-10-01" }
    ],
    urlProduccion: "",
    capturas: [{ src: "", alt: "", pie: "" }],
    pendientes: [""],
    extras: {
      // Dependencias con sello propio (iconos del commit original b10d088).
      sellos: [
        { nombre: "Comunicaciones", img: "assets/img/rally-neotomasino/sellos/comunicaciones.svg" }, { nombre: "Bienestar", img: "assets/img/rally-neotomasino/sellos/bienestar.svg" }, { nombre: "CRAI", img: "assets/img/rally-neotomasino/sellos/crai.svg" },
        { nombre: "Laboratorios", img: "assets/img/rally-neotomasino/sellos/laboratorios.svg" }, { nombre: "Investigación e innovación", img: "assets/img/rally-neotomasino/sellos/investigacion.svg" },
        { nombre: "Proyección social", img: "assets/img/rally-neotomasino/sellos/proyeccion.svg" }, { nombre: "Admisiones y marketing", img: "assets/img/rally-neotomasino/sellos/admin-marketing.svg" },
        { nombre: "Promoción estudiantil", img: "assets/img/rally-neotomasino/sellos/promocion.svg" }
      ],
      tituloSellos: "Dependencias y sellos",
      relacionado: "rally-living-lab"
    }
  },

  {
    id: "rally-living-lab",
    nombre: "Rally Living Lab",
    subtitulo: "Festival Santoto Camina Living Lab: Mapa de soluciones",
    estado: "",
    solicitante: "",
    periodo: { inicio: "", fin: "" },
    horasAproximadas: null,
    proposito: "",
    descripcion: "Versión del rally construida sobre la base del Pasaporte Neotomasino y vinculada temáticamente con CAMINA Living Lab: misma arquitectura, nueva identidad y catálogos dinámicos en el registro de equipos.",
    identidad: { tema: "livinglab", color: "#b5d334", numero: "04", etiqueta: "Festival Living Lab" },
    capas: [
      { rol: "Cliente", nombre: "React 18 + Vite 5", detalle: "Rally_Tomasino_front · rama rally/camina" },
      { rol: "API REST", nombre: "NestJS 11", detalle: "Rally_Tomasino_back" },
      { rol: "Datos", nombre: "MariaDB", detalle: "TypeORM · mysql2" }
    ],
    teoria: {
      arquitectura: "", organizacion: "", flujoPeticion: "",
      autenticacion: "Dos esquemas JWT separados: uno para el panel administrativo y otro para los estudiantes participantes (variables JWT_SECRET y STUDENT_JWT_SECRET).",
      manejoErrores: "", documentacionApi: ""
    },
    modulos: [
      { nombre: "auth", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "admin", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "students", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "teams", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "stations", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "stamps", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "stages", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "buildings", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "challenge", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "comm-recruit", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "instructivo", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "staff", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "mail", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "uploads", responsabilidad: "", entidades: "", endpoints: "" }
    ],
    modeloDatos: {
      motor: "MariaDB", orm: "TypeORM", migraciones: "", seeds: "",
      entidades: [{ nombre: "", campos: "", relaciones: "" }]
    },
    tecnologias: [
      { nombre: "React", version: "18.3", uso: "", categoria: "frontend" },
      { nombre: "Vite", version: "5.4", uso: "", categoria: "frontend" },
      { nombre: "Nunito", version: "@fontsource", uso: "Tipografía de marca", categoria: "frontend" },
      { nombre: "NestJS", version: "11", uso: "", categoria: "backend" },
      { nombre: "TypeORM", version: "1.1", uso: "", categoria: "backend" },
      { nombre: "MariaDB", version: "", uso: "", categoria: "bd" },
      { nombre: "mysql2", version: "3.23", uso: "", categoria: "bd" },
      { nombre: "GitHub Actions", version: "", uso: "", categoria: "devops" },
      { nombre: "PM2", version: "", uso: "", categoria: "devops" },
      { nombre: "pnpm", version: "", uso: "", categoria: "herramienta" }
    ],
    herramientas: {
      convencionCommits: "",
      estrategiaRamas: "rally/camina para el desarrollo; deploy/camina dispara la compilación; cpanel-dist/camina guarda el resultado compilado. Tres contribuciones externas integradas por pull request.",
      actions: [
        { nombre: "Build CPanel (front)", disparador: "push a deploy/camina", jobs: "build", automatiza: "Compila con pnpm y publica el dist en cpanel-dist/camina; cPanel lo copia con rsync a public_html/RallyLivingLab/." },
        { nombre: "Build CPanel (back)", disparador: "push a deploy/camina", jobs: "build", automatiza: "Compila la API y publica el dist en cpanel-dist/camina." }
      ],
      otras: [""]
    },
    gestionAgil: { historiasUsuario: null, sprints: null },
    despliegue: {
      plataforma: "cPanel",
      evidencia: ".github/workflows/build-cpanel.yml · deploy/cpanel-deploy.sh",
      pm2: { proceso: "api-rallyCamina", script: "main.js", modo: "", instancias: "", logs: "" },
      servidorWeb: "public_html/RallyLivingLab/",
      comandoBuild: "pnpm build",
      comandoStart: "pm2 start main.js --name api-rallyCamina",
      variablesEntorno: ["NODE_ENV", "PORT", "FRONTEND_URL", "DB_HOST", "DB_PORT", "DB_NAME", "DB_USER", "DB_PASSWORD", "RALLY_SECRET", "COOLDOWN_MS", "CODE_VALID_MINUTES", "CHALLENGE_PREP_MINUTES", "CHALLENGE_MINUTES", "JWT_SECRET", "JWT_EXPIRES_IN", "STUDENT_JWT_SECRET", "STUDENT_JWT_EXPIRES_IN", "INITIAL_ADMIN_NAME", "INITIAL_ADMIN_EMAIL", "INITIAL_ADMIN_PASSWORD", "RESET_TOKEN_EXPIRES_IN", "PANEL_RESET_PASSWORD_URL", "SMTP_HOST", "SMTP_PORT", "SMTP_SECURE", "SMTP_USER", "SMTP_PASSWORD", "SMTP_FROM"],
      puerto: "", cors: "FRONTEND_URL"
    },
    calidad: { pruebas: "", rendimiento: [""], accesibilidad: [""], seguridad: [""] },
    hitos: [
      { fecha: "2026-09-22", descripcion: "Repositorios publicados en la organización Santoto-Web" },
      { fecha: "", descripcion: "" }
    ],
    repositorios: [
      { nombre: "Rally_Tomasino_front", url: "https://github.com/Santoto-Web/Rally_Tomasino_front", commits: 7, primerCommit: "2026-09-22", ultimoCommit: "2026-10-01" },
      { nombre: "Rally_Tomasino_back", url: "https://github.com/Santoto-Web/Rally_Tomasino_back", commits: 7, primerCommit: "2026-09-22", ultimoCommit: "2026-10-01" }
    ],
    urlProduccion: "",
    capturas: [{ src: "", alt: "", pie: "" }],
    pendientes: [""],
    extras: {
      // Sellos del mapa de soluciones (carpeta ELEMENTOS DIGITALES PARA RALLY).
      sellos: [
        { nombre: "Acción", img: "assets/img/rally-living-lab/sellos/accion.svg" }, { nombre: "Apropiación", img: "assets/img/rally-living-lab/sellos/apropiacion.svg" }, { nombre: "Co-creación", img: "assets/img/rally-living-lab/sellos/co-creacion.svg" },
        { nombre: "Iteración", img: "assets/img/rally-living-lab/sellos/iteracion.svg" }, { nombre: "Medición", img: "assets/img/rally-living-lab/sellos/medicion.svg" }, { nombre: "Narrativa", img: "assets/img/rally-living-lab/sellos/narrativa.svg" }
      ],
      tituloSellos: "Sellos del mapa de soluciones",
      comparativa: "rally-neotomasino",
      relacionado: "camina"
    }
  },

  {
    id: "reservalab",
    nombre: "ReservaLab",
    subtitulo: "Reserva y gestión de laboratorios de la seccional",
    estado: "",
    solicitante: "",
    periodo: { inicio: "", fin: "" },
    horasAproximadas: null,
    proposito: "",
    descripcion: "",
    identidad: { tema: "reservalab", color: "#004f9f", numero: "05", etiqueta: "Reservas", nombreAnterior: "SigueLab" },
    capas: [
      { rol: "Cliente", nombre: "Angular 21", detalle: "siguelab-front" },
      { rol: "API REST", nombre: "NestJS 11", detalle: "siguelab-back" },
      { rol: "Datos", nombre: "TypeORM · mysql2", detalle: "" }
    ],
    teoria: {
      arquitectura: "", organizacion: "", flujoPeticion: "",
      autenticacion: "Inicio de sesión con la cuenta institucional a través de Microsoft Entra ID (variables TENANT_ID, API_CLIENT_ID y API_APPLICATION_ID_URI).",
      manejoErrores: "", documentacionApi: ""
    },
    modulos: [
      { nombre: "auth", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "usuarios", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "roles", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "solicitudes", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "laboratorios", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "equipos-laboratorio", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "eventos-laboratorio", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "horarios-academicos", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "catalogos", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "servicios", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "servicios-tecnologicos", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "bitacora", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "estadisticas", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "reportes", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "notificaciones", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "directorio", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "mail", responsabilidad: "", entidades: "", endpoints: "" }
    ],
    modeloDatos: {
      motor: "", orm: "TypeORM", migraciones: "", seeds: "",
      entidades: [{ nombre: "", campos: "", relaciones: "" }]
    },
    tecnologias: [
      { nombre: "Angular", version: "21.2", uso: "", categoria: "frontend" },
      { nombre: "NestJS", version: "11", uso: "", categoria: "backend" },
      { nombre: "TypeORM", version: "1.0", uso: "", categoria: "backend" },
      { nombre: "Microsoft Entra ID", version: "", uso: "Autenticación institucional", categoria: "backend" },
      { nombre: "mysql2", version: "3.22", uso: "", categoria: "bd" },
      { nombre: "GitHub Actions", version: "", uso: "", categoria: "devops" },
      { nombre: "PM2", version: "", uso: "", categoria: "devops" },
      { nombre: "pnpm", version: "", uso: "", categoria: "herramienta" }
    ],
    herramientas: {
      convencionCommits: "",
      estrategiaRamas: "develop para integración; deploy dispara la compilación; cpanel-dist guarda el resultado compilado. Las pruebas corren en cada pull request a main.",
      actions: [
        { nombre: "Build CPanel (front)", disparador: "push a deploy", jobs: "build", automatiza: "Compila con pnpm y publica el dist en cpanel-dist; cPanel lo copia con rsync a public_html/ReservaLabSantoto/browser/." },
        { nombre: "Build CPanel (back)", disparador: "push a deploy", jobs: "build", automatiza: "Compila la API y publica el dist en cpanel-dist." },
        { nombre: "Run Tests on Pull Request", disparador: "pull request a main", jobs: "build-and-test", automatiza: "Compila y ejecuta las pruebas del backend antes de integrar." }
      ],
      otras: [""]
    },
    gestionAgil: { historiasUsuario: 31, sprints: 9 },
    despliegue: {
      plataforma: "cPanel",
      evidencia: ".github/workflows/build-cpanel.yml · deploy/cpanel-deploy.sh",
      pm2: { proceso: "api-reservalab", script: "main.js", modo: "", instancias: "", logs: "" },
      servidorWeb: "public_html/ReservaLabSantoto/browser/",
      comandoBuild: "pnpm build",
      comandoStart: "pm2 start main.js --name api-reservalab",
      variablesEntorno: ["PORT", "DB_HOST", "DB_PORT", "DB_USER", "DB_PASSWORD", "DB_NAME", "FRONTEND_URL", "TENANT_ID", "API_CLIENT_ID", "API_APPLICATION_ID_URI", "SEED_ADMIN_NAME", "SEED_ADMIN_EMAIL", "AFORO_MODO", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"],
      puerto: "", cors: "FRONTEND_URL"
    },
    calidad: { pruebas: "Workflow de pruebas automáticas en cada pull request a main.", rendimiento: [""], accesibilidad: [""], seguridad: [""] },
    hitos: [{ fecha: "", descripcion: "" }],
    repositorios: [
      { nombre: "siguelab-front", url: "https://github.com/WldySandoval1/siguelab-front", commits: 42, primerCommit: "2026-07-10", ultimoCommit: "2026-09-29" },
      { nombre: "siguelab-back", url: "https://github.com/KendoTMJJ/siguelab-back", commits: 55, primerCommit: "2026-07-03", ultimoCommit: "2026-09-29" }
    ],
    urlProduccion: "",
    capturas: [{ src: "", alt: "", pie: "" }],
    pendientes: [""],
    extras: {
      // Navegación real de la aplicación (src/app/layout/sidebar/nav-items.ts).
      gruposModulos: [
        { titulo: "General", items: ["Inicio", "Calendario", "Mis solicitudes", "Reservas especiales"] },
        { titulo: "Gestión", items: ["Aprobaciones", "Historial de solicitudes", "Estadísticas", "Bitácora de uso"] },
        { titulo: "Laboratorios", items: ["Laboratorios", "Horarios académicos"] },
        { titulo: "Catálogos académicos", items: ["Divisiones y facultades", "Espacios académicos", "Periodos académicos"] },
        { titulo: "Usuarios y cuenta", items: ["Usuarios", "Mi perfil"] }
      ],
      roles: ["docente", "laboratorista", "admin"]
    }
  },

  {
    id: "nomina",
    nombre: "Plataforma de Nómina",
    subtitulo: "Dashboard de nómina y pre-nómina de talento humano",
    estado: "",
    solicitante: "",
    periodo: { inicio: "", fin: "" },
    horasAproximadas: null,
    proposito: "",
    descripcion: "Dos desarrollos sobre una misma plataforma para la nómina docente: analítica de lo liquidado y validación de novedades antes de liquidar.",
    identidad: { tema: "nomina", color: "#fdc300", numero: "06", etiqueta: "Talento humano" },
    capas: [
      { rol: "Cliente", nombre: "Angular 22", detalle: "nomina-front-end" },
      { rol: "API REST", nombre: "NestJS 11", detalle: "estadisticas-nomina-back · pre-nomina-back" },
      { rol: "Datos", nombre: "TypeORM · mysql2", detalle: "con migraciones" }
    ],
    teoria: {
      arquitectura: "", organizacion: "", flujoPeticion: "",
      autenticacion: "JWT con segundo factor por código temporal (TOTP) en el dashboard de estadísticas (variables JWT_SECRET y TOTP_ENCRYPTION_KEY).",
      manejoErrores: "", documentacionApi: ""
    },
    modulos: [{ nombre: "", responsabilidad: "", entidades: "", endpoints: "" }],
    modeloDatos: {
      motor: "", orm: "TypeORM", migraciones: "TypeORM (src/migrations)", seeds: "",
      entidades: [{ nombre: "", campos: "", relaciones: "" }]
    },
    tecnologias: [
      { nombre: "Angular", version: "22.1", uso: "", categoria: "frontend" },
      { nombre: "NestJS", version: "11", uso: "", categoria: "backend" },
      { nombre: "TypeORM", version: "1.1", uso: "", categoria: "backend" },
      { nombre: "mysql2", version: "3.23", uso: "", categoria: "bd" },
      { nombre: "GitHub Actions", version: "", uso: "", categoria: "devops" },
      { nombre: "PM2", version: "", uso: "", categoria: "devops" },
      { nombre: "pnpm", version: "", uso: "", categoria: "herramienta" }
    ],
    herramientas: {
      convencionCommits: "",
      estrategiaRamas: "",
      actions: [
        { nombre: "Build CPanel (estadísticas back)", disparador: "push a deploy", jobs: "build", automatiza: "Compila la API y publica el dist en cpanel-dist." }
      ],
      otras: [""]
    },
    gestionAgil: { historiasUsuario: null, sprints: null },
    despliegue: {
      plataforma: "cPanel",
      evidencia: "estadisticas-nomina-back: .github/workflows/build-cpanel.yml · deploy/cpanel-deploy.sh",
      pm2: { proceso: "api-EstadisticasNomina", script: "main.js", modo: "", instancias: "", logs: "" },
      servidorWeb: "",
      comandoBuild: "pnpm build",
      comandoStart: "pm2 start main.js --name api-EstadisticasNomina",
      variablesEntorno: ["PORT", "DB_HOST", "DB_PORT", "DB_USER", "DB_PASSWORD", "DB_NAME", "FRONTEND_URL", "JWT_SECRET", "SMTP_HOST", "SMTP_PORT", "SMTP_SECURE", "SMTP_USER", "SMTP_PASSWORD", "SMTP_FROM", "ADMIN_NAME", "ADMIN_EMAIL", "ADMIN_PASSWORD", "TOTP_ENCRYPTION_KEY", "DEV_NAME", "DEV_EMAIL", "DEV_PASSWORD"],
      puerto: "", cors: "FRONTEND_URL"
    },
    calidad: { pruebas: "", rendimiento: [""], accesibilidad: [""], seguridad: [""] },
    hitos: [{ fecha: "", descripcion: "" }],
    repositorios: [
      { nombre: "nomina-front-end", url: "https://github.com/WldySandoval1/nomina-front-end", commits: 5, primerCommit: "2026-08-31", ultimoCommit: "2026-09-22" },
      { nombre: "estadisticas-nomina-back", url: "https://github.com/WldySandoval1/estadisticas-nomina-back", commits: 8, primerCommit: "2026-08-31", ultimoCommit: "2026-09-30" },
      { nombre: "pre-nomina-back", url: "https://github.com/KendoTMJJ/pre-nomina-back", commits: 1, primerCommit: "2026-09-09", ultimoCommit: "2026-09-09" }
    ],
    urlProduccion: "",
    capturas: [{ src: "", alt: "", pie: "" }],
    pendientes: [""],
    extras: {
      desarrollos: [
        {
          id: "dashboard",
          rotulo: "Desarrollo 1",
          nombre: "Dashboard de nómina",
          modulo: "Estadísticas Nómina",
          descripcion: "Analítica, liquidaciones y reportes de nómina.",
          vistas: ["Panel", "Nómina", "Liquidaciones", "Usuarios"],
          backend: "estadisticas-nomina-back",
          modulosBackend: ["auth", "user", "payroll", "liquidaciones", "presupuesto", "reportes", "seguridad", "mail"]
        },
        {
          id: "prenomina",
          rotulo: "Desarrollo 2",
          nombre: "Pre-nómina de talento humano",
          modulo: "Novedades de Nómina",
          descripcion: "Validación de la nómina de docentes de posgrado antes de liquidar.",
          // Pantallas del frontend (features/directivo y features/admin). Orden del flujo por confirmar.
          vistas: ["Directivo: inicio", "Directivo: revisar", "Solicitudes", "Tarifas", "Programas", "Consolidado"],
          backend: "pre-nomina-back",
          modulosBackend: []
        }
      ],
      baseNormativa: "Lineamientos de nómina, horarios y planeación académica 2026-2 (anexos 1 a 7)."
    }
  },

  {
    id: "mesas-ayuda",
    nombre: "Mesas de ayuda",
    subtitulo: "",
    estado: "",
    solicitante: "",
    periodo: { inicio: "", fin: "" },
    horasAproximadas: null,
    proposito: "",
    descripcion: "",
    identidad: { tema: "mesas", color: "#00336a", numero: "07", etiqueta: "Soporte" },
    capas: [],
    teoria: {
      arquitectura: "", organizacion: "", flujoPeticion: "",
      autenticacion: "", manejoErrores: "", documentacionApi: ""
    },
    modulos: [{ nombre: "", responsabilidad: "", entidades: "", endpoints: "" }],
    modeloDatos: {
      motor: "", orm: "", migraciones: "", seeds: "",
      entidades: [{ nombre: "", campos: "", relaciones: "" }]
    },
    tecnologias: [{ nombre: "", version: "", uso: "", categoria: "" }],
    herramientas: {
      convencionCommits: "", estrategiaRamas: "",
      actions: [{ nombre: "", disparador: "", jobs: "", automatiza: "" }],
      otras: [""]
    },
    gestionAgil: { historiasUsuario: null, sprints: null },
    despliegue: {
      plataforma: "", evidencia: "",
      pm2: { proceso: "", script: "", modo: "", instancias: "", logs: "" },
      servidorWeb: "", comandoBuild: "", comandoStart: "",
      variablesEntorno: [""], puerto: "", cors: ""
    },
    calidad: { pruebas: "", rendimiento: [""], accesibilidad: [""], seguridad: [""] },
    hitos: [{ fecha: "", descripcion: "" }],
    repositorios: [{ nombre: "", url: "", commits: null, primerCommit: "", ultimoCommit: "" }],
    urlProduccion: "",
    capturas: [{ src: "", alt: "", pie: "" }],
    pendientes: [""],
    extras: {
      // Una entrada por mesa creada.
      mesas: [{ nombre: "", dependencia: "", atiende: "", herramienta: "" }],
      flujo: [""]                    // etapas reales de una solicitud
    }
  }
];
