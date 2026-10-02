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
    subtitulo: "Gestión de los portales de la seccional durante toda la pasantía: información, imágenes y pantallas en el portal principal —sobre todo las páginas de los programas— y la gestión de cuatro micrositios independientes de dependencias.",
    estado: "",
    solicitante: "",
    periodo: { inicio: "2026-06-01", fin: "2026-10-02" },
    horasAproximadas: null,
    // POR CONFIRMAR: redactado a partir de la descripción del trabajo y de los sitios en producción.
    proposito: "La universidad divulga su oferta académica y la información de sus dependencias a través de varios portales en WordPress. Esos contenidos cambian todo el tiempo —datos de los programas, inscripciones, eventos, banners— y cada cambio necesita a alguien que lo lleve al sitio sin romper su diseño ni la imagen institucional.\n\nEl mantenimiento de estos portales fue una labor transversal, en paralelo con los demás desarrollos: atender las solicitudes de las dependencias y mantener al día, sobre todo, las páginas de los programas de pregrado y posgrado, que son la puerta de entrada de los aspirantes.",
    descripcion: "En el portal principal de la seccional se hicieron cambios de información e imágenes y se desarrollaron o ajustaron algunas pantallas, sobre todo en las páginas de los programas. Además, se gestionaron cuatro micrositios de dependencias que ya existían: son sitios independientes, cada uno en su propio subdominio y fuera del portal principal, en los que se atendieron cambios de información e imágenes. Todos están construidos en WordPress.",
    queSeHizo: [
      "Actualización de las páginas de los programas de pregrado y posgrado en santototunja.edu.co, donde se concentró la mayor parte del tiempo.",
      "Cambios de información solicitados por las dependencias en los distintos sitios.",
      "Reemplazo y ajuste de imágenes y banners.",
      "Desarrollo y ajuste de algunas pantallas y secciones del portal principal.",
      "Gestión de los micrositios de CILCE, Ciencias Básicas, Humanidades y Aseguramiento de la Calidad: sitios independientes del portal principal que ya existían, en los que se atendieron cambios de información e imágenes."
    ],
    identidad: { tema: "micrositios", color: "#009fe3", numero: "01", etiqueta: "Portales institucionales" },
    capas: [],
    teoria: { arquitectura: "", organizacion: "", flujoPeticion: "", autenticacion: "", manejoErrores: "", documentacionApi: "" },
    modulos: [{ nombre: "", responsabilidad: "", entidades: "", endpoints: "" }],
    modeloDatos: { motor: "", orm: "", migraciones: "", seeds: "", entidades: [{ nombre: "", campos: "", relaciones: "" }] },
    tecnologias: [
      { nombre: "WordPress", version: "", uso: "Gestor de contenidos de los cinco sitios", categoria: "herramienta", logo: "assets/img/tecnologias/wordpress.svg", destacada: true },
      { nombre: "Elementor", version: "", uso: "Constructor de páginas del portal principal, CILCE, Ciencias Básicas y Humanidades", categoria: "herramienta" },
      { nombre: "WPBakery", version: "", uso: "Constructor de páginas del sitio de Aseguramiento de la Calidad", categoria: "herramienta" },
      { nombre: "Slider Revolution", version: "", uso: "Carruseles de CILCE y Ciencias Básicas", categoria: "herramienta" },
      { nombre: "HTML", version: "", uso: "", categoria: "frontend", logo: "assets/img/tecnologias/html.svg", destacada: true },
      { nombre: "CSS", version: "", uso: "", categoria: "frontend", logo: "assets/img/tecnologias/css.svg", destacada: true }
    ],
    herramientas: { convencionCommits: "", estrategiaRamas: "", actions: [{ nombre: "", disparador: "", jobs: "", automatiza: "" }], otras: [""] },
    gestionAgil: { historiasUsuario: null, sprints: null },
    despliegue: { plataforma: "", evidencia: "", pm2: { proceso: "", script: "", modo: "", instancias: "", logs: "" }, servidorWeb: "", comandoBuild: "", comandoStart: "", variablesEntorno: [""], puerto: "", cors: "" },
    calidad: { pruebas: "", rendimiento: [""], accesibilidad: [""], seguridad: [""] },
    hitos: [{ fecha: "", descripcion: "" }],
    repositorios: [{ nombre: "", url: "", commits: null, primerCommit: "", ultimoCommit: "" }],
    urlProduccion: "",
    capturas: [{ src: "", alt: "", pie: "" }],
    pendientes: [""],
    extras: {
      textoFlotante: "Abrir los sitios en vivo",
      botonesSitios: 1,
      // Botones del héroe y menú del botón flotante.
      sitios: [
        { nombre: "Portal principal", url: "https://santototunja.edu.co/" },
        { nombre: "CILCE", url: "https://cilce.santototunja.edu.co/" },
        { nombre: "Ciencias Básicas", url: "https://cienciasbasicas.santototunja.edu.co/" },
        { nombre: "Humanidades", url: "https://humanidades.santototunja.edu.co/" },
        { nombre: "Gestión", url: "https://gestion.santototunja.edu.co/" }
      ],
      notaSitios: "En el portal principal se desarrolló y se gestionó el contenido. Los otros cuatro son micrositios independientes de dependencias, en sus propios subdominios, que ya existían y se gestionaron durante la pasantía.",
      // Capturas tomadas de los sitios en producción el 2 de octubre de 2026.
      sitiosDetalle: [
        { nombre: "Portal principal", corto: "santototunja.edu.co", dependencia: "Universidad Santo Tomás · Seccional Tunja", url: "https://santototunja.edu.co/", captura: "assets/img/micrositios/principal.webp", destacado: true, tipo: "Desarrollo y gestión",
          trabajo: "Donde se concentró la mayor parte del tiempo: actualización de las páginas de los programas de pregrado y posgrado —información, imágenes y ajustes de pantalla—, además de otros cambios de contenido del portal.",
          tecnologias: ["WordPress", "Elementor", "Tema Ohio"], extra: { captura: "assets/img/micrositios/programa.webp", pie: "Página de un programa de pregrado" } },
        { nombre: "CILCE", corto: "cilce.santototunja.edu.co", dependencia: "Centro Internacional de Lenguas y Culturas Extranjeras", url: "https://cilce.santototunja.edu.co/", captura: "assets/img/micrositios/cilce.webp",
          tipo: "Gestión", trabajo: "Sitio independiente del portal principal, en su propio subdominio. Se gestionó su contenido: cambios de información e imágenes solicitados por la dependencia.", tecnologias: ["WordPress", "Elementor", "Slider Revolution", "Tema Halpes"] },
        { nombre: "Ciencias Básicas", corto: "cienciasbasicas.santototunja.edu.co", dependencia: "Dirección de Ciencias Básicas", url: "https://cienciasbasicas.santototunja.edu.co/", captura: "assets/img/micrositios/cienciasbasicas.webp",
          tipo: "Gestión", trabajo: "Sitio independiente del portal principal, en su propio subdominio. Se gestionó su contenido: cambios de información e imágenes solicitados por la dependencia.", tecnologias: ["WordPress", "Elementor", "Slider Revolution", "Tema Halpes"] },
        { nombre: "Humanidades", corto: "humanidades.santototunja.edu.co", dependencia: "Departamento de Humanidades y Formación Integral", url: "https://humanidades.santototunja.edu.co/", captura: "assets/img/micrositios/humanidades.webp",
          tipo: "Gestión", trabajo: "Sitio independiente del portal principal, en su propio subdominio. Se gestionó su contenido: cambios de información e imágenes solicitados por la dependencia.", tecnologias: ["WordPress", "Elementor", "Tema Ohio"] },
        { nombre: "Gestión", corto: "gestion.santototunja.edu.co", dependencia: "Sistema Institucional de Aseguramiento de la Calidad", url: "https://gestion.santototunja.edu.co/", captura: "assets/img/micrositios/gestion.webp",
          tipo: "Gestión", trabajo: "Sitio independiente del portal principal, en su propio subdominio. Se gestionó su contenido: cambios de información e imágenes solicitados por la dependencia.", tecnologias: ["WordPress", "WPBakery", "Tema Ivy School"] }
      ],
      resumen: {
        declaracion: "Durante toda la pasantía, los portales de la seccional siguieron [[al día]]: información, imágenes y pantallas, con el mayor esfuerzo en [[las páginas de los programas]].",
        destacados: [
          { icono: "Programas", titulo: "Programas de pregrado y posgrado", texto: "La mayor parte del tiempo: mantener al día las páginas de los programas que ofrece la universidad.", ancho: 2 },
          { icono: "Archivo", titulo: "Información al día", texto: "Cambios de contenido solicitados por las dependencias." },
          { icono: "Paleta", titulo: "Imágenes y banners", texto: "Reemplazo y ajuste de imágenes en los distintos sitios." },
          { icono: "Capas", titulo: "Pantallas y secciones", texto: "Desarrollo y ajuste de algunas pantallas del portal principal con su constructor de páginas.", ancho: 2 },
          { icono: "Carpetas", titulo: "Cuatro micrositios gestionados", texto: "Sitios independientes, en sus propios subdominios: CILCE, Ciencias Básicas, Humanidades y Calidad." },
          { icono: "Periodos y horas", titulo: "Todo el periodo", texto: "Una labor transversal, del 1 de junio al 2 de octubre, en paralelo con los demás desarrollos.", ancho: 2 }
        ]
      },
      cifras: [
        { valor: 5, texto: "sitios en WordPress gestionados" },
        { valor: 20, sufijo: "+", texto: "programas académicos intervenidos" },
        { valor: 4, texto: "micrositios independientes gestionados" },
        { valor: 18, texto: "semanas de labor transversal" }
      ],
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
    periodo: { inicio: "2026-06-17", fin: "" },
    horasAproximadas: null,
    // POR CONFIRMAR: redactado a partir de las descripciones de los repositorios.
    proposito: "CAMINA Living Lab es el ecosistema de innovación abierta de la Universidad Santo Tomás – Seccional Tunja: conecta retos reales del territorio con soluciones co-creadas junto a empresas, sector público y comunidades. Para cumplir ese papel necesitaba un canal propio que invitara a las organizaciones a postular un reto o a sumarse como aliadas, y que mostrara qué retos se trabajan y en qué etapa de la metodología van.\n\nAdemás, el equipo del Living Lab necesitaba publicar y actualizar ese contenido por su cuenta —retos, aliados, servicios y noticias— y recibir en un solo lugar las solicitudes que llegan por los formularios, sin depender de un desarrollador para cada cambio.",
    descripcion: "Se construyó la plataforma web completa de CAMINA Living Lab: la cara pública del laboratorio y el panel con el que su equipo la administra.",
    queSeHizo: [
      "Landing pública con las secciones de inicio, nosotros, metodología, servicios, retos, noticias, aliados y contacto, más páginas propias de servicios y aliados.",
      "Galería de retos y página de detalle de cada reto, con su bitácora por etapa de la ruta CAMINA, galería de imágenes y la experiencia publicada.",
      "Panel administrativo para gestionar retos, tipos de reto, aliados, servicios, noticias y usuarios, con inicio de sesión y recuperación de contraseña por correo.",
      "Historial de las respuestas de los formularios de contacto, con exportación a Excel.",
      "Infraestructura propia: API REST, base de datos MariaDB y despliegue automático en el servidor de la universidad."
    ],
    identidad: { tema: "camina", color: "#2c56fc", numero: "02", etiqueta: "La plataforma", resumenTeja: "Retos reales con organizaciones del territorio." },
    // Tecnologías principales con logo en la sección Arquitectura (la versión se toma de tecnologias).
    stackPrincipal: [
      { nombre: "React", rol: "Landing pública y panel" },
      { nombre: "Vite", rol: "Compilación del frontend" },
      { nombre: "TypeScript", rol: "Tipado en frontend y backend" },
      { nombre: "NestJS", rol: "API REST por módulos" },
      { nombre: "TypeORM", rol: "Entidades y migraciones" },
      { nombre: "MariaDB", rol: "Base de datos" },
      { nombre: "Swagger", rol: "Documentación de la API" },
      { nombre: "GitHub Actions", rol: "Compilación automática" },
      { nombre: "cPanel", rol: "Alojamiento" },
      { nombre: "PM2", rol: "Proceso de la API" }
    ],
    // Diagramas de arquitectura (carrusel de la sección Arquitectura).
    diagramas: {
      contexto: {
        columnas: [
          { titulo: "Usuarios", nodos: [
            { nombre: "Visitante", detalle: "Consulta retos, servicios, noticias y aliados; postula un reto o se suma como aliado." },
            { nombre: "Administrador", detalle: "Gestiona el contenido y revisa los formularios.", etiquetas: ["SUPER_ADMIN", "EDITOR"] }
          ] },
          { titulo: "Cliente", nodos: [
            { nombre: "SPA camina-front", detalle: "Landing pública y panel /admin en una sola aplicación.", etiquetas: ["React", "Vite"], aloja: "cPanel · sitio estático" }
          ] },
          { titulo: "Servidor", nodos: [
            { nombre: "API camina-back", detalle: "API REST con documentación interactiva en /api/docs.", etiquetas: ["NestJS", "Swagger"], aloja: "cPanel · proceso PM2" }
          ] },
          { titulo: "Datos y servicios", nodos: [
            { nombre: "MariaDB", detalle: "Guarda el contenido y también las imágenes subidas.", etiquetas: ["TypeORM"] },
            { nombre: "Correo (SMTP)", detalle: "Envío del enlace de recuperación de contraseña.", etiquetas: ["Nodemailer"] }
          ] }
        ],
        conectores: ["Navegador · HTTPS", "REST · JSON · cookie de sesión httpOnly", "TypeORM · SMTP"],
        nota: "Frontend y backend son repositorios y despliegues independientes. La API solo acepta peticiones del dominio del frontend (CORS) y es la única pieza que accede a la base de datos."
      },
      peticion: {
        titulo: "Un administrador crea un reto desde el panel",
        pasos: [
          { capa: "cliente", nombre: "Panel administrativo", detalle: "El formulario envía POST /challenges con Axios; el navegador adjunta la cookie de sesión (withCredentials)." },
          { capa: "seguridad", nombre: "helmet y CORS", detalle: "Se añaden cabeceras de seguridad y solo se acepta el origen configurado en FRONTEND_URL." },
          { capa: "seguridad", nombre: "Límite de peticiones", detalle: "PerAccountThrottlerGuard: máximo 30 peticiones por minuto por cuenta." },
          { capa: "seguridad", nombre: "JwtGuard", detalle: "Lee el token de la cookie access_token y verifica su firma y vigencia; sin sesión válida responde 401." },
          { capa: "seguridad", nombre: "RolesGuard", detalle: "Solo SUPER_ADMIN o EDITOR pueden crear retos; cualquier otro rol recibe 403." },
          { capa: "aplicacion", nombre: "ValidationPipe", detalle: "Descarta los campos no declarados en el DTO y valida el resto; los errores se devuelven en español con código 400." },
          { capa: "aplicacion", nombre: "ChallengesController", detalle: "Recibe el DTO ya validado y delega en el servicio." },
          { capa: "aplicacion", nombre: "ChallengesService", detalle: "Verifica que existan el tipo de reto, los retadores y los aliados (404 si alguno falta) y construye la entidad." },
          { capa: "datos", nombre: "TypeORM → MariaDB", detalle: "Guarda el reto junto con sus relaciones." },
          { capa: "cliente", nombre: "Respuesta", detalle: "La API responde 201 con el reto en JSON y el panel muestra la confirmación." }
        ]
      },
      despliegue: {
        etapas: [
          { nombre: "Desarrollo", lugar: "feature/* → develop", items: ["Cada cambio vuelve a develop por pull request."] },
          { nombre: "Liberación", lugar: "develop → deploy", items: ["El merge a deploy dispara el workflow."] },
          { nombre: "Compilación", lugar: "GitHub Actions · build-cpanel.yml", items: ["pnpm install --frozen-lockfile", "Frontend: build de Vite", "Backend: nest build y pnpm prune --prod"] },
          { nombre: "Artefacto", lugar: "rama cpanel-dist", items: ["Solo el resultado compilado y el .cpanel.yml", "Se genera sola; nunca se edita a mano"] },
          { nombre: "Producción", lugar: "cPanel · Git Version Control", items: ["rsync al destino, preservando el .env", "Backend: migraciones contra la base real", "Backend: reinicio del proceso con PM2"] }
        ],
        nota: "Nada se compila ni se instala en el servidor: así se evitaron los timeouts de red hacia el registro de npm que bloqueaban el despliegue."
      }
    },
    teoria: {
      arquitectura: "",
      organizacion: "El backend tiene un módulo por dominio, cada uno con su controlador, servicio, DTOs y entidades; la configuración transversal (conexión, correo, Swagger y datos semilla) vive en src/config. El frontend separa las páginas públicas de las del panel, con un servicio HTTP por recurso, un contexto de autenticación y un layout para cada parte.",
      flujoPeticion: "",
      autenticacion: "",
      manejoErrores: "",
      documentacionApi: ""
    },
    modulos: [
      { nombre: "auth", responsabilidad: "Inicio y cierre de sesión, sesión actual y recuperación de contraseña por correo.", entidades: "PasswordResetToken", endpoints: "POST /auth/login · /logout · /forgot-password · /reset-password/:token · GET /auth/me" },
      { nombre: "user", responsabilidad: "Usuarios administradores del panel y cambio de contraseña.", entidades: "User", endpoints: "CRUD /user · PATCH /user/:id/change-password" },
      { nombre: "challenges", responsabilidad: "Retos: datos, bitácora por etapa, galería y experiencia publicada.", entidades: "Challenge, ChallengeStageContent, ChallengeGalleryImage", endpoints: "GET /challenges/published · /:id (públicos) · CRUD admin" },
      { nombre: "challenge-types", responsabilidad: "Ejes estratégicos o categorías de los retos.", entidades: "ChallengeType", endpoints: "GET públicos · CRUD admin" },
      { nombre: "partners", responsabilidad: "Aliados, diferenciados como retadores o colaboradores.", entidades: "Partner", endpoints: "GET públicos · CRUD admin" },
      { nombre: "services", responsabilidad: "Servicios que ofrece el Living Lab.", entidades: "Service", endpoints: "GET públicos · CRUD admin" },
      { nombre: "news", responsabilidad: "Noticias publicadas en la landing.", entidades: "News", endpoints: "GET públicos · CRUD admin" },
      { nombre: "submissions", responsabilidad: "Respuestas de los formularios de contacto, conteos y exportación a Excel.", entidades: "FormSubmission", endpoints: "POST /submissions (público) · GET · /counts · /download" },
      { nombre: "uploads", responsabilidad: "Subida y entrega de imágenes, guardadas en la base de datos.", entidades: "Upload", endpoints: "POST /uploads · GET /uploads/:id · DELETE" }
    ],
    modeloDatos: {
      motor: "MariaDB",
      orm: "TypeORM",
      migraciones: "7 migraciones versionadas; synchronize desactivado en producción",
      seeds: "Super administrador inicial desde variables de entorno",
      entidades: [
        { nombre: "Challenge", campos: "título, descripción, sector (público/privado), etapa CAMINA, resultado esperado, líder, facultades, imagen y video, publicado", relaciones: "N:1 ChallengeType · N:M Partner · 1:N ChallengeStageContent · 1:N ChallengeGalleryImage" },
        { nombre: "ChallengeStageContent", campos: "etapa, texto, imagen", relaciones: "N:1 Challenge" },
        { nombre: "ChallengeGalleryImage", campos: "imagen, orden", relaciones: "N:1 Challenge" },
        { nombre: "ChallengeType", campos: "nombre, activo", relaciones: "1:N Challenge" },
        { nombre: "Partner", campos: "nombre, razón social, tipo y número de documento, contacto, logo, sitio web, es retador, es aliado", relaciones: "N:M Challenge" },
        { nombre: "Service", campos: "nombre, descripción, imagen, activo", relaciones: "—" },
        { nombre: "News", campos: "título, categoría, fecha, imagen, enlace, publicada", relaciones: "—" },
        { nombre: "FormSubmission", campos: "tipo de formulario, datos (JSON), fecha", relaciones: "—" },
        { nombre: "Upload", campos: "nombre original, tipo MIME, contenido en base64", relaciones: "—" },
        { nombre: "User", campos: "nombre, correo, contraseña (bcrypt), rol, activo, último acceso", relaciones: "1:N PasswordResetToken" },
        { nombre: "PasswordResetToken", campos: "hash del token, expiración, usado", relaciones: "N:1 User" }
      ]
    },
    tecnologias: [
      { nombre: "React", version: "19.2", uso: "", categoria: "frontend" },
      { nombre: "Vite", version: "8", uso: "", categoria: "frontend" },
      { nombre: "TypeScript", version: "6.0", uso: "", categoria: "frontend" },
      { nombre: "React Router", version: "7", uso: "Rutas públicas y del panel", categoria: "frontend" },
      { nombre: "Axios", version: "1.18", uso: "Cliente HTTP con cookie de sesión", categoria: "frontend" },
      { nombre: "NestJS", version: "11", uso: "", categoria: "backend" },
      { nombre: "TypeORM", version: "1.0", uso: "", categoria: "backend" },
      { nombre: "Passport JWT", version: "4.0", uso: "Autenticación por cookie", categoria: "backend" },
      { nombre: "@nestjs/throttler", version: "6.5", uso: "Límite de peticiones", categoria: "backend" },
      { nombre: "helmet", version: "8.2", uso: "Cabeceras de seguridad", categoria: "backend" },
      { nombre: "bcrypt", version: "6.0", uso: "Hash de contraseñas", categoria: "backend" },
      { nombre: "class-validator", version: "0.15", uso: "Validación de DTOs", categoria: "backend" },
      { nombre: "Swagger", version: "12", uso: "Documentación de la API", categoria: "backend" },
      { nombre: "Nodemailer", version: "9", uso: "Correos de recuperación", categoria: "backend" },
      { nombre: "ExcelJS", version: "4.4", uso: "Exportación de formularios", categoria: "backend" },
      { nombre: "MariaDB", version: "", uso: "", categoria: "bd" },
      { nombre: "mysql2", version: "3.22", uso: "", categoria: "bd" },
      { nombre: "GitHub Actions", version: "", uso: "", categoria: "devops" },
      { nombre: "cPanel", version: "", uso: "", categoria: "devops" },
      { nombre: "PM2", version: "", uso: "", categoria: "devops" },
      { nombre: "Docker Compose", version: "", uso: "MariaDB y phpMyAdmin en local", categoria: "devops" },
      { nombre: "Jest", version: "30", uso: "Pruebas unitarias", categoria: "herramienta" },
      { nombre: "ESLint", version: "", uso: "", categoria: "herramienta" },
      { nombre: "Prettier", version: "3", uso: "", categoria: "herramienta" },
      { nombre: "pnpm", version: "", uso: "", categoria: "herramienta" }
    ],
    herramientas: {
      convencionCommits: "Conventional Commits (feat, fix, refactor, test, ci, docs, chore), con ámbito opcional: fix(uploads), test(challenges)…",
      estrategiaRamas: "",
      actions: [{ nombre: "", disparador: "", jobs: "", automatiza: "" }],
      otras: [""],
      // Commits reales de los dos repositorios (git log), del más reciente al más antiguo.
      ejemplosCommits: [
        { hash: "c38bf7b", fecha: "2026-10-01", mensaje: "docs: documentar flujo de ramas develop/deploy/cpanel-dist en el README" },
        { hash: "5dce8a5", fecha: "2026-09-24", mensaje: "feat: implement multi-image upload component and integrate into experience modal and challenge detail pages" },
        { hash: "c77251d", fecha: "2026-09-21", mensaje: "ci: agregar workflow para build en GitHub Actions y publicar dist/ en cpanel-dist" },
        { hash: "5e96387", fecha: "2026-09-21", mensaje: "chore: quitar workflow de deploy a GitHub Pages" },
        { hash: "92635e0b", fecha: "2026-07-09", mensaje: "fix(uploads): validate real file signature, not just declared mimetype" },
        { hash: "76256891", fecha: "2026-07-09", mensaje: "test(challenges): add ParseUUIDPipe, remove dead code, unit tests" },
        { hash: "3380c76a", fecha: "2026-06-17", mensaje: "refactor: update UserRole import paths and enhance role checks in guards and services" }
      ]
    },
    gestionAgil: { historiasUsuario: null, sprints: null },
    despliegue: {
      plataforma: "cPanel",
      evidencia: ".github/workflows/build-cpanel.yml · deploy/cpanel-deploy.sh · DEPLOY.md",
      servidor: "Servidor de la universidad",
      // Un destino por pieza desplegada (mapa del servidor en "Despliegue y versiones").
      destinos: [
        { capa: "Frontend", tecnologia: "React", nombre: "camina-front", ruta: "public_html/CaminaLivingLab/", servidor: "Apache · archivos estáticos" },
        { capa: "API", tecnologia: "NestJS", nombre: "camina-back", ruta: "/home/delegados/BackendLivingLab", proceso: "api-LivingLab", script: "main.js" }
      ],
      pm2: { proceso: "", script: "", modo: "", instancias: "", logs: "" },
      servidorWeb: "",
      comandoBuild: "",
      comandoStart: "",
      variablesEntorno: ["DB_HOST", "DB_PORT", "DB_USER", "DB_PASSWORD", "DB_NAME", "NODE_ENV", "PORT", "FRONTEND_URL", "JWT_SECRET", "MAIL_HOST", "MAIL_PORT", "MAIL_USER", "MAIL_PASS", "MAIL_FROM", "SEED_ADMIN_NAME", "SEED_ADMIN_EMAIL", "SEED_ADMIN_PASSWORD", "VITE_API_URL"],
      puerto: "",
      cors: ""
    },
    calidad: {
      pruebas: "9 suites de pruebas unitarias con Jest sobre los servicios (autenticación, tokens de recuperación, usuarios, retos, tipos de reto, aliados, servicios, noticias y subida de archivos), más una prueba de extremo a extremo.",
      rendimiento: [""],
      accesibilidad: [""],
      seguridad: [
        "Sesión del panel en una cookie httpOnly y sameSite=strict de 8 horas, inaccesible desde JavaScript.",
        "Contraseñas cifradas con bcrypt y permisos por endpoint según el rol.",
        "Máximo 5 intentos por hora en el inicio de sesión y en la recuperación de contraseña.",
        "Recuperación de contraseña con un token de un solo uso, guardado como hash y con vencimiento.",
        "Imágenes validadas por su firma real y no solo por el tipo declarado; los SVG se sanitizan."
      ]
    },
    hitos: [
      { fecha: "2026-06-17", descripcion: "Inicio del backend: primer commit y estructura de módulos." },
      { fecha: "2026-06-24", descripcion: "Primera versión pública de la landing: banner, nosotros y metodología, publicada en GitHub Pages." },
      { fecha: "2026-07-09", descripcion: "Pruebas unitarias de los servicios y endurecimiento de seguridad en la subida de archivos y los formularios." },
      { fecha: "2026-09-21", descripcion: "Migración a MariaDB, unificación de casos en retos, noticias y formularios; el frontend pasa de GitHub Pages a cPanel." },
      { fecha: "2026-09-22", descripcion: "Despliegue automático del backend en cPanel." },
      { fecha: "2026-09-24", descripcion: "Galería de imágenes de los retos y migraciones ejecutadas en el servidor durante el despliegue." },
      { fecha: "2026-10-01", descripcion: "Documentación del flujo de ramas y de la API en los dos repositorios." }
    ],
    repositorios: [
      { nombre: "CAMINA-Living-Lab-front", url: "https://github.com/Santoto-Web/CAMINA-Living-Lab-front", commits: 78, primerCommit: "2026-06-19", ultimoCommit: "2026-10-01" },
      { nombre: "CAMINA-Living-Lab-back", url: "https://github.com/Santoto-Web/CAMINA-Living-Lab-back", commits: 52, primerCommit: "2026-06-17", ultimoCommit: "2026-10-01" }
    ],
    urlProduccion: "https://livinglab.santototunja.edu.co/",
    capturas: [{ src: "", alt: "", pie: "" }],
    pendientes: [""],
    extras: {
      // La metodología CAMINA es un acróstico: cada letra abre una etapa.
      // Textos y colores tomados de camina-front/src/constants/caminaSteps.ts
      // (la misma fuente que usa el sitio para el estado real de cada reto).
      acrostico: {
        titulo: "La ruta CAMINA",
        rotulo: "Metodología",
        nombre: "La ruta CAMINA",
        nota: "La metodología del Living Lab es un acróstico: cada letra de CAMINA nombra una etapa por la que avanza un reto. La plataforma usa estas mismas seis etapas como estado real de cada reto en el panel, en las tarjetas y en la bitácora de su detalle.",
        cita: "«CAMINA no es solo una metodología. Es una manera de conectar conocimiento, acción y transformación territorial.»",
        pasos: [
          { letra: "C", titulo: "Co-creación", descripcion: "Escuchamos a los actores, comprendemos el problema y formulamos el reto.", color: "#E24B4A", colorTexto: "#ffffff" },
          { letra: "A", titulo: "Acción", descripcion: "Pasamos de la conversación al diseño de alternativas concretas.", color: "#EF9F27", colorTexto: "#ffffff" },
          { letra: "M", titulo: "Medición", descripcion: "Definimos resultados esperados, indicadores y evidencias.", color: "#F2D024", colorTexto: "#1f2937" },
          { letra: "I", titulo: "Iteración", descripcion: "Probamos, ajustamos y mejoramos las soluciones en contexto real.", color: "#7FBF5A", colorTexto: "#ffffff" },
          { letra: "N", titulo: "Narrativa", descripcion: "Sistematizamos aprendizajes, contamos historias de impacto y comunicamos resultados.", color: "#C060C7", colorTexto: "#ffffff" },
          { letra: "A", titulo: "Apropiación", descripcion: "Transferimos capacidades para que las soluciones puedan permanecer, escalar o inspirar.", color: "#4A9FE0", colorTexto: "#ffffff" }
        ]
      },
      relacionado: "rally-living-lab"
    }
  },

  {
    id: "rally-neotomasino",
    nombre: "Pasaporte Neotomasino",
    subtitulo: "Rally de bienvenida: los estudiantes nuevos recorren el campus, visitan las dependencias y sellan su pasaporte digital.",
    estado: "",
    solicitante: "",
    periodo: { inicio: "2026-07-14", fin: "2026-07-31" },
    horasAproximadas: null,
    proposito: "El rally de bienvenida lleva a los estudiantes nuevos —los neotomasinos— por las dependencias que van a usar durante su carrera para que las conozcan en persona. Hasta entonces, este tipo de eventos dependía de un uso masivo de papel: formatos de registro, pasaportes impresos y planillas para cada estación.\n\nEl Pasaporte Neotomasino se hizo para reemplazar ese papel por el celular, agilizar el registro de los neotomasinos —basta con el documento de identidad para tener el pasaporte listo— y hacer las actividades más interactivas: un mapa del campus, sellos que aparecen al validar cada estación y un dato curioso de cada dependencia.\n\nAl pasar a lo digital, la aplicación también debía garantizar que cada sello fuera legítimo: que un código compartido por WhatsApp no sirviera, que no se pudieran validar estaciones lejanas sin caminar y que el premio final se entregara una sola vez.",
    descripcion: "Se construyó una aplicación web en la que cada estudiante lleva su pasaporte en el celular, recorre las ocho estaciones del campus y sella cada una con un código que entrega el staff, junto con un panel para que el staff y los administradores operen el rally. El backend propio en NestJS reemplazó una primera versión construida sobre Supabase.",
    queSeHizo: [
      "Pasaporte digital: registro con el documento de identidad, sello animado por estación y el dato curioso de cada dependencia.",
      "Mapa interactivo del campus con las 8 estaciones repartidas en 3 edificios: Santo Domingo de Guzmán, Giordano Bruno y la Cancha.",
      "Sistema anti-fraude: códigos rotativos de 4 dígitos (HMAC-SHA256, rotan cada minuto y valen 5 minutos), tiempo mínimo de 5 minutos entre sellos y bloqueo de sellos duplicados.",
      "Premio de un solo uso: al completar las 8 estaciones se genera un código que el staff canjea una única vez.",
      "Panel de staff con los códigos vigentes de cada estación y la bitácora de sellos con hora exacta.",
      "Panel de administración de edificios, estaciones (con su posición en el mapa) y usuarios, con exportación a Excel de estudiantes y postulaciones.",
      "Formulario de postulación al equipo de imagen de la Dirección de Comunicaciones.",
      "API propia en NestJS y MariaDB con 10 módulos y 35 endpoints, documentada en Swagger y con colección de Postman.",
      "Aplicación instalable en el celular (manifest PWA), pensada para abrirse desde un código QR en el punto de partida."
    ],
    identidad: { tema: "neotomasino", color: "#f39200", numero: "03", etiqueta: "Rally de bienvenida", nombreCorto: "Rally Neotomasino" },
    stackPrincipal: [
      { nombre: "React", rol: "Pasaporte y panel de staff" },
      { nombre: "Vite", rol: "Compilación del frontend" },
      { nombre: "PWA", rol: "Instalable en el celular" },
      { nombre: "NestJS", rol: "API y lógica anti-fraude" },
      { nombre: "JWT", rol: "Sesiones de estudiante y de panel" },
      { nombre: "TypeORM", rol: "Acceso a datos" },
      { nombre: "MariaDB", rol: "Base de datos" },
      { nombre: "GitHub Actions", rol: "Compilación automática" },
      { nombre: "cPanel", rol: "Alojamiento" },
      { nombre: "PM2", rol: "Proceso de la API" }
    ],
    capas: [
      { rol: "Cliente", nombre: "React 18 + Vite 5", detalle: "Pasaporte y panel de staff" },
      { rol: "API REST", nombre: "NestJS 11", detalle: "rally-back · 35 endpoints" },
      { rol: "Datos", nombre: "MariaDB 11.4", detalle: "TypeORM · 7 entidades" }
    ],
    // Diagramas de arquitectura del rally original (commits b10d088 y 542fe2b).
    diagramas: {
      contexto: {
        columnas: [
          { titulo: "Usuarios", nodos: [
            { nombre: "Estudiante nuevo", detalle: "Se registra con su documento, recorre el campus y sella su pasaporte.", etiquetas: ["Sesión de 12 h"] },
            { nombre: "Staff de estación", detalle: "Muestra el código vigente y canjea los premios.", etiquetas: ["STAFF"] },
            { nombre: "Administrador", detalle: "Configura edificios, estaciones y cuentas; exporta resultados.", etiquetas: ["ADMIN"] }
          ] },
          { titulo: "Cliente", nodos: [
            { nombre: "SPA rally-neotomasino", detalle: "Pasaporte (/passport, /passport/map) y panel (/panel/*) en una sola aplicación.", etiquetas: ["React 18", "Vite 5", "React Router 7", "PWA"], aloja: "cPanel · enlace QR en el punto de partida" }
          ] },
          { titulo: "Servidor", nodos: [
            { nombre: "API rally-back", detalle: "10 módulos · 35 endpoints · Swagger en /docs. Genera y valida los códigos rotativos: el secreto nunca llega al navegador.", etiquetas: ["NestJS 11", "2 JWT por cookie", "Joi", "Throttler"], aloja: "cPanel · proceso PM2" }
          ] },
          { titulo: "Datos y servicios", nodos: [
            { nombre: "MariaDB 11.4", detalle: "7 entidades; índices únicos contra sellos y registros duplicados.", etiquetas: ["TypeORM", "Seed de estaciones"] },
            { nombre: "Correo (SMTP)", detalle: "Recuperación de contraseña del panel.", etiquetas: ["Nodemailer"] }
          ] }
        ],
        conectores: ["QR · navegador HTTPS", "REST · JSON · cookies httpOnly de estudiante y de panel", "TypeORM · SMTP"],
        nota: "La validación vive por completo en el servidor: el navegador nunca conoce el secreto con el que se generan los códigos, y no hay acceso directo a la base de datos desde el cliente."
      },
      peticion: {
        titulo: "Un estudiante sella una estación",
        pasos: [
          { capa: "cliente", nombre: "Pasaporte del estudiante", detalle: "Digita el código de 4 dígitos que le muestra el staff; se envía POST /stamps/validate con la cookie student_access_token." },
          { capa: "seguridad", nombre: "CORS", detalle: "Solo se aceptan peticiones de los orígenes configurados en FRONTEND_URL, con credenciales." },
          { capa: "seguridad", nombre: "StudentJwtGuard", detalle: "Verifica el JWT de estudiante y vuelve a consultar en la base que el estudiante exista; sin cookie válida responde 401." },
          { capa: "aplicacion", nombre: "Código rotativo (HMAC)", detalle: "Compara con los 5 códigos vigentes de la estación: rota cada minuto y cada uno sirve 5 minutos. Si no coincide: 400 «Código incorrecto o vencido»." },
          { capa: "aplicacion", nombre: "Tiempo mínimo entre sellos", detalle: "Si no han pasado 5 minutos desde el último sello del estudiante responde 429, para impedir validar estaciones lejanas sin caminar." },
          { capa: "datos", nombre: "Sello en MariaDB", detalle: "Se inserta el sello; el índice único (estudiante, estación) bloquea los duplicados con 409." },
          { capa: "aplicacion", nombre: "¿Completó el rally?", detalle: "Cuenta los sellos; al llegar a 8 genera el código de premio (HMAC sobre el documento) y lo guarda." },
          { capa: "cliente", nombre: "Sello en el pasaporte", detalle: "La respuesta trae el dato curioso de la estación, el avance (n de 8) y, si corresponde, el código de premio." }
        ]
      },
      despliegue: {
        etapas: [
          { nombre: "Desarrollo", lugar: "feature/* → develop", items: ["Cada cambio vuelve a develop por pull request."] },
          { nombre: "Liberación", lugar: "develop → deploy", items: ["El merge a deploy dispara el workflow."] },
          { nombre: "Compilación", lugar: "GitHub Actions · build-cpanel.yml", items: ["pnpm install --frozen-lockfile", "Frontend: build de Vite", "Backend: nest build y empaquetado con la carpeta storage/"] },
          { nombre: "Artefacto", lugar: "rama cpanel-dist", items: ["Solo el resultado compilado y el .cpanel.yml", "Se genera sola; nunca se edita a mano"] },
          { nombre: "Producción", lugar: "cPanel · Git Version Control", items: ["rsync al destino, preservando .env, node_modules y storage/", "Las tablas se sincronizan al arrancar la API", "pm2 restart del proceso del rally"] }
        ],
        nota: "Mismo esquema de despliegue que el resto de proyectos de la pasantía. A diferencia de CAMINA no hay migraciones —las tablas se sincronizan al arrancar— y la carpeta storage/, con el mapa y los íconos subidos desde el panel, se conserva entre despliegues."
      }
    },
    teoria: {
      arquitectura: "Arquitectura cliente-servidor con dos repositorios. El frontend es una SPA en React que reúne el pasaporte del estudiante y el panel de staff; el backend es una API REST en NestJS que concentra toda la lógica del rally —generación y validación de códigos, tiempos mínimos y premios— y es la única pieza que accede a MariaDB. El backend propio reemplazó una primera implementación sobre Supabase, conservando el mismo algoritmo de códigos para no invalidar los que el staff ya tenía.",
      organizacion: "El backend tiene un módulo por dominio (auth, user, students, stamps, stations, buildings, staff, admin, comm-recruit y uploads); la lógica criptográfica y utilitaria vive en src/lib (códigos HMAC, parseo de duraciones, detección de duplicados) y la configuración en src/config (conexión, validación de variables y seed). El frontend separa las páginas del pasaporte (src/pages/passport) de las del panel (src/pages/panel), con componentes propios como el mapa del campus, el camino de estaciones, el sello y el modal de validación.",
      flujoPeticion: "",
      autenticacion: "Dos sistemas JWT independientes, ambos en cookies httpOnly que el JavaScript del navegador no puede leer: uno para el panel (staff y administradores, 8 horas) y otro para los estudiantes (12 horas), con secretos distintos para no mezclar audiencias. El payload no lleva el rol ni datos personales, porque un JWT solo está firmado, no cifrado; el estado de la cuenta se vuelve a consultar en cada petición, de modo que una cuenta desactivada pierde acceso al instante. Los roles STAFF y ADMIN no tienen jerarquía: cada endpoint declara cuáles admite. El inicio de sesión del panel admite 5 intentos por hora por IP y correo, y la recuperación de contraseña usa un token de un solo uso guardado como hash, respondiendo siempre el mismo mensaje para no revelar qué correos existen.",
      manejoErrores: "Las variables de entorno se validan con Joi al arrancar: si falta una o tiene un formato inválido, la API no inicia y explica qué falta. Los datos de entrada pasan por un ValidationPipe con mensajes en español, y las violaciones de índices únicos de la base se traducen a 409 con un mensaje claro («Esta estación ya está sellada en tu pasaporte»). Cada regla del rally tiene su propio código HTTP: 400 por código vencido, 429 por tiempo mínimo y 409 por duplicado.",
      documentacionApi: "Swagger en /docs con el detalle de cada petición y respuesta, más una colección de Postman con los dos flujos de inicio de sesión (panel y estudiante)."
    },
    modulos: [
      { nombre: "students", responsabilidad: "Registro idempotente e inicio de sesión del estudiante con su documento; consulta de su pasaporte.", entidades: "Student", endpoints: "POST /students/register · /login · GET /students/me/passport" },
      { nombre: "stamps", responsabilidad: "Validación del código rotativo, del tiempo mínimo y de duplicados; registro del sello y del premio.", entidades: "Stamp", endpoints: "POST /stamps/validate" },
      { nombre: "stations", responsabilidad: "Estaciones del recorrido: dependencia, lugar, dato curioso, sello y posición en el mapa.", entidades: "Station", endpoints: "GET públicos · CRUD ADMIN" },
      { nombre: "buildings", responsabilidad: "Edificios del campus que agrupan las estaciones.", entidades: "Building", endpoints: "GET públicos · CRUD ADMIN" },
      { nombre: "staff", responsabilidad: "Códigos vigentes y bitácora para el staff; canje del premio de un solo uso.", entidades: "Stamp, Student", endpoints: "POST /staff/panel · /staff/redeem-claim" },
      { nombre: "admin", responsabilidad: "Exportación a Excel de estudiantes y de postulaciones.", entidades: "Student, CommRecruit", endpoints: "POST /admin/export/students · /comm-recruit" },
      { nombre: "comm-recruit", responsabilidad: "Postulación al equipo de imagen de Comunicaciones, con autorización de datos.", entidades: "CommRecruit", endpoints: "POST /comm-recruit" },
      { nombre: "auth", responsabilidad: "Inicio y cierre de sesión del panel y recuperación de contraseña por correo.", entidades: "PasswordResetToken", endpoints: "POST /auth/login · /logout · /forgot-password · /reset-password · GET /auth/me" },
      { nombre: "user", responsabilidad: "Cuentas de staff y administradores; cambio de la propia contraseña.", entidades: "User", endpoints: "CRUD /user · PATCH /user/me/change-password" },
      { nombre: "uploads", responsabilidad: "Subida del mapa del campus y de los iconos de estación, guardados en disco con límite de tamaño.", entidades: "—", endpoints: "POST /uploads/map · /uploads/icon" }
    ],
    modeloDatos: {
      motor: "MariaDB 11.4",
      orm: "TypeORM 1.1 (driver mysql2), con nombres en snake_case",
      migraciones: "Sin migraciones versionadas: synchronize activado",
      seeds: "3 edificios, 8 estaciones y la cuenta ADMIN inicial",
      entidades: [
        { nombre: "Student", campos: "nombre completo, documento (único), programa, código de premio, fecha de canje", relaciones: "1:N Stamp · 1:N CommRecruit" },
        { nombre: "Stamp", campos: "estudiante, estación, fecha y hora", relaciones: "N:1 Student · N:1 Station · índice único (estudiante, estación)" },
        { nombre: "Station", campos: "número, dependencia, lugar, dato curioso, icono, sello, color, posición en el mapa (x, y)", relaciones: "N:1 Building · 1:N Stamp" },
        { nombre: "Building", campos: "número, nombre, imagen", relaciones: "1:N Station" },
        { nombre: "CommRecruit", campos: "nombre, contacto, correo, intereses, autorización de datos", relaciones: "N:1 Student" },
        { nombre: "User", campos: "nombre, correo, contraseña (bcrypt), rol STAFF/ADMIN, activo, último acceso", relaciones: "1:N PasswordResetToken" },
        { nombre: "PasswordResetToken", campos: "hash del token, expiración, fecha de uso", relaciones: "N:1 User" }
      ]
    },
    tecnologias: [
      { nombre: "React", version: "18.3", uso: "", categoria: "frontend" },
      { nombre: "Vite", version: "5.4", uso: "", categoria: "frontend" },
      { nombre: "React Router", version: "7.18", uso: "", categoria: "frontend" },
      { nombre: "Poppins", version: "autoalojada", uso: "Tipografía de marca, sin depender de la red del evento", categoria: "frontend" },
      { nombre: "PWA", version: "manifest", uso: "Instalable en el celular", categoria: "frontend" },
      { nombre: "NestJS", version: "11", uso: "", categoria: "backend" },
      { nombre: "TypeORM", version: "1.1", uso: "", categoria: "backend" },
      { nombre: "Passport JWT", version: "4.0", uso: "Dos esquemas de sesión", categoria: "backend" },
      { nombre: "@nestjs/throttler", version: "6.5", uso: "Límite de intentos", categoria: "backend" },
      { nombre: "Joi", version: "18", uso: "Validación de variables de entorno", categoria: "backend" },
      { nombre: "bcrypt", version: "6.0", uso: "", categoria: "backend" },
      { nombre: "Nodemailer", version: "10", uso: "", categoria: "backend" },
      { nombre: "ExcelJS", version: "4.4", uso: "Exportación de resultados", categoria: "backend" },
      { nombre: "Swagger", version: "11.4", uso: "", categoria: "backend" },
      { nombre: "MariaDB", version: "11.4", uso: "", categoria: "bd" },
      { nombre: "mysql2", version: "3.23", uso: "", categoria: "bd" },
      { nombre: "GitHub Actions", version: "", uso: "", categoria: "devops" },
      { nombre: "cPanel", version: "", uso: "", categoria: "devops" },
      { nombre: "PM2", version: "", uso: "", categoria: "devops" },
      { nombre: "Docker Compose", version: "", uso: "Entorno local (MariaDB)", categoria: "devops" },
      { nombre: "Jest", version: "30", uso: "", categoria: "herramienta" },
      { nombre: "Postman", version: "", uso: "Colección de pruebas manuales", categoria: "herramienta" },
      { nombre: "pnpm", version: "", uso: "", categoria: "herramienta" }
    ],
    herramientas: {
      convencionCommits: "",
      estrategiaRamas: "Mismo esquema que el resto de proyectos: cada cambio nace en una rama de trabajo, se integra en develop y pasa a deploy para liberar; el workflow publica el resultado compilado en cpanel-dist, que cPanel despliega.",
      actions: [
        { nombre: "Build CPanel (frontend)", disparador: "push a deploy", jobs: "build", automatiza: "Compila la SPA con pnpm y publica el dist con su .cpanel.yml en cpanel-dist." },
        { nombre: "Build CPanel (backend)", disparador: "push a deploy", jobs: "build", automatiza: "Compila la API y la empaqueta con la carpeta storage/ en cpanel-dist; en el servidor se reinicia el proceso PM2." }
      ],
      otras: ["Swagger", "Postman", "Jest", "Docker Compose"]
    },
    gestionAgil: { historiasUsuario: null, sprints: null },
    despliegue: {
      plataforma: "cPanel",
      evidencia: ".github/workflows/build-cpanel.yml · deploy/cpanel-deploy.sh",
      servidor: "Servidor de la universidad",
      // POR CONFIRMAR: rutas de las carpetas en el servidor y nombre del proceso PM2.
      destinos: [
        { capa: "Frontend", tecnologia: "React", nombre: "rally-neotomasino", ruta: "", servidor: "Apache · archivos estáticos" },
        { capa: "API", tecnologia: "NestJS", nombre: "rally-back", ruta: "", proceso: "", script: "main.js" }
      ],
      pm2: { proceso: "", script: "main.js", modo: "", instancias: "", logs: "" },
      servidorWeb: "",
      comandoBuild: "pnpm build",
      comandoStart: "",
      variablesEntorno: ["NODE_ENV", "PORT", "FRONTEND_URL", "DB_HOST", "DB_PORT", "DB_NAME", "DB_USER", "DB_PASSWORD", "RALLY_SECRET", "COOLDOWN_MS", "JWT_SECRET", "JWT_EXPIRES_IN", "STUDENT_JWT_SECRET", "STUDENT_JWT_EXPIRES_IN", "INITIAL_ADMIN_NAME", "INITIAL_ADMIN_EMAIL", "INITIAL_ADMIN_PASSWORD", "RESET_TOKEN_EXPIRES_IN", "PANEL_RESET_PASSWORD_URL", "SMTP_HOST", "SMTP_PORT", "SMTP_SECURE", "SMTP_USER", "SMTP_PASSWORD", "SMTP_FROM", "VITE_API_URL"],
      puerto: "",
      cors: "Orígenes de FRONTEND_URL (admite varios, separados por coma) · con credenciales"
    },
    calidad: {
      pruebas: "Pruebas unitarias con Jest sobre el inicio de sesión del panel, los guardas de roles, la revocación inmediata de cuentas desactivadas, el registro de estudiantes, la validación de sellos (tiempo mínimo, código vencido, duplicados y premio), la gestión de cuentas y estaciones, y las utilidades de src/lib. Además, una prueba de extremo a extremo contra MariaDB real.",
      rendimiento: [
        "Tipografía autoalojada para no depender de la conexión del evento."
      ],
      accesibilidad: [""],
      seguridad: [
        "Códigos rotativos HMAC de 4 dígitos que vencen en 5 minutos: compartirlos por WhatsApp no sirve.",
        "Tiempo mínimo de 5 minutos entre sellos: impide validar estaciones lejanas sin caminar.",
        "Índice único (estudiante, estación): no se puede sellar dos veces la misma estación.",
        "Índice único de documento: no hay dos pasaportes para la misma persona.",
        "Premio de un solo uso, marcado como canjeado por el staff.",
        "Bitácora con hora exacta de cada sello para detectar recorridos imposibles.",
        "Sin acceso directo a la base desde el navegador: todo pasa por la API."
      ]
    },
    hitos: [
      { fecha: "2026-07-14", descripcion: "Inicio del desarrollo del pasaporte digital." },
      { fecha: "2026-07-29", descripcion: "" },
      { fecha: "2026-07-31", descripcion: "Cierre del periodo de desarrollo." },
      { fecha: "2026-09-22", descripcion: "Código publicado en la organización Santoto-Web, ya sobre el backend propio en NestJS y MariaDB." }
    ],
    repositorios: [
      // Repositorios compartidos con el Rally Living Lab: el rally original es el primer commit de cada uno.
      { nombre: "Rally_Tomasino_front", url: "https://github.com/Santoto-Web/Rally_Tomasino_front", commits: 1, primerCommit: "2026-09-22", ultimoCommit: "2026-09-22" },
      { nombre: "Rally_Tomasino_back", url: "https://github.com/Santoto-Web/Rally_Tomasino_back", commits: 1, primerCommit: "2026-09-22", ultimoCommit: "2026-09-22" }
    ],
    urlProduccion: "https://rallytomasinos.santototunja.edu.co/",
    capturas: [{ src: "", alt: "", pie: "" }],
    // Mejoras propuestas en el README del frontend original, en el orden sugerido.
    pendientes: [
      "Inicio de sesión con el correo institucional, para eliminar el registro con el documento de otra persona.",
      "Mapa real del campus con las ubicaciones exactas de las 8 estaciones.",
      "Service worker para tolerar zonas del campus sin señal y sincronizar los sellos al recuperar conexión.",
      "Panel de staff por estación, con una clave por encargado en lugar de una clave global."
    ],
    extras: {
      // Estaciones sembradas en el backend original (src/config/seed/seed.ts); sellos de public/sellos/.
      tituloSellos: "Las 8 estaciones del recorrido",
      notaSellos: "Cada estación es una dependencia de la universidad, con su lugar en el campus, su sello propio y un dato curioso que el estudiante descubre al sellar.",
      sellos: [
        { nombre: "Comunicaciones", detalle: "Emisora, 5.º piso · Santo Domingo de Guzmán", img: "assets/img/rally-neotomasino/sellos/comunicaciones.svg" },
        { nombre: "Admisiones y Marketing", detalle: "Terraza · Santo Domingo de Guzmán", img: "assets/img/rally-neotomasino/sellos/admin-marketing.svg" },
        { nombre: "Bienestar", detalle: "Hall del 1.er piso · Santo Domingo de Guzmán", img: "assets/img/rally-neotomasino/sellos/bienestar.svg" },
        { nombre: "CRAI", detalle: "5.º piso · Santo Domingo de Guzmán", img: "assets/img/rally-neotomasino/sellos/crai.svg" },
        { nombre: "Laboratorios", detalle: "Planta baja · Santo Domingo de Guzmán", img: "assets/img/rally-neotomasino/sellos/laboratorios.svg" },
        { nombre: "Proyección Social", detalle: "Pista atlética · Cancha", img: "assets/img/rally-neotomasino/sellos/proyeccion.svg" },
        { nombre: "Investigación e Innovación", detalle: "Hall sombrillas · Giordano Bruno", img: "assets/img/rally-neotomasino/sellos/investigacion.svg" },
        { nombre: "Promoción Estudiantil", detalle: "Entrada superior · Giordano Bruno", img: "assets/img/rally-neotomasino/sellos/promocion.svg" }
      ],
      relacionado: "rally-living-lab"
    }
  },

  {
    id: "rally-living-lab",
    nombre: "Rally Living Lab",
    subtitulo: "Festival Santoto Camina Living Lab: Mapa de soluciones",
    estado: "",
    solicitante: "",
    periodo: { inicio: "2026-09-22", fin: "2026-10-01" }, // fechas del primer y último commit de sus repositorios
    horasAproximadas: null,
    // POR CONFIRMAR: redactado a partir de los README de los repositorios.
    proposito: "El Rally Living Lab reutiliza la plataforma del Pasaporte Neotomasino para un evento distinto: dar a conocer CAMINA Living Lab y su metodología a la comunidad universitaria, con una versión gamificada y de un solo día del proceso que sigue un reto real.\n\nPartir del código del rally original permitió llegar al evento con una base ya probada —códigos rotativos, tiempos mínimos y panel de staff— y concentrar el trabajo en lo nuevo: los equipos, las etapas y el reto final.",
    descripcion: "Se adaptó el Pasaporte Neotomasino a un rally por equipos con la identidad y la metodología de CAMINA Living Lab.",
    queSeHizo: [
      "Registro de equipos con validación de la vinculación y el programa de cada integrante.",
      "Recorrido por etapas, con sellos por equipo y una frase que se arma al completarlas.",
      "Reto final con cuenta regresiva sincronizada con el servidor.",
      "Panel ampliado para gestionar etapas, estaciones, equipos e instructivo, y para consultar las soluciones.",
      "Identidad visual de CAMINA aplicada sobre la misma base de código."
    ],
    identidad: { tema: "livinglab", color: "#b5d334", numero: "04", etiqueta: "El festival", resumenTeja: "La ruta CAMINA jugada en un día, por equipos." },
    stackPrincipal: [
      { nombre: "React", rol: "Pasaporte de equipo, reto y panel" },
      { nombre: "Vite", rol: "Compilación del frontend" },
      { nombre: "PWA", rol: "Instalable en el celular" },
      { nombre: "NestJS", rol: "API, etapas y reto" },
      { nombre: "JWT", rol: "Sesiones de integrante y de panel" },
      { nombre: "TypeORM", rol: "Acceso a datos" },
      { nombre: "MariaDB", rol: "Base de datos" },
      { nombre: "GitHub Actions", rol: "Compilación automática" },
      { nombre: "cPanel", rol: "Alojamiento" },
      { nombre: "PM2", rol: "Proceso de la API" }
    ],
    diagramas: {
      contexto: {
        columnas: [
          { titulo: "Usuarios", nodos: [
            { nombre: "Equipo participante", detalle: "Estudiantes, docentes o personal administrativo que recorren las etapas y resuelven el reto.", etiquetas: ["Sesión por integrante"] },
            { nombre: "Staff de estación", detalle: "Muestra el código vigente de su estación.", etiquetas: ["STAFF"] },
            { nombre: "Administrador", detalle: "Configura etapas, estaciones, instructivo y equipos; consulta las soluciones.", etiquetas: ["ADMIN"] }
          ] },
          { titulo: "Cliente", nodos: [
            { nombre: "SPA del rally", detalle: "Instructivo CAMINA, pasaporte del equipo, mapa, reto y panel en una sola aplicación.", etiquetas: ["React", "PWA"], aloja: "cPanel · sitio estático" }
          ] },
          { titulo: "Servidor", nodos: [
            { nombre: "API rally-back", detalle: "Valida códigos, sella etapas y controla el tiempo del reto; documentación en /docs.", etiquetas: ["NestJS", "JWT"], aloja: "cPanel · proceso PM2" }
          ] },
          { titulo: "Datos y servicios", nodos: [
            { nombre: "MariaDB", detalle: "Guarda equipos, etapas, visitas, sellos y soluciones.", etiquetas: ["TypeORM"] },
            { nombre: "Correo (SMTP)", detalle: "Recuperación de contraseña del panel.", etiquetas: ["Nodemailer"] }
          ] }
        ],
        conectores: ["QR · navegador HTTPS", "REST · JSON · cookies httpOnly de integrante y de panel", "TypeORM · SMTP"],
        nota: "Misma arquitectura que el Rally Neotomasino: toda la validación vive en el servidor. Lo que cambia es el modelo: el sello ya no es de un estudiante en una estación, sino de un equipo en una etapa."
      },
      peticion: {
        titulo: "Un integrante valida la estación de una etapa",
        pasos: [
          { capa: "cliente", nombre: "Pasaporte del equipo", detalle: "El integrante digita el código de la estación; se envía POST /stamps/validate con su cookie de sesión." },
          { capa: "seguridad", nombre: "StudentJwtGuard", detalle: "Verifica la sesión del integrante y que pertenezca a un equipo; si no, 401 o 404." },
          { capa: "aplicacion", nombre: "Código rotativo (HMAC)", detalle: "Rota cada minuto y vale 2 minutos por defecto. Si no coincide: 400." },
          { capa: "aplicacion", nombre: "¿Etapa ya sellada?", detalle: "Si el equipo ya tiene el sello de esa etapa, responde 409." },
          { capa: "aplicacion", nombre: "Tiempo mínimo entre etapas", detalle: "Si el equipo validó otra etapa hace muy poco, responde 429 con el tiempo restante; dentro de una misma etapa no hay espera." },
          { capa: "datos", nombre: "Visita del integrante", detalle: "Se registra la visita; el índice único (integrante, estación) evita repetirla (409)." },
          { capa: "aplicacion", nombre: "Sello de la etapa", detalle: "Con una visita basta; si la etapa exige a todos, se sella cuando cada integrante tiene su visita. El sello es único por (equipo, etapa)." },
          { capa: "aplicacion", nombre: "¿Frase completa?", detalle: "Al sellar la última etapa se registra el inicio del reto del equipo." },
          { capa: "cliente", nombre: "Respuesta", detalle: "Trae el fragmento de la frase, el avance de los integrantes en la etapa y la hora del servidor, para que el contador no dependa del reloj del celular." }
        ]
      },
      despliegue: {
        etapas: [
          { nombre: "Desarrollo", lugar: "feature/* → rally/camina", items: ["rally/camina hace las veces de develop."] },
          { nombre: "Liberación", lugar: "rally/camina → deploy/camina", items: ["Por pull request; el push a deploy/camina dispara el workflow."] },
          { nombre: "Compilación", lugar: "GitHub Actions · build-cpanel.yml", items: ["pnpm install --frozen-lockfile", "Frontend: build de Vite con VITE_API_URL", "Backend: nest build con la carpeta storage/"] },
          { nombre: "Artefacto", lugar: "rama cpanel-dist/camina", items: ["Resultado compilado y .cpanel.yml", "Se genera sola; nunca se edita a mano"] },
          { nombre: "Producción", lugar: "cPanel · Git Version Control", items: ["Frontend: rsync al sitio público, servido por Apache", "Backend: rsync e instalación de dependencias de producción", "Backend: reinicio del proceso con PM2"] }
        ],
        nota: "El backend instala sus dependencias de producción en el servidor para que bcrypt compile de forma nativa allí; el .env vive solo en el servidor y no viaja en ningún build."
      }
    },
    teoria: {
      arquitectura: "",
      organizacion: "El backend suma cuatro módulos nuevos al rally original —teams, stages, challenge e instructivo— y la entidad StationVisit dentro de stamps; los tiempos y catálogos viven en src/lib (códigos, enfriamiento, reto y vinculaciones). En el frontend se agregan las vistas del instructivo, la frase, el reto y el registro de equipos, y las páginas del panel para etapas, equipos y soluciones.",
      flujoPeticion: "",
      autenticacion: "",
      manejoErrores: "",
      documentacionApi: ""
    },
    modulos: [
      { nombre: "teams", responsabilidad: "Registro de equipos con cupo único, catálogo de programas y unidades, y gestión desde el panel.", entidades: "Team, Student", endpoints: "POST /teams/register · GET /teams/catalog · CRUD admin" },
      { nombre: "stages", responsabilidad: "Las 6 etapas CAMINA: letra, color, sello, fragmento de la frase y regla de todos los integrantes; reordenables.", entidades: "Stage", endpoints: "GET /stages · CRUD admin · PATCH /stages/reorder" },
      { nombre: "stamps", responsabilidad: "Validación del código, visitas por integrante y sello de la etapa del equipo; arranque del reto.", entidades: "Stamp, StationVisit", endpoints: "POST /stamps/validate · DELETE (reinicio)" },
      { nombre: "challenge", responsabilidad: "Reto final: guardado de la solución dentro del tiempo y consulta de soluciones.", entidades: "Solution", endpoints: "PUT /challenge/solution · GET /challenge/solutions" },
      { nombre: "instructivo", responsabilidad: "Texto de presentación del rally, editable desde el panel.", entidades: "Instructivo", endpoints: "GET · PUT /instructivo" },
      { nombre: "stations", responsabilidad: "Estaciones del campus asociadas a una etapa, con posición en el mapa; reordenables.", entidades: "Station", endpoints: "GET públicos · CRUD admin · PATCH /stations/reorder" },
      { nombre: "buildings", responsabilidad: "Edificios que agrupan las estaciones.", entidades: "Building", endpoints: "GET públicos · CRUD admin" },
      { nombre: "students", responsabilidad: "Inicio de sesión del integrante y su pasaporte de equipo.", entidades: "Student", endpoints: "POST /students/login · GET /students/me/passport" },
      { nombre: "staff", responsabilidad: "Códigos vigentes y bitácora para el staff.", entidades: "—", endpoints: "POST /staff/panel" },
      { nombre: "admin", responsabilidad: "Exportación a Excel de participantes y postulaciones.", entidades: "Student, CommRecruit", endpoints: "POST /admin/export/*" },
      { nombre: "comm-recruit", responsabilidad: "Postulación al equipo de imagen de Comunicaciones.", entidades: "CommRecruit", endpoints: "POST /comm-recruit" },
      { nombre: "auth", responsabilidad: "Sesión del panel y recuperación de contraseña.", entidades: "PasswordResetToken", endpoints: "POST /auth/login · /logout · /forgot-password · /reset-password/:token · GET /auth/me" },
      { nombre: "user", responsabilidad: "Cuentas de staff y administradores.", entidades: "User", endpoints: "CRUD /user · PATCH /user/me/change-password" },
      { nombre: "uploads", responsabilidad: "Mapa del campus e iconos de estación, en la carpeta storage/.", entidades: "—", endpoints: "POST /uploads/map · /uploads/icon" }
    ],
    modeloDatos: {
      motor: "MariaDB",
      orm: "TypeORM",
      migraciones: "Sin migraciones versionadas: synchronize activado",
      seeds: "Las 6 etapas CAMINA (textos y colores de camina-front) y la cuenta ADMIN inicial; edificios y estaciones se cargan desde el panel",
      entidades: [
        { nombre: "Team", campos: "nombre, cupo (único, 1 a 10)", relaciones: "1:N Student · 1:N Stamp · 1:1 Solution" },
        { nombre: "Student", campos: "nombre, documento, vinculación (estudiante, docente o administrativo), nivel, programa o unidad", relaciones: "N:1 Team · 1:N StationVisit" },
        { nombre: "Stage", campos: "número, letra, nombre, descripción, color, sello, fragmento de la frase, exige a todos los integrantes", relaciones: "1:N Station · 1:N Stamp" },
        { nombre: "Station", campos: "número, nombre, lugar, icono, posición en el mapa", relaciones: "N:1 Stage · N:1 Building" },
        { nombre: "StationVisit", campos: "equipo, integrante, estación, etapa, fecha", relaciones: "índice único (integrante, estación)" },
        { nombre: "Stamp", campos: "equipo, etapa, fecha", relaciones: "índice único (equipo, etapa)" },
        { nombre: "Solution", campos: "inicio del reto, texto, guardado por, fecha", relaciones: "1:1 Team (índice único)" },
        { nombre: "Instructivo", campos: "título, introducción, cierre", relaciones: "—" },
        { nombre: "Building", campos: "número, nombre, imagen", relaciones: "1:N Station" },
        { nombre: "CommRecruit", campos: "nombre, contacto, correo, intereses, autorización de datos", relaciones: "N:1 Student" },
        { nombre: "User", campos: "nombre, correo, contraseña (bcrypt), rol STAFF/ADMIN, activo", relaciones: "1:N PasswordResetToken" },
        { nombre: "PasswordResetToken", campos: "hash del token, expiración, fecha de uso", relaciones: "N:1 User" }
      ]
    },
    tecnologias: [
      { nombre: "React", version: "18.3", uso: "", categoria: "frontend" },
      { nombre: "Vite", version: "5.4", uso: "", categoria: "frontend" },
      { nombre: "React Router", version: "7.18", uso: "", categoria: "frontend" },
      { nombre: "Nunito", version: "@fontsource 5.3", uso: "Tipografía de CAMINA", categoria: "frontend" },
      { nombre: "PWA", version: "manifest", uso: "Instalable en el celular", categoria: "frontend" },
      { nombre: "NestJS", version: "11", uso: "", categoria: "backend" },
      { nombre: "TypeORM", version: "1.1", uso: "", categoria: "backend" },
      { nombre: "Passport JWT", version: "4.0", uso: "Dos esquemas de sesión", categoria: "backend" },
      { nombre: "Joi", version: "18", uso: "Validación de variables de entorno", categoria: "backend" },
      { nombre: "ExcelJS", version: "4.4", uso: "Exportación de resultados", categoria: "backend" },
      { nombre: "Swagger", version: "", uso: "", categoria: "backend" },
      { nombre: "MariaDB", version: "", uso: "", categoria: "bd" },
      { nombre: "mysql2", version: "3.23", uso: "", categoria: "bd" },
      { nombre: "GitHub Actions", version: "", uso: "", categoria: "devops" },
      { nombre: "cPanel", version: "", uso: "", categoria: "devops" },
      { nombre: "PM2", version: "", uso: "", categoria: "devops" },
      { nombre: "Jest", version: "30", uso: "", categoria: "herramienta" },
      { nombre: "Postman", version: "", uso: "", categoria: "herramienta" },
      { nombre: "pnpm", version: "", uso: "", categoria: "herramienta" }
    ],
    herramientas: {
      convencionCommits: "",
      estrategiaRamas: "",
      actions: [{ nombre: "", disparador: "", jobs: "", automatiza: "" }],
      otras: [""]
    },
    gestionAgil: { historiasUsuario: null, sprints: null },
    despliegue: {
      plataforma: "cPanel",
      evidencia: ".github/workflows/build-cpanel.yml · deploy/cpanel-deploy.sh",
      servidor: "Servidor de la universidad",
      destinos: [
        { capa: "Frontend", tecnologia: "React", nombre: "Rally_Tomasino_front", ruta: "public_html/RallyLivingLab/", servidor: "Apache · archivos estáticos" },
        { capa: "API", tecnologia: "NestJS", nombre: "Rally_Tomasino_back", ruta: "/home/delegados/BackendRallyCamina", proceso: "api-rallyCamina", script: "main.js" }
      ],
      pm2: { proceso: "", script: "", modo: "", instancias: "", logs: "" },
      servidorWeb: "",
      comandoBuild: "",
      comandoStart: "",
      variablesEntorno: ["NODE_ENV", "PORT", "FRONTEND_URL", "DB_HOST", "DB_PORT", "DB_NAME", "DB_USER", "DB_PASSWORD", "RALLY_SECRET", "COOLDOWN_MS", "CODE_VALID_MINUTES", "CHALLENGE_PREP_MINUTES", "CHALLENGE_MINUTES", "JWT_SECRET", "JWT_EXPIRES_IN", "STUDENT_JWT_SECRET", "STUDENT_JWT_EXPIRES_IN", "INITIAL_ADMIN_NAME", "INITIAL_ADMIN_EMAIL", "INITIAL_ADMIN_PASSWORD", "RESET_TOKEN_EXPIRES_IN", "PANEL_RESET_PASSWORD_URL", "SMTP_HOST", "SMTP_PORT", "SMTP_SECURE", "SMTP_USER", "SMTP_PASSWORD", "SMTP_FROM", "VITE_API_URL"],
      puerto: "",
      cors: ""
    },
    calidad: {
      pruebas: "15 suites de pruebas unitarias con Jest —entre ellas las nuevas de equipos, etapas y validación de sellos por equipo— y una prueba de extremo a extremo contra MariaDB real.",
      rendimiento: [""],
      accesibilidad: [""],
      seguridad: [
        "Dos sesiones separadas en cookies httpOnly, una para el panel y otra para los integrantes, con secretos distintos.",
        "El integrante se identifica siempre por su sesión, nunca por los datos que envía.",
        "Cupo único por equipo, respetado aun ante registros simultáneos.",
        "Validación de la vinculación y el programa de cada integrante en el registro.",
        "El reto solo acepta soluciones dentro de su ventana de tiempo."
      ]
    },
    hitos: [
      { fecha: "2026-09-22", descripcion: "Publicación del código base del Rally Neotomasino en la organización Santoto-Web." },
      { fecha: "2026-09-23", descripcion: "Despliegue en cPanel: workflow de compilación, script de servidor y carpeta storage/." },
      { fecha: "2026-09-25", descripcion: "Registro de equipos con catálogos dinámicos y validación de la vinculación de los integrantes; tres contribuciones integradas por pull request." },
      { fecha: "2026-09-28", descripcion: "Ajustes del despliegue del backend, integrados por pull request." },
      { fecha: "2026-10-01", descripcion: "Documentación del vínculo temático con CAMINA Living Lab en los dos repositorios." }
    ],
    repositorios: [
      // Sin contar los commits automáticos del bot de despliegue.
      { nombre: "Rally_Tomasino_front", url: "https://github.com/Santoto-Web/Rally_Tomasino_front", commits: 10, primerCommit: "2026-09-22", ultimoCommit: "2026-10-01" },
      { nombre: "Rally_Tomasino_back", url: "https://github.com/Santoto-Web/Rally_Tomasino_back", commits: 9, primerCommit: "2026-09-22", ultimoCommit: "2026-10-01" }
    ],
    urlProduccion: "https://rallycamina.santototunja.edu.co/",
    capturas: [{ src: "", alt: "", pie: "" }],
    pendientes: [""],
    extras: {
      // Etapas sembradas en rally-back (src/config/seed/seed.ts), con los textos de camina-front;
      // sellos de la carpeta ELEMENTOS DIGITALES PARA RALLY.
      // Momentos de la dinámica, en orden (sección "Cómo se juega"). Tiempos por defecto de rally-back.
      dinamica: [
        { titulo: "Registro del equipo", detalle: "Cada equipo se inscribe con sus integrantes, que pueden ser estudiantes, docentes o personal administrativo.", datos: ["4 integrantes", "Hasta 10 equipos"] },
        { titulo: "Recorrido CAMINA", detalle: "Seis etapas, una por letra del acróstico. Cada una se sella como equipo en una o varias estaciones del campus.", datos: ["6 etapas", "5 min entre etapas"] },
        { titulo: "La frase", detalle: "Cada etapa sellada revela un fragmento; al completar las seis, el equipo arma una frase sobre una problemática a resolver.", datos: ["1 fragmento por etapa"] },
        { titulo: "El reto", detalle: "Con la frase completa empieza la cuenta regresiva: el equipo prepara y escribe su propuesta de solución.", datos: ["2 min de preparación", "10 min para la solución"] }
      ],
      tituloSellos: "Las 6 etapas",
      notaSellos: "Cada letra de CAMINA es una etapa, con su color y su sello.",
      sellos: [
        { nombre: "Co-creación", detalle: "Escuchamos a los actores, comprendemos el problema y formulamos el reto.", img: "assets/img/rally-living-lab/sellos/co-creacion.svg" },
        { nombre: "Acción", detalle: "Pasamos de la conversación al diseño de alternativas concretas.", img: "assets/img/rally-living-lab/sellos/accion.svg" },
        { nombre: "Medición", detalle: "Definimos resultados esperados, indicadores y evidencias.", img: "assets/img/rally-living-lab/sellos/medicion.svg" },
        { nombre: "Iteración", detalle: "Probamos, ajustamos y mejoramos las soluciones en contexto real.", img: "assets/img/rally-living-lab/sellos/iteracion.svg" },
        { nombre: "Narrativa", detalle: "Sistematizamos aprendizajes, contamos historias de impacto y comunicamos resultados.", img: "assets/img/rally-living-lab/sellos/narrativa.svg" },
        { nombre: "Apropiación", detalle: "Transferimos capacidades para que las soluciones puedan permanecer, escalar o inspirar.", img: "assets/img/rally-living-lab/sellos/apropiacion.svg" }
      ],
      comparativa: "rally-neotomasino",
      relacionado: "camina"
    }
  },

  {
    id: "reservalab",
    nombre: "ReservaLab",
    subtitulo: "Reserva y gestión de laboratorios: un calendario, un formulario con firma digital y una bitácora en lugar de tres procesos manuales.",
    estado: "En producción",
    solicitante: "",
    periodo: { inicio: "2026-07-03", fin: "2026-10-01" }, // fechas del primer y último commit de sus repositorios
    horasAproximadas: null,
    proposito: "La seccional gestionaba el uso de sus laboratorios con tres procesos independientes y en su mayoría manuales: un calendario web donde se consultaba la disponibilidad, el formato EA-TU-F-020 «Programación de espacios y prácticas», diligenciado cada semana en Excel y firmado en papel, y una hoja de cálculo por laboratorio para registrar el uso real. Al no estar integrados, la información se duplicaba, era difícil saber quién había aprobado cada reserva y no había estadísticas confiables sobre qué programas usaban los laboratorios.\n\nReservaLab reemplaza esos tres procesos por un solo circuito digital: se consulta la disponibilidad, se diligencia la solicitud, se firma según el rol del solicitante, se registra el uso real y los datos quedan listos para Power BI.",
    descripcion: "Fue el proyecto de mayor alcance y tiempo de la pasantía. Se planificó con Scrum a partir de un levantamiento de requerimientos propio —18 requerimientos funcionales, 10 no funcionales y 7 reglas de negocio— y un backlog de 31 historias de usuario en 9 sprints. El resultado es una SPA en Angular con inicio de sesión institucional y una API en NestJS de 17 módulos.",
    queSeHizo: [
      "Calendario unificado por laboratorio con las clases, las reservas aprobadas y las solicitudes pendientes.",
      "Importación y edición de los horarios académicos, que bloquean automáticamente esos espacios.",
      "Formulario digital equivalente al EA-TU-F-020, con validación de cruces de horario y de aforo antes de crear la solicitud.",
      "Flujo de firma digital según el rol: estudiante → docente → laboratorista, o docente → laboratorista.",
      "Notificaciones por correo en cada cambio de estado, enviadas desde una cola que se procesa cada 30 segundos.",
      "Bitácora del uso real de cada práctica y aviso diario de las reservas vencidas sin bitácora.",
      "Exportación a Excel con el formato ASISTENCIAS_EN_LABS para alimentar Power BI.",
      "Estadísticas por laboratorio y comparativo entre laboratorios.",
      "Servicios tecnológicos con cotización y programación de equipos, y eventos especiales.",
      "Catálogos de divisiones, facultades, espacios y periodos académicos; gestión de laboratorios, usuarios y roles.",
      "Inicio de sesión con la cuenta institucional de Microsoft (Entra ID) y versión móvil de todas las pantallas.",
      "Despliegue en cPanel con GitHub Actions e integración continua con pruebas en cada pull request."
    ],
    identidad: { tema: "reservalab", color: "#004f9f", numero: "05", etiqueta: "Reservas", nombreAnterior: "SigueLab · SIGELAB" },
    capas: [
      { rol: "Cliente", nombre: "Angular 21", detalle: "SPA con MSAL · siguelab-front", logos: ["assets/img/tecnologias/angular.svg", "assets/img/tecnologias/typescript.svg"] },
      { rol: "API REST", nombre: "NestJS 11", detalle: "17 módulos · 146 endpoints", logos: ["assets/img/tecnologias/nestjs.svg", "assets/img/tecnologias/typeorm.svg"] },
      { rol: "Datos", nombre: "MariaDB 11", detalle: "TypeORM · 24 entidades", logos: ["assets/img/tecnologias/mariadb.svg"] },
      { rol: "Identidad", nombre: "Microsoft Entra ID", detalle: "Cuenta institucional · Graph", logos: ["assets/img/tecnologias/microsoft.svg"] }
    ],
    teoria: {
      arquitectura: "Arquitectura cliente-servidor. El frontend es una SPA en Angular que inicia sesión con Microsoft mediante MSAL; el backend es una API REST en NestJS que funciona solo como servidor de recursos: valida en cada petición el token emitido por Microsoft Entra ID para la aplicación y no maneja contraseñas propias. Los datos viven en MariaDB a través de TypeORM, y las notificaciones se envían desde una cola guardada en la propia base de datos.",
      organizacion: "El backend se divide en 17 módulos de dominio: autenticación, usuarios, roles y directorio; catálogos (divisiones, facultades, espacios, periodos y tipos de reserva); laboratorios y su disponibilidad; horarios académicos; solicitudes; bitácora; notificaciones y correo; estadísticas y reportes; servicios, servicios tecnológicos, equipos y eventos de laboratorio. El frontend separa cada funcionalidad en features —calendario, solicitudes, aprobaciones, bitácora, catálogos, estadísticas, horarios, laboratorios, equipos y eventos— con sus servicios de datos, modelos y páginas.",
      flujoPeticion: "Cuando un estudiante reserva un laboratorio, la SPA envía la solicitud con el token de Microsoft. La API valida la firma, el emisor y la audiencia del token y el rol del usuario; luego comprueba que el horario no choque con una clase ni con otra reserva y que haya aforo. Si todo está bien, crea la solicitud en estado «pendiente del docente», registra el evento en su historial y deja en cola los correos: la confirmación al estudiante y el aviso al docente. Un proceso que corre cada 30 segundos toma esa cola y envía los correos sin hacer esperar al usuario.",
      autenticacion: "Microsoft Entra ID es la única fuente de identidad: solo entran cuentas del tenant de la universidad. El frontend obtiene el token con MSAL y sincroniza el cargo y la facultad del usuario a través de Microsoft Graph. Cada usuario tiene un rol —estudiante, docente, laboratorista o administrador— que decide qué pantallas ve y qué rutas de la API puede usar.",
      manejoErrores: "Validación de los datos de entrada con DTOs y class-validator, cabeceras de seguridad con helmet y límite de peticiones con throttler. Los errores de negocio —cruces de horario, aforo superado, firmas fuera de turno— se devuelven con mensajes claros, y cada cambio de estado queda registrado en el historial de la solicitud para auditoría.",
      documentacionApi: "Swagger con los endpoints agrupados por módulo."
    },
    modulos: [
      { nombre: "auth · usuarios · roles · directorio", responsabilidad: "Sesión con Entra ID, usuarios, roles y sincronización con el directorio institucional.", entidades: "Usuario, Rol", endpoints: "12 endpoints" },
      { nombre: "catalogos", responsabilidad: "Divisiones, facultades, espacios académicos, periodos y tipos de reserva.", entidades: "Division, Facultad, EspacioAcademico, PeriodoAcademico, TipoReserva", endpoints: "29 endpoints" },
      { nombre: "laboratorios", responsabilidad: "Laboratorios, sus espacios, laboratoristas y docentes, y la consulta de disponibilidad.", entidades: "Laboratorio, EspacioLaboratorio, LaboratoristaLaboratorio, DocenteLaboratorio", endpoints: "18 endpoints" },
      { nombre: "horarios-academicos", responsabilidad: "Horarios de clase que bloquean el calendario, con importación y edición.", entidades: "HorarioAcademico", endpoints: "4 endpoints" },
      { nombre: "solicitudes", responsabilidad: "Reservas, firmas por rol, cancelación, lotes de eventos especiales e historial.", entidades: "SolicitudReserva, Firma, SolicitudEvento", endpoints: "24 endpoints" },
      { nombre: "bitacora", responsabilidad: "Registro del uso real de cada práctica.", entidades: "RegistroUso", endpoints: "9 endpoints" },
      { nombre: "notificaciones · mail", responsabilidad: "Cola de correos (outbox) y avisos dentro de la aplicación.", entidades: "Notificacion", endpoints: "2 endpoints" },
      { nombre: "estadisticas · reportes", responsabilidad: "Estadísticas por laboratorio y Excel ASISTENCIAS_EN_LABS para Power BI.", entidades: "—", endpoints: "5 endpoints" },
      { nombre: "servicios · servicios-tecnologicos", responsabilidad: "Servicios de cada laboratorio y su solicitud con cotización y programación.", entidades: "Servicio, ServicioTecnologico, CotizacionServicio, CotizacionEquipo", endpoints: "26 endpoints" },
      { nombre: "equipos · eventos-laboratorio", responsabilidad: "Equipos de laboratorio y eventos especiales con sus equipos.", entidades: "Equipo, EventoLaboratorio, EventoEquipo", endpoints: "17 endpoints" }
    ],
    modeloDatos: {
      motor: "MariaDB 11",
      orm: "TypeORM 1.0 (driver mysql2)",
      migraciones: "",
      seeds: "Administrador inicial, roles, catálogos académicos, laboratorios y tipos de reserva",
      entidades: [
        { nombre: "Usuario", campos: "nombre, correo, oid de Entra, cargo, facultad, fecha de registro", relaciones: "N:1 Rol" },
        { nombre: "SolicitudReserva", campos: "laboratorio, fecha, horas, práctica, personas, grupos, semana, reactivos, equipos e insumos, materiales del estudiante, estado, motivo de cancelación", relaciones: "N:1 Usuario (solicitante, docente, laboratorista) · N:1 Laboratorio · 1:N Firma · 1:N SolicitudEvento" },
        { nombre: "Firma", campos: "orden, rol del firmante, resultado, observación, fecha y hora", relaciones: "N:1 SolicitudReserva · N:1 Usuario" },
        { nombre: "SolicitudEvento", campos: "tipo de evento, actor, detalle, fecha", relaciones: "N:1 SolicitudReserva" },
        { nombre: "RegistroUso", campos: "fecha, hora real de inicio y fin, asistentes, tipo de uso, observaciones", relaciones: "N:1 SolicitudReserva · N:1 Laboratorio · N:1 Usuario (laboratorista)" },
        { nombre: "Laboratorio", campos: "nombre, capacidad, ubicación, estado", relaciones: "1:N Equipo · 1:N Servicio · N:M EspacioAcademico" },
        { nombre: "HorarioAcademico", campos: "código, día, hora de inicio y fin, estado", relaciones: "N:1 Laboratorio · N:1 EspacioAcademico · N:1 Usuario (docente y laboratorista) · N:1 PeriodoAcademico" },
        { nombre: "PeriodoAcademico", campos: "nombre, fechas de inicio y fin, número de semanas", relaciones: "—" },
        { nombre: "Division · Facultad", campos: "nombre, nivel de la facultad", relaciones: "Division 1:N Facultad" },
        { nombre: "TipoReserva", campos: "nombre, es exclusiva, requiere espacio académico", relaciones: "—" },
        { nombre: "Notificacion", campos: "tipo de evento, asunto, cuerpo, intentos, estado, fecha de envío", relaciones: "N:1 Usuario · N:1 SolicitudReserva / ServicioTecnologico / EventoLaboratorio" },
        { nombre: "ServicioTecnologico · Cotizaciones", campos: "descripción, estado (de solicitado a entregado), margen, total, programación de equipos", relaciones: "N:1 Servicio · N:1 Laboratorio · 1:N CotizacionEquipo" },
        { nombre: "EventoLaboratorio · Equipo", campos: "responsable, dependencia, fecha, horas, asistentes, modalidad, estado", relaciones: "N:1 Laboratorio · N:M Equipo" }
      ]
    },
    tecnologias: [
      { nombre: "Angular", version: "21.2", uso: "SPA", categoria: "frontend", logo: "assets/img/tecnologias/angular.svg", destacada: true },
      { nombre: "TypeScript", version: "", uso: "", categoria: "frontend", logo: "assets/img/tecnologias/typescript.svg" },
      { nombre: "MSAL Angular", version: "6", uso: "Inicio de sesión con Microsoft", categoria: "frontend", logo: "assets/img/tecnologias/microsoft.svg" },
      { nombre: "Chart.js", version: "4.5", uso: "Estadísticas", categoria: "frontend" },
      { nombre: "ExcelJS · SheetJS", version: "", uso: "Lectura y generación de Excel", categoria: "frontend", logo: "assets/img/tecnologias/excel.svg" },
      { nombre: "Lordicon", version: "", uso: "Iconos animados", categoria: "frontend" },
      { nombre: "NestJS", version: "11", uso: "", categoria: "backend", logo: "assets/img/tecnologias/nestjs.svg", destacada: true },
      { nombre: "TypeORM", version: "1.0", uso: "", categoria: "backend", logo: "assets/img/tecnologias/typeorm.svg" },
      { nombre: "Passport JWT · jwks-rsa", version: "", uso: "Validación de tokens de Entra ID", categoria: "backend", logo: "assets/img/tecnologias/passport.svg" },
      { nombre: "Microsoft Entra ID", version: "", uso: "Identidad institucional", categoria: "backend", logo: "assets/img/tecnologias/microsoft.svg", destacada: true },
      { nombre: "@nestjs/schedule", version: "12", uso: "Cola de correos y avisos diarios", categoria: "backend" },
      { nombre: "Nodemailer", version: "9", uso: "Notificaciones por correo", categoria: "backend" },
      { nombre: "Swagger", version: "11", uso: "Documentación de la API", categoria: "backend" },
      { nombre: "MariaDB", version: "11", uso: "", categoria: "bd", logo: "assets/img/tecnologias/mariadb.svg", destacada: true },
      { nombre: "mysql2", version: "3.22", uso: "", categoria: "bd", logo: "assets/img/tecnologias/mysql.svg" },
      { nombre: "GitHub Actions", version: "", uso: "CI y despliegue", categoria: "devops", logo: "assets/img/tecnologias/githubactions.svg", destacada: true },
      { nombre: "cPanel", version: "", uso: "", categoria: "devops", logo: "assets/img/tecnologias/cpanel.svg" },
      { nombre: "PM2", version: "", uso: "", categoria: "devops", logo: "assets/img/tecnologias/pm2.svg" },
      { nombre: "Docker Compose", version: "", uso: "MariaDB en desarrollo", categoria: "devops", logo: "assets/img/tecnologias/docker.svg" },
      { nombre: "Jest", version: "", uso: "Pruebas unitarias y de extremo a extremo", categoria: "herramienta", logo: "assets/img/tecnologias/jest.svg" },
      { nombre: "ESLint", version: "", uso: "", categoria: "herramienta", logo: "assets/img/tecnologias/eslint.svg" },
      { nombre: "pnpm", version: "", uso: "", categoria: "herramienta", logo: "assets/img/tecnologias/pnpm.svg" }
    ],
    herramientas: {
      convencionCommits: "Conventional Commits en la mayoría de cambios (feat, fix, test, chore), con ámbito opcional: feat(historial), test(e2e)…",
      estrategiaRamas: "Cada funcionalidad se desarrolló en su rama —feature/*, kendo/* o wldy/*— y se integró por pull request: más de veinte en el backend (del #125 al #144) y once en el frontend. develop concentra lo terminado y main lo estable; la rama deploy dispara la compilación y su resultado se publica en cpanel-dist, que cPanel despliega.",
      actions: [
        { nombre: "CI (backend)", disparador: "pull request a main", jobs: "lint · pruebas unitarias · e2e", automatiza: "Instala dependencias y corre el linter, las pruebas unitarias y las de extremo a extremo antes de integrar." },
        { nombre: "Build CPanel (backend)", disparador: "push a deploy", jobs: "build", automatiza: "Compila la API y la publica en cpanel-dist; en el servidor se reinicia api-reservalab con PM2." },
        { nombre: "Build CPanel (frontend)", disparador: "push a deploy", jobs: "build", automatiza: "Compila la SPA y la publica en cpanel-dist; cPanel la copia a public_html/ReservaLabSantoto/browser/." }
      ],
      otras: ["Swagger", "Docker Compose", "ESLint", "Prettier"]
    },
    gestionAgil: { historiasUsuario: 31, sprints: 9 },
    despliegue: {
      plataforma: "cPanel",
      evidencia: ".github/workflows/build-cpanel.yml · .github/workflows/ci.yml · deploy/cpanel-deploy.sh",
      pm2: { proceso: "api-reservalab", script: "main.js", modo: "", instancias: "", logs: "" },
      servidorWeb: "Frontend: public_html/ReservaLabSantoto/browser/ · API: /home/delegados/BackendLaboratorios/",
      comandoBuild: "pnpm build",
      comandoStart: "pm2 restart api-reservalab --update-env",
      variablesEntorno: ["PORT", "DB_HOST", "DB_PORT", "DB_USER", "DB_PASSWORD", "DB_NAME", "FRONTEND_URL", "TENANT_ID", "API_CLIENT_ID", "API_APPLICATION_ID_URI", "SEED_ADMIN_NAME", "SEED_ADMIN_EMAIL", "AFORO_MODO", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"],
      puerto: "", cors: "Solo FRONTEND_URL"
    },
    calidad: {
      pruebas: "Pruebas unitarias con Jest sobre los servicios principales y pruebas de extremo a extremo del flujo de reserva, firmas, eventos especiales y gestión de usuarios. Se ejecutan en GitHub Actions en cada pull request a main, junto con el linter.",
      rendimiento: [
        "Paginación en el servidor para usuarios, historial de solicitudes y bitácora: nunca se trae la tabla completa.",
        "Los correos se envían desde una cola en la base de datos, así que guardar una solicitud no espera al servidor de correo."
      ],
      accesibilidad: ["Versión móvil de todas las pantallas."],
      seguridad: [
        "Solo cuentas de la universidad: los tokens deben venir del tenant institucional y para esta aplicación.",
        "Cada ruta exige su rol: estudiante, docente, laboratorista o administrador.",
        "Cada firma registra quién firmó, con qué rol, cuándo y con qué resultado.",
        "Historial de eventos de cada solicitud para auditoría.",
        "Cabeceras de seguridad con helmet y límite de peticiones."
      ]
    },
    hitos: [
      { fecha: "2026-07-03", descripcion: "Primer commit del backend en NestJS." },
      { fecha: "2026-07-10", descripcion: "Inicio del frontend y entorno con Docker." },
      { fecha: "2026-07-12", descripcion: "Módulo completo de usuarios, roles y autenticación." },
      { fecha: "2026-07-16", descripcion: "Catálogos académicos y módulo de solicitudes." },
      { fecha: "2026-07-17", descripcion: "Corrección de falsos cruces de horario en la disponibilidad." },
      { fecha: "2026-07-23", descripcion: "Horarios académicos, reserva directa del administrador y control de aforo en el calendario." },
      { fecha: "2026-07-29", descripcion: "Bitácora de uso y Excel para Power BI." },
      { fecha: "2026-07-30", descripcion: "Paginación en el servidor, trazabilidad y recorrido completo de firmas." },
      { fecha: "2026-08-03", descripcion: "Versión móvil de todas las pantallas y permisos de agendamiento del laboratorista." },
      { fecha: "2026-08-12", descripcion: "Inicio de sesión con Microsoft Entra ID y sincronización del directorio." },
      { fecha: "2026-09-14", descripcion: "Notificaciones asíncronas, integración continua y laboratorio de fabricación digital." },
      { fecha: "2026-09-28", descripcion: "Cambio de nombre a ReservaLab y despliegue en cPanel." },
      { fecha: "2026-09-29", descripcion: "Estadísticas por laboratorio y comparativo." },
      { fecha: "2026-10-01", descripcion: "Eventos especiales en lote e historial de solicitudes archivadas." }
    ],
    repositorios: [
      { nombre: "siguelab-front", url: "https://github.com/WldySandoval1/siguelab-front", commits: 48, primerCommit: "2026-07-10", ultimoCommit: "2026-10-01" },
      { nombre: "siguelab-back", url: "https://github.com/KendoTMJJ/siguelab-back", commits: 55, primerCommit: "2026-07-03", ultimoCommit: "2026-10-01" }
    ],
    urlProduccion: "https://reservalab.santototunja.edu.co/",
    capturas: [{ src: "", alt: "", pie: "" }],
    pendientes: [""],
    extras: {
      textoFlotante: "Abrir ReservaLab en vivo",
      resumen: {
        declaracion: "Un calendario en la web, un formato en Excel firmado a mano y una hoja de asistencias se volvieron [[una sola plataforma]]: se reserva, se firma y se registra el uso [[en el mismo lugar]].",
        destacados: [
          { icono: "Calendario", titulo: "Calendario unificado", texto: "Clases, reservas aprobadas y solicitudes pendientes de cada laboratorio en una sola vista.", ancho: 2 },
          { icono: "Archivo", titulo: "EA-TU-F-020 digital", texto: "El formato de programación de prácticas, con validación de cruces y aforo." },
          { icono: "Escudo", titulo: "Firma según el rol", texto: "Estudiante → docente → laboratorista; docente → laboratorista." },
          { icono: "Bitácora de uso", titulo: "Bitácora del uso real", texto: "Asistentes, horas reales y tipo de uso de cada práctica, con aviso diario si falta.", ancho: 2 },
          { icono: "Reportes", titulo: "Listo para Power BI", texto: "Excel ASISTENCIAS_EN_LABS y estadísticas por laboratorio." },
          { icono: "Ingreso", titulo: "Cuenta institucional", texto: "Inicio de sesión con Microsoft para estudiantes, docentes, laboratoristas y administración.", ancho: 2 }
        ]
      },
      cifras: [
        { valor: 146, texto: "endpoints en la API" },
        { valor: 24, texto: "entidades en la base de datos" },
        { valor: 31, texto: "historias de usuario en el backlog" },
        { valor: 9, texto: "sprints planificados" }
      ],
      etiquetasRoles: { estudiante: "Estudiante", docente: "Docente", laboratorista: "Laboratorista" },
      tituloRecorrido: "El recorrido de una reserva",
      recorrido: [
        { rol: "estudiante", titulo: "Consulta la disponibilidad", detalle: "El calendario del laboratorio muestra las clases, las reservas aprobadas y las pendientes." },
        { rol: "estudiante", titulo: "Envía la solicitud", detalle: "Diligencia el EA-TU-F-020 digital; el sistema valida cruces y aforo y le confirma el envío por correo." },
        { rol: "docente", titulo: "Firma primero", detalle: "Si la solicitud la hizo un estudiante, el docente encargado la aprueba o la rechaza con un motivo." },
        { rol: "laboratorista", titulo: "Aprueba o rechaza", detalle: "Segunda firma —o la única si la radicó un docente—; cada cambio llega por correo." },
        { rol: "laboratorista", titulo: "Registra el uso real", detalle: "Tras la práctica anota asistentes, horas y tipo de uso; la reserva queda como realizada." },
        { rol: "laboratorista", titulo: "Exporta para Power BI", detalle: "Descarga el Excel ASISTENCIAS_EN_LABS del periodo para los tableros de uso." }
      ],
      // Menú real por rol (src/app/layout/sidebar/nav-items.ts).
      gruposModulos: [
        { titulo: "Estudiante", descripcion: "Consulta el calendario, envía solicitudes y sigue su estado.", items: ["Inicio", "Calendario", "Mis solicitudes", "Mi perfil"] },
        { titulo: "Docente", descripcion: "Además de reservar, firma las solicitudes de sus estudiantes y consulta el historial.", items: ["Inicio", "Calendario", "Mis solicitudes", "Aprobaciones", "Historial de solicitudes", "Mi perfil"] },
        { titulo: "Laboratorista", descripcion: "Aprueba reservas, registra la bitácora, atiende servicios y consulta estadísticas.", items: ["Inicio", "Calendario", "Mis solicitudes", "Reservas especiales", "Aprobaciones", "Historial de solicitudes", "Estadísticas", "Bitácora de uso", "Servicios y equipos", "Horarios académicos", "Mi perfil"] },
        { titulo: "Administrador", descripcion: "Gestiona usuarios, laboratorios y catálogos académicos, además de todo lo operativo.", items: ["Inicio", "Calendario", "Mis solicitudes", "Reservas especiales", "Historial de solicitudes", "Estadísticas", "Bitácora de uso", "Usuarios", "Laboratorios", "Servicios y equipos", "Divisiones y facultades", "Espacios académicos", "Periodos académicos", "Horarios académicos", "Mi perfil"] }
      ],
      roles: ["estudiante", "docente", "laboratorista", "admin"],
      notaRoles: "Menú real de cada vista según el rol del usuario.",
      notaAgil: "Planificación tomada del documento de levantamiento de requerimientos y planificación Scrum del proyecto (julio de 2026).",
      // Planificación del documento de levantamiento de requerimientos (sección 11).
      sprints: [
        { nombre: "Planificación", objetivo: "Requerimientos, reglas de negocio y backlog priorizado", historias: "HU-01 a HU-03" },
        { nombre: "Diseño", objetivo: "Arquitectura, modelo de datos y prototipos validados", historias: "HU-04 a HU-07" },
        { nombre: "Sprint 3", objetivo: "Autenticación y catálogos base", historias: "HU-08 a HU-10" },
        { nombre: "Sprint 4", objetivo: "Calendario y horarios académicos", historias: "HU-11 a HU-14" },
        { nombre: "Sprint 5", objetivo: "Solicitud de reserva", historias: "HU-15 a HU-18" },
        { nombre: "Sprint 6", objetivo: "Flujo de aprobación y firma digital", historias: "HU-19 a HU-23" },
        { nombre: "Sprint 7", objetivo: "Gestión de reservas y bitácora", historias: "HU-24 a HU-26" },
        { nombre: "Sprint 8", objetivo: "Reportería e integración con Power BI", historias: "HU-27 a HU-29" },
        { nombre: "Sprint 9", objetivo: "Estabilización y salida a producción", historias: "HU-30, HU-31" }
      ],
      // Prioridad MoSCoW de las 31 historias de usuario del backlog.
      moscow: [
        { nombre: "Debe tener", valor: 23 },
        { nombre: "Debería tener", valor: 7 },
        { nombre: "Podría tener", valor: 1 }
      ],
      requerimientos: { funcionales: 18, noFuncionales: 10, reglas: 7 },
      reglas: [
        { titulo: "Dos firmas o una", detalle: "La solicitud de un estudiante necesita la firma del docente y luego la del laboratorista; la de un docente, solo la del laboratorista." },
        { titulo: "Las clases mandan", detalle: "Un espacio ocupado por un horario académico no se puede reservar, salvo que ese horario se modifique." },
        { titulo: "El rechazo detiene todo", detalle: "Un rechazo en cualquier etapa termina el flujo y avisa al solicitante con el motivo." },
        { titulo: "Aforo controlado", detalle: "Antes de crear la reserva se valida el cupo del laboratorio; el aforo se cuenta por persona o por reserva, según la configuración." },
        { titulo: "Cancelar no libera antes de tiempo", detalle: "Si se cancela una reserva ya aprobada, el laboratorio sigue bloqueado hasta la fecha original y se avisa al docente." },
        { titulo: "Toda reserva termina en bitácora", detalle: "Al registrar el uso, la reserva pasa a realizada; si la fecha pasa sin bitácora, los laboratoristas reciben un aviso." }
      ],
      arquitecturaBreve: {
        peticion: {
          titulo: "Recorrido de una solicitud",
          ejemplo: "Ejemplo: un estudiante reserva un laboratorio para una práctica.",
          pasos: [
            { nombre: "Angular + MSAL", detalle: "Token de la cuenta institucional" },
            { nombre: "JWT de Entra ID", detalle: "Firma, emisor y audiencia" },
            { nombre: "POST /solicitudes", detalle: "Rol y datos validados" },
            { nombre: "Disponibilidad", detalle: "Cruces con clases y reservas, y aforo" },
            { nombre: "SolicitudReserva", detalle: "Estado: pendiente del docente" },
            { nombre: "Historial", detalle: "Evento de creación registrado" },
            { nombre: "Cola de correos", detalle: "Confirmación y aviso al docente" },
            { nombre: "Worker cada 30 s", detalle: "Envía por SMTP sin hacer esperar" }
          ]
        },
        tarjetas: [
          { icono: "Capas", rotulo: "Patrón", titulo: "Cliente-servidor con SSO", texto: "Angular y una API en NestJS que solo valida los tokens que emite Microsoft." },
          { icono: "Carpetas", rotulo: "Organización", titulo: "17 módulos de dominio", texto: "Solicitudes, laboratorios, bitácora, catálogos, servicios, estadísticas y más, cada uno por separado." },
          { icono: "Encuesta", rotulo: "Notificaciones", titulo: "Una cola sin servicios externos", texto: "La tabla de notificaciones funciona como cola y un proceso la envía cada 30 segundos." },
          { icono: "Reportes", rotulo: "Datos", titulo: "Pensado para Power BI", texto: "La bitácora alimenta el Excel ASISTENCIAS_EN_LABS con el formato que espera Power Query." }
        ]
      }
    }
  },

  {
    id: "nomina",
    nombre: "Plataforma de Nómina",
    subtitulo: "Dos desarrollos para la nómina docente sobre una misma plataforma: la analítica de lo liquidado y la validación de novedades antes de liquidar.",
    estado: "En producción",
    solicitante: "",
    periodo: { inicio: "2026-08-31", fin: "" },
    horasAproximadas: null,
    proposito: "",
    descripcion: "La Plataforma de Nómina reúne dos aplicaciones que comparten el mismo frontend en Angular y la misma identidad visual, pero resuelven necesidades distintas de talento humano. Cada una tiene su propia API, su propia base de datos y su propia ficha en este informe.",
    queSeHizo: [""],
    identidad: { tema: "nomina", color: "#fdc300", numero: "06", etiqueta: "Talento humano" },
    capas: [],
    teoria: { arquitectura: "", organizacion: "", flujoPeticion: "", autenticacion: "", manejoErrores: "", documentacionApi: "" },
    modulos: [{ nombre: "", responsabilidad: "", entidades: "", endpoints: "" }],
    modeloDatos: { motor: "", orm: "", migraciones: "", seeds: "", entidades: [{ nombre: "", campos: "", relaciones: "" }] },
    tecnologias: [{ nombre: "", version: "", uso: "", categoria: "" }],
    herramientas: { convencionCommits: "", estrategiaRamas: "", actions: [{ nombre: "", disparador: "", jobs: "", automatiza: "" }], otras: [""] },
    gestionAgil: { historiasUsuario: null, sprints: null },
    despliegue: { plataforma: "", evidencia: "", pm2: { proceso: "", script: "", modo: "", instancias: "", logs: "" }, servidorWeb: "", comandoBuild: "", comandoStart: "", variablesEntorno: [""], puerto: "", cors: "" },
    calidad: { pruebas: "", rendimiento: [""], accesibilidad: [""], seguridad: [""] },
    hitos: [{ fecha: "", descripcion: "" }],
    repositorios: [
      { nombre: "nomina-front-end", url: "https://github.com/WldySandoval1/nomina-front-end", commits: 13, primerCommit: "2026-08-31", ultimoCommit: "2026-09-30" }
    ],
    urlProduccion: "https://nomina.santototunja.edu.co/",
    capturas: [{ src: "", alt: "", pie: "" }],
    pendientes: [""],
    extras: {
      // Cada desarrollo tiene su propia ficha (campo "ficha" = id del proyecto hijo).
      desarrollos: [
        {
          id: "dashboard",
          ficha: "nomina-dashboard",
          rotulo: "Desarrollo 1",
          nombre: "Dashboard de nómina",
          modulo: "Estadísticas Nómina",
          descripcion: "Analítica, liquidaciones, presupuesto y reportes de lo que ya se liquidó.",
          vistas: ["Panel", "Nómina", "Liquidaciones", "Usuarios", "Seguridad"],
          backend: "estadisticas-nomina-back",
          modulosBackend: []
        },
        {
          id: "novedades",
          ficha: "nomina-novedades",
          rotulo: "Desarrollo 2",
          nombre: "Novedades de Nómina",
          modulo: "Novedades de Nómina",
          descripcion: "Validación de la nómina de docentes de posgrado antes de liquidar: del PDF a la aprobación, mes a mes.",
          vistas: ["Nóminas", "Consolidado", "Programas", "Tarifas", "Solicitudes", "Mis programas"],
          backend: "nomina-back-end · extractor en Python",
          modulosBackend: []
        }
      ],
      baseNormativa: "Lineamientos de nómina, horarios y planeación académica 2026-2 (anexos 1 a 7)."
    }
  },

  {
    id: "nomina-dashboard",
    padre: "nomina",
    nombre: "Dashboard de nómina",
    subtitulo: "Analítica de la nómina liquidada: panel, liquidaciones, presupuesto, reportes y usuarios con doble factor.",
    estado: "En producción",
    solicitante: "",
    periodo: { inicio: "2026-08-31", fin: "" },
    horasAproximadas: null,
    proposito: "",
    descripcion: "Módulo «Estadísticas Nómina» de la plataforma: consulta y analítica de lo liquidado, con su propia API y acceso protegido con segundo factor.",
    queSeHizo: [""],
    identidad: { tema: "nomina", color: "#fdc300", numero: "06.1", etiqueta: "Estadísticas Nómina", nombreCorto: "Dashboard de nómina" },
    capas: [
      { rol: "Cliente", nombre: "Angular 22", detalle: "nomina-front-end · /estadisticas", logos: ["assets/img/tecnologias/angular.svg"] },
      { rol: "API REST", nombre: "NestJS 11", detalle: "estadisticas-nomina-back", logos: ["assets/img/tecnologias/nestjs.svg"] },
      { rol: "Datos", nombre: "TypeORM · mysql2", detalle: "con migraciones" }
    ],
    teoria: {
      arquitectura: "", organizacion: "", flujoPeticion: "",
      autenticacion: "JWT con segundo factor por código temporal (TOTP) y códigos de recuperación (variables JWT_SECRET y TOTP_ENCRYPTION_KEY).",
      manejoErrores: "", documentacionApi: ""
    },
    modulos: [
      { nombre: "auth", responsabilidad: "", entidades: "", endpoints: "" }, { nombre: "user", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "payroll", responsabilidad: "", entidades: "", endpoints: "" }, { nombre: "liquidaciones", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "presupuesto", responsabilidad: "", entidades: "", endpoints: "" }, { nombre: "reportes", responsabilidad: "", entidades: "", endpoints: "" },
      { nombre: "seguridad", responsabilidad: "", entidades: "", endpoints: "" }, { nombre: "mail", responsabilidad: "", entidades: "", endpoints: "" }
    ],
    modeloDatos: { motor: "", orm: "TypeORM", migraciones: "TypeORM (src/migrations)", seeds: "", entidades: [{ nombre: "", campos: "", relaciones: "" }] },
    tecnologias: [
      { nombre: "Angular", version: "22.1", uso: "", categoria: "frontend", logo: "assets/img/tecnologias/angular.svg" },
      { nombre: "Chart.js", version: "4.5", uso: "Gráficas del panel", categoria: "frontend" },
      { nombre: "NestJS", version: "11", uso: "", categoria: "backend", logo: "assets/img/tecnologias/nestjs.svg" },
      { nombre: "TypeORM", version: "1.1", uso: "", categoria: "backend", logo: "assets/img/tecnologias/typeorm.svg" },
      { nombre: "mysql2", version: "3.23", uso: "", categoria: "bd" },
      { nombre: "GitHub Actions", version: "", uso: "", categoria: "devops", logo: "assets/img/tecnologias/githubactions.svg" },
      { nombre: "PM2", version: "", uso: "", categoria: "devops", logo: "assets/img/tecnologias/pm2.svg" },
      { nombre: "pnpm", version: "", uso: "", categoria: "herramienta", logo: "assets/img/tecnologias/pnpm.svg" }
    ],
    herramientas: {
      convencionCommits: "", estrategiaRamas: "",
      actions: [{ nombre: "Build CPanel (estadísticas back)", disparador: "push a deploy", jobs: "build", automatiza: "Compila la API y publica el dist en cpanel-dist." }],
      otras: [""]
    },
    gestionAgil: { historiasUsuario: null, sprints: null },
    despliegue: {
      plataforma: "cPanel",
      evidencia: "estadisticas-nomina-back: .github/workflows/build-cpanel.yml · deploy/cpanel-deploy.sh",
      pm2: { proceso: "api-EstadisticasNomina", script: "main.js", modo: "", instancias: "", logs: "" },
      servidorWeb: "Frontend compartido: public_html/NominaTH/browser/",
      comandoBuild: "pnpm build",
      comandoStart: "pm2 start main.js --name api-EstadisticasNomina",
      variablesEntorno: ["PORT", "DB_HOST", "DB_PORT", "DB_USER", "DB_PASSWORD", "DB_NAME", "FRONTEND_URL", "JWT_SECRET", "SMTP_HOST", "SMTP_PORT", "SMTP_SECURE", "SMTP_USER", "SMTP_PASSWORD", "SMTP_FROM", "ADMIN_NAME", "ADMIN_EMAIL", "ADMIN_PASSWORD", "TOTP_ENCRYPTION_KEY", "DEV_NAME", "DEV_EMAIL", "DEV_PASSWORD"],
      puerto: "", cors: "FRONTEND_URL"
    },
    calidad: { pruebas: "", rendimiento: [""], accesibilidad: [""], seguridad: [""] },
    hitos: [{ fecha: "", descripcion: "" }],
    repositorios: [
      { nombre: "nomina-front-end", url: "https://github.com/WldySandoval1/nomina-front-end", commits: 13, primerCommit: "2026-08-31", ultimoCommit: "2026-09-30" },
      { nombre: "estadisticas-nomina-back", url: "https://github.com/WldySandoval1/estadisticas-nomina-back", commits: 8, primerCommit: "2026-08-31", ultimoCommit: "2026-09-30" }
    ],
    urlProduccion: "https://nomina.santototunja.edu.co/estadisticas/login",
    capturas: [{ src: "", alt: "", pie: "" }],
    pendientes: [""],
    extras: { relacionado: "nomina-novedades" }
  },

  {
    id: "nomina-novedades",
    padre: "nomina",
    nombre: "Novedades de Nómina",
    subtitulo: "Del PDF de nómina al Excel aprobado: el sistema extrae cada sesión, el directivo valida su programa mes a mes y la administración decide cada cambio.",
    estado: "En producción",
    solicitante: "",
    periodo: { inicio: "2026-08-31", fin: "" },
    horasAproximadas: null,
    // POR CONFIRMAR: redactado a partir del código y de los README del sistema.
    proposito: "La nómina de los docentes de posgrado se paga mes a mes y cada programa debe confirmar qué se le paga a cada docente: sesiones dictadas, horas, valor por hora y viáticos. La información llega en el PDF del reporte de nómina, que hay que revisar a mano, y la universidad exige que el directivo de cada programa notifique el mes siguiente dentro de los primeros 5 días hábiles.\n\nEl sistema convierte ese PDF en una tabla revisable en línea: el directivo valida o pide cambios desde su cuenta, la administración decide cada solicitud con trazabilidad y descarga el Excel final en el formato de posgrados, por programa o consolidado.",
    descripcion: "Se construyó un sistema de tres piezas: un microservicio en Python que lee el PDF del reporte de nómina, una API en NestJS con la lógica de validación, solicitudes y exportación, y las pantallas de administración y de directivos dentro del frontend en Angular de la plataforma.",
    queSeHizo: [
      "Extracción automática del PDF de nómina (reporte HVAR28_GWT): una fila por sesión, agrupada por materia y por mes de pago.",
      "Carga de nóminas por programa para 47 programas de posgrado: 24 especializaciones, 19 maestrías y 4 doctorados.",
      "Revisión mes a mes por el directivo del programa: validar cada mes o pedir cambios.",
      "Solicitudes de cambio por sesión, por campo o por mes, enviadas en lote y sin duplicados.",
      "Revisión de solicitudes por la administración, con historial del valor anterior y el nuevo.",
      "Tarifas por tipo de programa, categoría del docente y año.",
      "Horas y valores totales en letras, calculados a partir de las sesiones.",
      "Reporte de cumplimiento del plazo de 5 días hábiles y recordatorio automático por correo cada día hábil.",
      "Exportación a Excel en el formato de posgrados: por nómina, por programa o consolidado, filtrada por mes de pago.",
      "Despliegue automático de la API y del extractor en cPanel con GitHub Actions y PM2."
    ],
    identidad: { tema: "novedades", color: "#ffe000", numero: "06.2", etiqueta: "Novedades de Nómina", nombreCorto: "Novedades de Nómina" },
    capas: [
      { rol: "Cliente", nombre: "Angular 22", detalle: "nomina-front-end · /novedades", logos: ["assets/img/tecnologias/angular.svg", "assets/img/tecnologias/typescript.svg"] },
      { rol: "API REST", nombre: "NestJS 10", detalle: "12 módulos · 56 endpoints", logos: ["assets/img/tecnologias/nestjs.svg", "assets/img/tecnologias/typeorm.svg"] },
      { rol: "Extractor", nombre: "Python + FastAPI", detalle: "pdfplumber · pandas", logos: ["assets/img/tecnologias/python.svg", "assets/img/tecnologias/fastapi.svg"] },
      { rol: "Datos", nombre: "MariaDB", detalle: "TypeORM · 12 entidades", logos: ["assets/img/tecnologias/mariadb.svg"] }
    ],
    teoria: {
      arquitectura: "Arquitectura de tres piezas. El frontend en Angular presenta las pantallas de administración y de directivos; la API en NestJS concentra la lógica de negocio —nóminas, meses de pago, solicitudes, validaciones, cumplimiento y exportación— y es la única que accede a MariaDB; y un microservicio en Python con FastAPI se encarga solo de leer el PDF y devolver los datos en JSON. La API llama al extractor por HTTP en la misma máquina, así que los PDF no salen del servidor.",
      organizacion: "El backend tiene un módulo por dominio: auth, usuarios, programas, tarifas, nominas, asignaciones, asignaciones-mes, solicitudes, validaciones, notificaciones, export y cumplimiento, más los módulos internos de correo y del cliente del extractor. Las reglas compartidas —días hábiles, mes de una fecha, horas y pesos en letras— viven en src/common. El extractor separa configuración, extracción (PDF a sesiones y contexto), reportes y la capa de servicio que adapta los datos para la API.",
      flujoPeticion: "Cuando la administración carga el PDF de un programa, el frontend lo envía a POST /nominas con la cookie de sesión. La API verifica el JWT y el rol ADMIN, reenvía el archivo al extractor (POST /extraer) y recibe las sesiones con su contexto. Con eso crea la nómina, una asignación por materia y docente, y los meses de pago agrupando cada sesión por su fecha; las horas y los valores totales se calculan a partir de las sesiones, nunca a mano. Desde ese momento el directivo del programa puede revisarla.",
      autenticacion: "Inicio de sesión con correo y contraseña (bcrypt). El JWT viaja en una cookie httpOnly, no en el almacenamiento del navegador, y el CORS solo acepta el origen del frontend con credenciales. Hay tres roles: ADMIN, DIRECTIVO —que solo ve los programas que tiene asignados— y COORDINADOR, que gestiona usuarios. El inicio de sesión tiene límite de intentos por cuenta y la contraseña se recupera con un token de un solo uso enviado por correo.",
      manejoErrores: "Un ValidationPipe global con whitelist descarta los campos no declarados en los DTO, y un interceptor de serialización excluye datos sensibles como la contraseña de cualquier respuesta, incluso anidada. La API no arranca sin un JWT_SECRET real, usa helmet para las cabeceras de seguridad y solo publica la documentación Swagger fuera de producción.",
      documentacionApi: "Swagger en /api/docs con autenticación Bearer, disponible en desarrollo y desactivado en producción para no exponer el esquema de la API."
    },
    modulos: [
      { nombre: "auth", responsabilidad: "Inicio y cierre de sesión, registro de usuarios y recuperación de contraseña.", entidades: "Usuario, PasswordResetToken", endpoints: "POST /auth/login · /logout · /register · /forgot-password · /reset-password/:token · GET /auth/me" },
      { nombre: "usuarios", responsabilidad: "Perfil propio, directivos y programas asignados a cada uno.", entidades: "Usuario", endpoints: "GET/PATCH /usuarios/me · GET /directivos · PATCH /:id/programas" },
      { nombre: "programas", responsabilidad: "Catálogo de programas de posgrado.", entidades: "Programa", endpoints: "CRUD /programas" },
      { nombre: "tarifas", responsabilidad: "Valor hora por tipo de programa, categoría del docente y año.", entidades: "Tarifa", endpoints: "CRUD /tarifas · GET /categorias" },
      { nombre: "nominas", responsabilidad: "Carga del PDF, extracción y creación de asignaciones.", entidades: "Nomina, Asignacion", endpoints: "POST /nominas · GET · /:id · POST /:id/asignaciones" },
      { nombre: "asignaciones", responsabilidad: "Datos de cada docente y materia, y su validación.", entidades: "Asignacion", endpoints: "GET/PATCH /asignaciones/:id · PATCH /:id/validar" },
      { nombre: "asignaciones-mes", responsabilidad: "Meses de pago: validar, editar viáticos y mover, agregar o reprogramar sesiones.", entidades: "AsignacionMes, Sesion", endpoints: "PATCH /mover-sesion · /editar-fecha-sesion · POST /agregar-sesion · PATCH /:id/validar" },
      { nombre: "solicitudes", responsabilidad: "Solicitudes de cambio del directivo, en lote, y su revisión por la administración.", entidades: "SolicitudCambio", endpoints: "POST /solicitudes · /lote · /lote-sesiones · PATCH /lote · /:id/revisar" },
      { nombre: "validaciones", responsabilidad: "Validación de la nómina completa por el directivo.", entidades: "Validacion", endpoints: "POST · GET /validaciones" },
      { nombre: "notificaciones", responsabilidad: "Avisos dentro de la aplicación.", entidades: "Notificacion", endpoints: "GET /notificaciones · PATCH /:id/leer" },
      { nombre: "export", responsabilidad: "Excel en formato posgrados por nómina, programa o consolidado.", entidades: "—", endpoints: "GET /export/meses · /nomina/:id · /programa/:id · /todo" },
      { nombre: "cumplimiento", responsabilidad: "Plazo de 5 días hábiles y recordatorios por correo.", entidades: "AsignacionMes", endpoints: "POST /cumplimiento/recordatorios/enviar-ahora" }
    ],
    modeloDatos: {
      motor: "MariaDB",
      orm: "TypeORM 0.3 (driver mysql2)",
      migraciones: "10 migraciones en src/migrations; en el servidor el esquema se sincroniza desde las entidades",
      seeds: "Administrador inicial y catálogo de 47 programas de posgrado",
      entidades: [
        { nombre: "Usuario", campos: "nombre, correo, contraseña (bcrypt), rol (admin, directivo o coordinador), activo", relaciones: "N:M Programa (directivos)" },
        { nombre: "Programa", campos: "código, nombre, tipo (especialización, maestría o doctorado), activo", relaciones: "1:N Nomina" },
        { nombre: "Tarifa", campos: "tipo de programa, categoría del docente, año, valor hora", relaciones: "—" },
        { nombre: "Nomina", campos: "periodo, fecha de carga, estado (cargada, en validación, cerrada)", relaciones: "N:1 Programa · 1:N Asignacion · 1:N Validacion" },
        { nombre: "Asignacion", campos: "cédula, docente, formación, materia, grupo, estudiantes, sesiones, horas, valor hora y total, fechas, cohorte, viáticos, validada", relaciones: "N:1 Nomina · 1:N Sesion · 1:N AsignacionMes" },
        { nombre: "AsignacionMes", campos: "mes de pago, sesiones, horas y valor total (también en letras), viáticos, validada, cuándo y por quién", relaciones: "N:1 Asignacion · 1:N Sesion" },
        { nombre: "Sesion", campos: "fecha, hora de inicio y fin, horas, horario original", relaciones: "N:1 Asignacion · N:1 AsignacionMes" },
        { nombre: "SolicitudCambio", campos: "tipo (horario, campo o mes), campo, valor anterior, propuesto y final, justificación, estado (pendiente, aceptada, rechazada, modificada), comentario de la administración", relaciones: "N:1 Asignacion · N:1 Sesion · N:1 AsignacionMes" },
        { nombre: "Validacion", campos: "estado (sin cambios o con solicitudes), fecha", relaciones: "N:1 Nomina · N:1 Usuario" },
        { nombre: "Notificacion", campos: "mensaje, enlace, leída, fecha", relaciones: "N:1 Usuario · N:1 SolicitudCambio" },
        { nombre: "Historial", campos: "entidad, acción, valor anterior, valor nuevo, fecha", relaciones: "N:1 Usuario" },
        { nombre: "PasswordResetToken", campos: "hash del token, expiración, usado", relaciones: "N:1 Usuario" }
      ]
    },
    tecnologias: [
      { nombre: "Angular", version: "22.1", uso: "Pantallas de administración y directivos", categoria: "frontend", logo: "assets/img/tecnologias/angular.svg", destacada: true },
      { nombre: "TypeScript", version: "", uso: "", categoria: "frontend", logo: "assets/img/tecnologias/typescript.svg" },
      { nombre: "NestJS", version: "10", uso: "", categoria: "backend", logo: "assets/img/tecnologias/nestjs.svg", destacada: true },
      { nombre: "TypeORM", version: "0.3", uso: "", categoria: "backend", logo: "assets/img/tecnologias/typeorm.svg" },
      { nombre: "Passport JWT", version: "4.0", uso: "Sesión en cookie httpOnly", categoria: "backend", logo: "assets/img/tecnologias/passport.svg" },
      { nombre: "@nestjs/schedule", version: "4.1", uso: "Recordatorio diario de 7 a. m.", categoria: "backend" },
      { nombre: "@nestjs/throttler", version: "6.5", uso: "Límite de intentos de inicio de sesión", categoria: "backend" },
      { nombre: "Nodemailer", version: "9", uso: "Recordatorios y recuperación de contraseña", categoria: "backend" },
      { nombre: "ExcelJS", version: "4.4", uso: "Excel en formato posgrados", categoria: "backend", logo: "assets/img/tecnologias/excel.svg" },
      { nombre: "Swagger", version: "7", uso: "Documentación de la API", categoria: "backend" },
      { nombre: "Python", version: "3.12", uso: "Extractor del PDF", categoria: "backend", logo: "assets/img/tecnologias/python.svg", destacada: true },
      { nombre: "FastAPI", version: "", uso: "API del extractor", categoria: "backend", logo: "assets/img/tecnologias/fastapi.svg" },
      { nombre: "pdfplumber", version: "0.11", uso: "Lectura de las tablas del PDF", categoria: "backend" },
      { nombre: "pandas", version: "2.2", uso: "Agrupación de sesiones por materia", categoria: "backend", logo: "assets/img/tecnologias/pandas.svg" },
      { nombre: "MariaDB", version: "", uso: "", categoria: "bd", logo: "assets/img/tecnologias/mariadb.svg", destacada: true },
      { nombre: "mysql2", version: "3.9", uso: "", categoria: "bd", logo: "assets/img/tecnologias/mysql.svg" },
      { nombre: "GitHub Actions", version: "", uso: "", categoria: "devops", logo: "assets/img/tecnologias/githubactions.svg" },
      { nombre: "cPanel", version: "", uso: "", categoria: "devops", logo: "assets/img/tecnologias/cpanel.svg" },
      { nombre: "PM2", version: "", uso: "API y extractor", categoria: "devops", logo: "assets/img/tecnologias/pm2.svg" },
      { nombre: "Docker", version: "", uso: "MariaDB en desarrollo", categoria: "devops", logo: "assets/img/tecnologias/docker.svg" },
      { nombre: "Jest", version: "", uso: "12 archivos de pruebas", categoria: "herramienta", logo: "assets/img/tecnologias/jest.svg" },
      { nombre: "pnpm", version: "", uso: "", categoria: "herramienta", logo: "assets/img/tecnologias/pnpm.svg" }
    ],
    herramientas: {
      convencionCommits: "Conventional Commits en el frontend (feat, fix) y mensajes descriptivos en el backend.",
      estrategiaRamas: "En el frontend, cada aplicación se desarrolló en su rama —feature/novedades y feature/estadisticas— y se integró en main por pull request. En los tres repositorios, la rama deploy dispara la compilación en GitHub Actions y el resultado se publica en cpanel-dist, que cPanel clona y despliega.",
      actions: [
        { nombre: "Build CPanel (frontend)", disparador: "push a deploy", jobs: "build", automatiza: "Compila la SPA y la publica en cpanel-dist; cPanel la copia a public_html/NominaTH/browser/, compartida con el Dashboard." },
        { nombre: "Build CPanel (backend)", disparador: "push a deploy", jobs: "build", automatiza: "Compila la API y la empaqueta en cpanel-dist; en el servidor se instalan dependencias de producción y se reinicia api-NovedadesNomina." },
        { nombre: "Build CPanel (extractor)", disparador: "push a deploy", jobs: "build", automatiza: "Publica el código del extractor en cpanel-dist; en el servidor se actualiza su entorno virtual y se reinicia api-Extractor." }
      ],
      otras: ["Swagger", "Docker Compose", "Jest", "dev.sh"]
    },
    gestionAgil: { historiasUsuario: null, sprints: null },
    despliegue: {
      plataforma: "cPanel",
      evidencia: ".github/workflows/build-cpanel.yml · deploy/cpanel-deploy.sh (backend y extractor)",
      pm2: { proceso: "api-NovedadesNomina · api-Extractor", script: "main.js · uvicorn app.api:app", modo: "", instancias: "", logs: "" },
      servidorWeb: "Frontend: public_html/NominaTH/browser/ · API: /home/delegados/BackendNovedadesNomina/ · Extractor: /home/delegados/BackendNovedadesNominaExtractor/",
      comandoBuild: "pnpm build",
      comandoStart: "pm2 restart api-NovedadesNomina --update-env",
      variablesEntorno: ["PORT", "FRONTEND_URL", "DB_HOST", "DB_PORT", "DB_USER", "DB_PASS", "DB_NAME", "JWT_SECRET", "JWT_EXPIRES_IN", "SMTP_HOST", "SMTP_PORT", "SMTP_SECURE", "SMTP_USER", "SMTP_PASSWORD", "SMTP_FROM", "EXTRACTOR_URL", "ADMIN_NOMBRE", "ADMIN_EMAIL", "ADMIN_PASSWORD"],
      puerto: "Extractor en 127.0.0.1:8100 (solo local)",
      cors: "Solo FRONTEND_URL · con credenciales"
    },
    calidad: {
      pruebas: "12 archivos de pruebas unitarias con Jest sobre los servicios (autenticación, usuarios, programas, nóminas, asignaciones, meses de pago, notificaciones y recordatorios) y las reglas compartidas (días hábiles, mes de una fecha, derivación de meses y horas en letras). Usan repositorios simulados, así que no necesitan base de datos.",
      rendimiento: [
        "El extractor corre en el mismo servidor y solo escucha en 127.0.0.1: el PDF no viaja a servicios externos.",
        "El reporte Excel lee el estado actual de la base de datos, sin recalcular solicitudes al exportar."
      ],
      accesibilidad: [""],
      seguridad: [
        "Sesión en cookie httpOnly y CORS restringido al dominio del frontend con credenciales.",
        "Límite de intentos de inicio de sesión por cuenta, con trust proxy para contar bien detrás del servidor web.",
        "La API no arranca sin un JWT_SECRET real.",
        "La contraseña se excluye de toda respuesta, incluso dentro de objetos anidados.",
        "Swagger desactivado en producción.",
        "Un directivo solo ve los programas que tiene asignados."
      ]
    },
    hitos: [
      { fecha: "2026-08-31", descripcion: "Carga inicial del backend y del frontend de Novedades." },
      { fecha: "2026-09-08", descripcion: "Ajustes en los mensajes al usuario." },
      { fecha: "2026-09-10", descripcion: "Cambios en la nómina y en la visualización de las pantallas." },
      { fecha: "2026-09-22", descripcion: "Cambios en roles y perfiles, y en las solicitudes de directivos y administración." },
      { fecha: "2026-09-23", descripcion: "Integración de feature/novedades y feature/estadisticas en main por pull request." },
      { fecha: "2026-09-29", descripcion: "Configuración y scripts de despliegue del backend en cPanel." },
      { fecha: "2026-09-30", descripcion: "Extractor publicado en su propio repositorio y desplegado en cPanel." }
    ],
    repositorios: [
      { nombre: "nomina-front-end", url: "https://github.com/WldySandoval1/nomina-front-end", commits: 13, primerCommit: "2026-08-31", ultimoCommit: "2026-09-30" },
      { nombre: "nomina-back-end", url: "https://github.com/WldySandoval1/nomina-back-end", commits: 6, primerCommit: "2026-08-31", ultimoCommit: "2026-09-30" },
      { nombre: "extractorpdf-novedades-nomina", url: "https://github.com/WldySandoval1/extractorpdf-novedades-nomina", commits: 2, primerCommit: "2026-09-30", ultimoCommit: "2026-09-30" }
    ],
    urlProduccion: "https://nomina.santototunja.edu.co/novedades/login",
    capturas: [{ src: "", alt: "", pie: "" }],
    pendientes: [""],
    extras: {
      resumen: {
        declaracion: "Del PDF de nómina a [[un Excel aprobado]]: el sistema extrae cada sesión, el directivo valida su programa mes a mes y la administración decide [[cada cambio con trazabilidad]].",
        destacados: [
          { icono: "Archivo", titulo: "Extracción automática", texto: "El PDF del reporte de nómina se convierte en sesiones, materias y meses de pago, sin digitar.", ancho: 2 },
          { icono: "Periodos y horas", titulo: "Revisión mes a mes", texto: "El directivo valida cada mes de pago de su programa." },
          { icono: "Encuesta", titulo: "Solicitudes de cambio", texto: "Mover o agregar sesiones y corregir campos o viáticos, todo en un solo lote." },
          { icono: "Saldo", titulo: "Plazo de 5 días hábiles", texto: "Un reporte de cumplimiento y un recordatorio por correo cada día hábil a las 7 a. m.", ancho: 2 },
          { icono: "Reportes", titulo: "Excel en formato posgrados", texto: "Por nómina, por programa o consolidado, filtrado por mes de pago." },
          { icono: "Trazabilidad", titulo: "Historial de cada decisión", texto: "Cada solicitud guarda el valor anterior y el nuevo; los totales nunca se editan a mano.", ancho: 2 }
        ]
      },
      cifras: [
        { valor: 56, texto: "endpoints en la API" },
        { valor: 12, texto: "entidades en la base de datos" },
        { valor: 47, texto: "programas de posgrado cargados" },
        { valor: 5, texto: "días hábiles de plazo para validar" }
      ],
      etiquetasRoles: { admin: "Administración", extractor: "Extractor", directivo: "Directivo del programa" },
      tituloRecorrido: "El recorrido de una nómina",
      recorrido: [
        { rol: "admin", titulo: "Carga el PDF", detalle: "Sube el reporte de nómina de un programa para el periodo." },
        { rol: "extractor", titulo: "Lee cada sesión", detalle: "El microservicio en Python extrae las sesiones y las agrupa por materia y por mes de pago." },
        { rol: "directivo", titulo: "Revisa su programa", detalle: "Dentro de los primeros 5 días hábiles valida cada mes de pago." },
        { rol: "directivo", titulo: "Pide cambios", detalle: "Reprograma o agrega sesiones y corrige campos o viáticos; todo se envía en un solo lote." },
        { rol: "admin", titulo: "Decide cada solicitud", detalle: "La acepta, la rechaza o la modifica; el historial conserva el valor anterior." },
        { rol: "admin", titulo: "Descarga el Excel", detalle: "Por nómina, por programa o consolidado, filtrado por mes de pago." }
      ],
      // Menú real por rol (src/app/layout/main-layout/main-layout.html).
      gruposModulos: [
        { titulo: "Administración", descripcion: "Carga las nóminas, gestiona programas, tarifas y usuarios, y decide las solicitudes.", items: ["Nóminas", "Consolidado", "Programas", "Tarifas", "Usuarios", "Solicitudes", "Historial"] },
        { titulo: "Directivo", descripcion: "Revisa y valida los programas que tiene asignados y sigue sus solicitudes.", items: ["Mis programas", "Historial", "Mi perfil"] },
        { titulo: "Coordinador", descripcion: "Gestiona los usuarios directivos y consulta el historial.", items: ["Usuarios", "Historial", "Mi perfil"] }
      ],
      roles: ["admin", "directivo", "coordinador"],
      reglas: [
        { titulo: "Los totales no se digitan", detalle: "Sesiones, horas, horas en letras y valor total de cada mes se calculan a partir de las sesiones asignadas." },
        { titulo: "Cinco días hábiles", detalle: "El directivo debe validar o pedir cambios del mes siguiente en los primeros 5 días hábiles; el recordatorio sale cada día hábil a las 7 a. m." },
        { titulo: "Sin duplicados", detalle: "Si ya hay una solicitud pendiente para la misma sesión o el mismo campo, se actualiza en lugar de crear otra." },
        { titulo: "Un lote, un aviso", detalle: "Varios cambios enviados juntos generan una sola notificación a la administración." },
        { titulo: "Cancelar solo lo propio", detalle: "El directivo puede cancelar su solicitud mientras siga pendiente, no la de otro ni una ya resuelta." },
        { titulo: "La fecha decide el mes", detalle: "Al reprogramar una sesión, el mes de pago se deriva de la nueva fecha y se crea si todavía no existe." }
      ],
      arquitecturaBreve: {
        peticion: {
          titulo: "Recorrido de una carga",
          ejemplo: "Ejemplo: la administración carga la nómina de una maestría.",
          pasos: [
            { nombre: "Angular", detalle: "Envía el PDF con la cookie de sesión" },
            { nombre: "POST /nominas", detalle: "JWT y rol ADMIN" },
            { nombre: "ExtractorService", detalle: "Reenvía el PDF a 127.0.0.1:8100" },
            { nombre: "FastAPI /extraer", detalle: "pdfplumber lee las tablas" },
            { nombre: "Sesiones", detalle: "Agrupadas por materia y docente" },
            { nombre: "Asignaciones", detalle: "Una por materia, con sus datos" },
            { nombre: "Meses de pago", detalle: "Sesiones agrupadas por fecha" },
            { nombre: "MariaDB", detalle: "Guarda la nómina para revisión" }
          ]
        },
        tarjetas: [
          { icono: "Capas", rotulo: "Patrón", titulo: "Tres piezas", texto: "Angular para las pantallas, NestJS para las reglas y un microservicio en Python solo para leer el PDF." },
          { icono: "Carpetas", rotulo: "Organización", titulo: "Un módulo por dominio", texto: "Nóminas, meses de pago, solicitudes, validaciones, cumplimiento y exportación, cada uno por separado." },
          { icono: "Ingreso", rotulo: "Autenticación", titulo: "Cookie httpOnly y roles", texto: "El JWT no queda al alcance de JavaScript; administración, directivo y coordinador ven solo lo suyo." },
          { icono: "Escudo", rotulo: "Seguridad", titulo: "Nada sale del servidor", texto: "El extractor solo escucha en local; sin JWT_SECRET la API no arranca y Swagger se apaga en producción." }
        ]
      },
      relacionado: "nomina-dashboard"
    }
  },

  {
    id: "mesas-ayuda",
    nombre: "Mesas de ayuda",
    subtitulo: "Tres mesas sobre HESK de código abierto: portadas propias, campos que se adaptan a cada solicitud y validación en el servidor.",
    estado: "En producción",
    solicitante: "",
    periodo: { inicio: "", fin: "" },
    horasAproximadas: null,
    // POR CONFIRMAR: redactado a partir de los archivos modificados de cada mesa.
    proposito: "Varias dependencias de la universidad atienden solicitudes que llegan por correo, chat o en persona, sin un número de seguimiento ni un registro de los requisitos que cada trámite exige. Eso obliga a pedir documentos una y otra vez y dificulta saber en qué estado está cada caso.\n\nUna mesa de ayuda por dependencia ordena esa atención: cada solicitud queda como un ticket con su número, la persona sabe desde el inicio qué debe adjuntar y cuánto tarda el trámite, y el equipo responde desde un solo panel.",
    descripcion: "Se pusieron en producción tres mesas de ayuda sobre HESK 3.7.10, un sistema de tickets de código abierto en PHP. En lugar de construir una aplicación desde cero, se personalizó cada instancia: una portada con la identidad de la dependencia y un formulario extendido con comportamiento que HESK no trae de fábrica.",
    queSeHizo: [
      "Portada propia para cada mesa —RQS, Dirección de Investigación e Innovación y SUMMA | SantotoUP— con sus colores, banners e iconos animados.",
      "Tarjetas de categoría que llevan directo al formulario de cada trámite: 3 en RQS, 8 en Investigación y 7 en SUMMA.",
      "Mensajes informativos por categoría con los requisitos, formatos descargables y advertencias antes del formulario.",
      "Cascada de campos personalizados: un campo principal muestra u oculta los dependientes según la opción elegida.",
      "Panel dinámico del trámite con tiempo de respuesta, modalidad y documentos obligatorios para 16 trámites de Investigación.",
      "Validación en el servidor sincronizada con la cascada, para que HESK no exija campos que la persona nunca vio.",
      "En RQS: solicitud anónima, campos según el tipo de usuario y el destino, y aceptación de la política de tratamiento de datos.",
      "Documentos de apoyo descargables en SUMMA: instructivos y formatos de credenciales, propuestas y presupuesto."
    ],
    identidad: { tema: "mesas", color: "#01abb7", numero: "07", etiqueta: "Soporte" },
    capas: [
      { rol: "Portada", nombre: "Encabezado por mesa", detalle: "HTML · CSS · iconos animados de Lordicon", logos: ["assets/img/tecnologias/html.svg", "assets/img/tecnologias/css.svg"] },
      { rol: "Formulario", nombre: "HESK 3.7.10", detalle: "Plantillas PHP modificadas", logos: ["assets/img/tecnologias/php.svg"] },
      { rol: "Datos", nombre: "Base de datos de HESK", detalle: "La trae el sistema; no se modificó" }
    ],
    teoria: {
      arquitectura: "La solución se construyó sobre HESK 3.7.10, un sistema de mesa de ayuda de código abierto escrito en PHP que trae su propia base de datos. En lugar de desarrollar una aplicación desde cero, se puso en marcha una instancia por dependencia y se personalizó: la portada de cada mesa es un encabezado HTML propio con sus colores, banners e iconos, y el formulario de creación de tickets se extendió con lógica que HESK no trae de fábrica.",
      organizacion: "Los cambios viven en pocos archivos y cada uno abre con un bloque de comentario que explica qué se modificó. El encabezado de cada mesa (headRQS, headInvestigacion y headSumma) define la portada y las tarjetas de categoría; create_ticket.php agrega los mensajes por categoría, la cascada de selects y el panel del trámite; submit_ticket.php replica en el servidor las reglas de la cascada; y la plantilla de campos personalizados dibuja los campos condicionales de RQS. Cada comportamiento se edita desde un único arreglo: $infoPorCategoria, configuraciones, infoTramites y $camposCondicionales.",
      flujoPeticion: "En la portada, la persona elige una categoría y llega al formulario de HESK con esa categoría preseleccionada. Antes del formulario aparece la caja con los requisitos y formatos de esa categoría. Mientras diligencia, la cascada muestra solo los campos que corresponden a sus respuestas y el panel del trámite indica tiempo de respuesta, modalidad y documentos. Al enviar, submit_ticket.php revisa $camposCondicionales: exige únicamente los campos dependientes de la opción elegida y descarta los demás; luego HESK crea el ticket con su número de seguimiento y lo deja disponible para el equipo de la dependencia.",
      autenticacion: "Quien solicita no necesita cuenta: radica el ticket con su correo y lo consulta después desde «Ver tickets existentes». En RQS, si la solicitud es anónima, se ocultan y se vacían el nombre, el correo, el documento y el teléfono. El equipo de cada dependencia atiende desde el panel administrativo de HESK.",
      manejoErrores: "La validación se hace dos veces. En el navegador, al ocultar un campo se le quita el atributo required y se borra su valor, para que el formulario nunca quede bloqueado por algo que la persona no puede ver. En el servidor, el mismo mapa de campos condicionales evita que HESK exija como obligatorios campos que nunca se mostraron. Por eso los dos mapas deben coincidir valor por valor, con tildes incluidas.",
      documentacionApi: ""
    },
    modulos: [{ nombre: "", responsabilidad: "", entidades: "", endpoints: "" }],
    modeloDatos: {
      motor: "", orm: "", migraciones: "", seeds: "",
      entidades: [{ nombre: "", campos: "", relaciones: "" }]
    },
    tecnologias: [
      // Lo que se usó en las modificaciones; la base de datos y las librerías venían con HESK.
      { nombre: "HTML", version: "", uso: "Portadas de cada mesa", categoria: "frontend", logo: "assets/img/tecnologias/html.svg", destacada: true },
      { nombre: "CSS", version: "", uso: "Identidad visual de cada mesa", categoria: "frontend", logo: "assets/img/tecnologias/css.svg", destacada: true },
      { nombre: "JavaScript", version: "", uso: "Cascada de campos y panel del trámite", categoria: "frontend", logo: "assets/img/tecnologias/javascript.svg" },
      { nombre: "Lordicon", version: "", uso: "Iconos animados de las portadas", categoria: "frontend" },
      { nombre: "PHP", version: "", uso: "Plantillas y validación en el servidor", categoria: "backend", logo: "assets/img/tecnologias/php.svg", destacada: true },
      { nombre: "HESK", version: "3.7.10", uso: "Sistema de tickets de código abierto sobre el que se trabajó", categoria: "herramienta" }
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
    calidad: {
      pruebas: "",
      rendimiento: [""],
      accesibilidad: [""],
      seguridad: [
        "La política de tratamiento de datos personales se presenta y se acepta dentro del formulario de RQS.",
        "La solicitud anónima de RQS no guarda nombre, correo, documento ni teléfono.",
        "Los campos ocultos se vacían antes del envío y el servidor descarta los que no correspondían."
      ]
    },
    hitos: [{ fecha: "", descripcion: "" }],
    repositorios: [{ nombre: "", url: "", commits: null, primerCommit: "", ultimoCommit: "" }],
    urlProduccion: "",
    capturas: [{ src: "", alt: "", pie: "" }],
    pendientes: [""],
    extras: {
      textoFlotante: "Abrir mesas en vivo",
      // Las tres mesas en producción: botones del héroe y menú del botón flotante.
      sitios: [
        { nombre: "RQS", url: "https://rqs.santototunja.edu.co/" },
        { nombre: "Investigación", url: "https://solicitudinvestigaciones.santototunja.edu.co/" },
        { nombre: "SUMMA", url: "https://solicitudsumma.santototunja.edu.co/" }
      ],
      // POR CONFIRMAR: la frase resume el propósito redactado a partir del código.
      resumen: {
        declaracion: "Tres dependencias, tres maneras de pedir ayuda. Sobre [[un mismo HESK]] de código abierto, cada mesa tiene [[su portada, sus campos y sus reglas]].",
        destacados: [
          { lordicon: "homologacion", icono: "Paleta", titulo: "Una portada por mesa", texto: "Colores, banners e iconos de cada dependencia, con tarjetas que llevan directo al trámite.", ancho: 2 },
          { lordicon: "nuevoTicket", icono: "Archivo", titulo: "Requisitos a la vista", texto: "Antes del formulario, cada categoría muestra qué adjuntar y dónde descargar los formatos." },
          { lordicon: "Edit2", icono: "Cascada", titulo: "Campos en cascada", texto: "Un campo muestra u oculta otros según la opción elegida." },
          { lordicon: "ver", icono: "Escudo", titulo: "Validación en el servidor", texto: "Lo que el formulario oculta, el servidor no lo exige: las dos reglas van sincronizadas.", ancho: 2 },
          { lordicon: "Innovacion", icono: "Saldo", titulo: "Información del trámite", texto: "Tiempo de respuesta, modalidad y documentos según el trámite elegido." },
          { lordicon: "help", icono: "Ojo", titulo: "Solicitud anónima", texto: "En RQS se puede radicar sin identificarse; la política de datos se acepta en el formulario.", ancho: 2 }
        ]
      },
      cifras: [
        { valor: 3, texto: "mesas de ayuda en producción" },
        { valor: 18, texto: "categorías con tarjeta propia" },
        { valor: 16, texto: "trámites con información dinámica" },
        { valor: 4, texto: "grupos de campos en cascada" }
      ],
      // Colores de los iconos animados de la ficha (controles primary/secondary de Lordicon).
      paletaIconos: { primary: "#222256", secondary: "#01abb7" },
      etiquetasRoles: { solicitante: "Solicitante", mesa: "Mesa de ayuda", equipo: "Equipo de la dependencia" },
      tituloRecorrido: "El recorrido de una solicitud",
      recorrido: [
        { rol: "solicitante", titulo: "Elige la mesa y la categoría", detalle: "La portada de cada dependencia guía con tarjetas hacia el trámite correcto." },
        { rol: "mesa", titulo: "Muestra los requisitos", detalle: "Antes del formulario aparecen los documentos y formatos que pide esa categoría." },
        { rol: "solicitante", titulo: "Diligencia el formulario", detalle: "Solo ve los campos que corresponden a sus respuestas; el panel del trámite indica tiempo, modalidad y documentos." },
        { rol: "mesa", titulo: "Valida y crea el ticket", detalle: "El servidor exige solo los campos activos y HESK asigna el número de seguimiento." },
        { rol: "equipo", titulo: "Atiende la solicitud", detalle: "El equipo de la dependencia responde desde el panel de HESK." },
        { rol: "solicitante", titulo: "Consulta el estado", detalle: "Desde «Ver tickets existentes» sigue la respuesta de su caso." }
      ],
      tituloMesas: "Las tres mesas",
      // Una entrada por mesa; colores tomados de cada encabezado (head*.html).
      mesas: [
        {
          nombre: "RQS", dependencia: "Canal de atención al usuario · «Tu voz cuenta»",
          atiende: "Reconocimientos, quejas y solicitudes de la comunidad universitaria que no tienen una mesa propia.",
          herramienta: "HESK 3.7.10", url: "https://rqs.santototunja.edu.co/",
          colores: { fondo: "#003b70", texto: "#ffffff", acento: "#fdc300" },
          lordicon: "help",
          // Banner de la portada en producción (img/JPEG/Tu-Voz-Cuenta-PRINCIPAL.webp).
          portada: { banner: "assets/img/mesas/rqs-banner.webp" },
          categorias: ["Reconocimiento", "Queja", "Solicitud o petición"]
        },
        {
          nombre: "Investigación", dependencia: "Dirección de Investigación e Innovación",
          atiende: "Certificaciones, presupuesto, homologación y cierre de proyectos de investigación.",
          herramienta: "HESK 3.7.10", url: "https://solicitudinvestigaciones.santototunja.edu.co/",
          colores: { fondo: "#222256", texto: "#ffffff", acento: "#d7cb03" },
          lordicon: "investigacion",
          portada: {
            banner: "assets/img/mesas/investigacion-banner.webp",
            miniaturas: ["assets/img/mesas/investigacion-certificaciones.webp", "assets/img/mesas/investigacion-certificacion-presupuestal.webp", "assets/img/mesas/investigacion-ejecucion-presupuesto.webp", "assets/img/mesas/investigacion-homologacion.webp"]
          },
          categorias: ["Certificaciones de investigación", "Certificación presupuestal", "Ejecución de presupuesto", "Homologación de productos", "Cambio de rubros", "Cierre de proyectos", "Certificados editoriales", "Santoto Camina Living Lab"]
        },
        {
          nombre: "SUMMA", dependencia: "Centro de Servicios de Educación Continua · SantotoUP",
          atiende: "Programas, credenciales, convenios y procesos académicos de educación continua.",
          herramienta: "HESK 3.7.10", url: "https://solicitudsumma.santototunja.edu.co/",
          lordicon: "Edit",
          // Portada azul con cian y lima; el morado #bc2fc6 solo aparece en el trazo de los iconos.
          colores: { fondo: "#003b70", texto: "#ffffff", acento: "#59c8cb", detalle: "#d3eb4b", iconos: "#bc2fc6" },
          // Banner de la portada en producción (img/JPEG/Summa.png).
          portada: { banner: "assets/img/mesas/summa-banner.webp" },
          categorias: ["Certificados digitales", "Propuestas SUMMA", "Propuestas SantotoUP (credenciales)", "Oferta académica", "Convenios y alianzas", "Reuniones y acompañamiento", "Encuestas e indicadores"]
        }
      ],
      flujo: [""],
      // Demostración interactiva de la lógica de RQS (customRQS-fields.php).
      // Las opciones están resumidas; las listas completas se configuran en HESK.
      demoCascada: {
        titulo: "Pruébalo: el formulario de RQS",
        lordicon: "pointer",
        nota: "Recreación de la lógica real con opciones resumidas. Cambia las respuestas y mira qué campos aparecen y cuáles exige el servidor.",
        campos: [
          { id: "custom10", etiqueta: "¿Desea realizar la solicitud de forma anónima?", tipo: "radio", opciones: ["Si", "No"], valor: "No" },
          { id: "name", etiqueta: "Nombre", tipo: "texto", muestraSi: { campo: "custom10", valores: ["No"] } },
          { id: "email", etiqueta: "Correo electrónico", tipo: "texto", muestraSi: { campo: "custom10", valores: ["No"] } },
          { id: "custom8", etiqueta: "Tipo de usuario", tipo: "select", opciones: ["Estudiante", "Graduado", "Otro"] },
          { id: "custom13", etiqueta: "Nivel académico", tipo: "select", opciones: ["Pregrado", "Posgrado"], muestraSi: { campo: "custom8", valores: ["Estudiante", "Graduado"] } },
          { id: "custom11", etiqueta: "Modalidad", tipo: "select", opciones: ["Presencial", "Virtual"], muestraSi: { campo: "custom8", valores: ["Estudiante", "Graduado"] } },
          { id: "custom18", etiqueta: "¿Cuál?", tipo: "texto", muestraSi: { campo: "custom8", valores: ["Otro"] } },
          { id: "custom14", etiqueta: "Destino de la solicitud", tipo: "select", opciones: ["Programa académico", "Área / Dirección"] },
          { id: "custom1", etiqueta: "Programa académico", tipo: "select", opciones: ["Ingeniería de Sistemas", "Derecho", "Arquitectura"], muestraSi: { campo: "custom14", valores: ["Programa académico"] } },
          { id: "custom2", etiqueta: "Área / Dirección", tipo: "select", opciones: ["Dirección de Comunicaciones", "Bienestar Universitario", "CRAI"], muestraSi: { campo: "custom14", valores: ["Área / Dirección"] } }
        ]
      },
      reglas: [
        { titulo: "Lo oculto no se exige", detalle: "Al ocultar un campo se le quita el atributo required y se borra su valor, para que el navegador no bloquee el envío." },
        { titulo: "Navegador y servidor van juntos", detalle: "El mapa de la cascada en create_ticket.php y la validación en submit_ticket.php deben coincidir valor por valor, con tildes." },
        { titulo: "Anónimo de verdad", detalle: "Si la solicitud es anónima, se ocultan y se vacían el nombre, el correo, el documento y el teléfono." },
        { titulo: "Solo cuando aplica", detalle: "Nivel académico y modalidad se piden solo a estudiantes y graduados; «Otro» abre un campo para escribir." },
        { titulo: "El destino decide la lista", detalle: "Si el destino es un programa académico aparece la lista de programas; si es un área, la de áreas y direcciones." },
        { titulo: "Un solo lugar para editar", detalle: "Mensajes, cascadas e información de los trámites se cambian desde un arreglo, sin tocar la lógica." }
      ],
      arquitecturaBreve: {
        peticion: {
          titulo: "Recorrido de una solicitud",
          ejemplo: "Ejemplo: un docente pide la ejecución de presupuesto en la mesa de Investigación.",
          pasos: [
            { nombre: "Portada", detalle: "Elige la tarjeta de la categoría" },
            { nombre: "Info de categoría", detalle: "Requisitos y formatos del SIAC" },
            { nombre: "Cascada", detalle: "custom4 muestra custom11 a custom14" },
            { nombre: "Panel del trámite", detalle: "Tiempo, modalidad y documentos" },
            { nombre: "submit_ticket.php", detalle: "Recibe el formulario" },
            { nombre: "$camposCondicionales", detalle: "Exige solo los campos activos" },
            { nombre: "HESK", detalle: "Crea el ticket con su número" },
            { nombre: "Base de datos", detalle: "La de HESK guarda el ticket" }
          ]
        },
        tarjetas: [
          { icono: "Capas", rotulo: "Enfoque", titulo: "Personalizar, no reescribir", texto: "HESK resuelve tickets, correos y panel; los cambios se concentran en la portada y el formulario." },
          { icono: "Carpetas", rotulo: "Organización", titulo: "Un bloque por cambio", texto: "Cada archivo modificado abre con un comentario que explica qué se cambió y cómo editarlo." },
          { icono: "Escudo", rotulo: "Validación", titulo: "Doble regla", texto: "La visibilidad se controla en el navegador y la obligatoriedad en el servidor, con el mismo mapa." },
          { icono: "Paleta", rotulo: "Identidad", titulo: "Una portada por dependencia", texto: "Cada mesa tiene su encabezado con colores, banners, tarjetas de categoría e iconos animados." }
        ]
      },
      // Archivos de HESK modificados y qué cambió en cada uno.
      archivos: [
        { archivo: "headRQS.html · headInvestigacion.html · headSumma.html", mesa: "Las tres", cambio: "Portada de cada mesa: banner, tarjetas de categoría, documentos de apoyo e iconos animados." },
        { archivo: "create_ticket.php", mesa: "Investigación", cambio: "Mensajes informativos por categoría, cascada de selects y panel de información del trámite." },
        { archivo: "submit_ticket.php", mesa: "Investigación", cambio: "Validación en el servidor de los campos condicionales ($camposCondicionales)." },
        { archivo: "Plantilla de campos personalizados", mesa: "RQS", cambio: "Solicitud anónima, campos según tipo de usuario y destino, y política de tratamiento de datos." }
      ]
    }
  },

  {
    id: "gestion-docente",
    nombre: "Gestión Docente",
    subtitulo: "Formación permanente del cuerpo docente: periodos, cursos, horas y constancias en una sola plataforma.",
    estado: "En producción",
    solicitante: "",
    periodo: { inicio: "2026-08-28", fin: "" },
    horasAproximadas: null,
    // POR CONFIRMAR: redactado a partir del código y de los requisitos (RF-*) citados en él.
    proposito: "Cada periodo académico la universidad fija una meta de horas de formación permanente según el tipo de vinculación del docente —tiempo completo, medio tiempo, cátedra o administrativo—. Hacer ese seguimiento a mano implica cruzar inscripciones, asistencias, notas y certificados de muchos cursos dictados por distintos tutores.\n\nLa plataforma reúne ese proceso en un solo lugar: la administración abre el periodo y la oferta de cursos, cada docente ve su saldo de horas frente a la meta, el tutor califica, y la constancia se genera sola al aprobar. Los reportes de cumplimiento salen de los mismos datos, sin hojas de cálculo intermedias.",
    descripcion: "Se construyó la aplicación completa a partir del prototipo aprobado (gestion_docente_v2): una SPA en Angular con tres vistas según el rol —administrador, tutor y docente— y una API REST en NestJS, con ingreso exclusivo mediante la cuenta institucional de Microsoft.",
    queSeHizo: [
      "Ingreso con la cuenta de Microsoft de la universidad (Entra ID); las cuentas de estudiante se bloquean consultando su cargo en Microsoft Graph.",
      "Primer ingreso guiado del docente: elige su tipo de vinculación, su unidad académica o administrativa y registra su correo personal.",
      "Periodos con rangos de horas mínimas y máximas por tipo de vinculación; solo uno puede estar activo a la vez.",
      "Oferta de cursos con tutor, bloques horarios, modalidad virtual o presencial, fechas de oferta y aprobación por nota o por asistencia.",
      "Catálogo e inscripción del docente con validación de cruces de horario y un medidor de su saldo de horas frente a la meta.",
      "Calificación por parte del tutor y constancia generada automáticamente al aprobar, descargable en PDF con código de verificación.",
      "Encuesta de percepción con banco de preguntas administrable; responderla habilita la descarga de la constancia.",
      "Dashboard de cumplimiento, trazabilidad de inscripciones y exportación de reportes a Excel.",
      "Catálogo de 63 facultades y unidades, con importación desde plantilla de Excel.",
      "Despliegue automático del frontend y del backend al servidor cPanel mediante GitHub Actions."
    ],
    identidad: { tema: "docente", color: "#ffe000", numero: "08", etiqueta: "Formación permanente" },
    capas: [
      { rol: "Cliente", nombre: "Angular 21", detalle: "SPA con MSAL · formacion-frontend", logos: ["assets/img/tecnologias/angular.svg", "assets/img/tecnologias/typescript.svg"] },
      { rol: "API REST", nombre: "NestJS 11", detalle: "11 módulos · 70 endpoints · formacio-back", logos: ["assets/img/tecnologias/nestjs.svg", "assets/img/tecnologias/typeorm.svg"] },
      { rol: "Datos", nombre: "MariaDB", detalle: "TypeORM · 11 entidades", logos: ["assets/img/tecnologias/mariadb.svg"] }
    ],
    teoria: {
      arquitectura: "Arquitectura cliente-servidor con dos aplicaciones independientes. El frontend es una SPA en Angular con componentes standalone, rutas cargadas bajo demanda y signals; el backend es una API REST en NestJS que actúa como servidor de recursos: no maneja contraseñas ni inicios de sesión, solo valida los tokens que Microsoft emite para la aplicación. MariaDB guarda los datos a través de TypeORM.",
      organizacion: "El backend tiene un módulo por dominio (auth, admins, docentes, tutores, facultades, periodos, cursos, inscripciones, constancias, encuestas y reportes), cada uno con su controlador, servicio, DTOs y entidades; los enums compartidos viven en src/common y los scripts de migraciones y datos semilla en src/scripts. El frontend separa core (autenticación, guards, interceptor de errores, servicios y modelos), features por rol (admin, tutor, docente, perfil y verificación) y shared/ui, la librería de componentes propia: riel de navegación, tarjeta de curso, medidor de horas, insignias, modales y notificaciones. Los tokens de diseño se definen en un único archivo, _tokens.scss.",
      flujoPeticion: "Cuando un docente se inscribe en un curso, MSAL obtiene un token de acceso de Microsoft y se adjunta como Bearer en la petición. En el backend, la estrategia JWT valida la firma RS256 con las claves públicas del tenant, el emisor y la audiencia; luego busca al usuario por su identificador de Entra (oid) y el RolesGuard confirma que tenga el rol docente. El ValidationPipe rechaza campos no declarados. El servicio comprueba que el curso esté activo, que no lo dicte él mismo, que no esté ya inscrito, que no se cruce con el horario de otros cursos, que exista un periodo activo y que el docente tenga tipo de vinculación; entonces guarda la inscripción ligada al periodo vigente.",
      autenticacion: "Microsoft Entra ID es la única fuente de identidad. El administrador puede crear cuentas de antemano por correo; en el primer ingreso se enlazan con el oid de Microsoft. Si alguien de la organización entra sin cuenta, el sistema consulta su cargo en Microsoft Graph con su propio token: si es estudiante se rechaza y, si no, se registra como docente. Los roles son una lista —una persona puede ser docente y tutor a la vez— y el frontend le permite cambiar de vista sin volver a iniciar sesión.",
      manejoErrores: "Un ValidationPipe global con whitelist y forbidNonWhitelisted rechaza datos inválidos o inesperados. Los errores de negocio se devuelven con las excepciones HTTP de NestJS y mensajes en español; los de acceso llevan códigos propios (CUENTA_NO_REGISTRADA, PERFIL_INCOMPLETO, ES_ESTUDIANTE) que el frontend convierte en una pantalla de acceso denegado con la explicación. En el cliente, un interceptor centraliza los errores HTTP y los muestra como notificaciones.",
      documentacionApi: ""
    },
    modulos: [
      { nombre: "auth", responsabilidad: "Sesión actual, autorregistro desde Microsoft, primer ingreso del docente y edición del perfil propio.", entidades: "Usuario", endpoints: "GET /auth/me · POST /auth/registrar-docente · PATCH /auth/me/tipo-vinculacion · /me/perfil" },
      { nombre: "admins", responsabilidad: "Administradores y asignación o retiro de roles.", entidades: "Usuario", endpoints: "CRUD /admins · PATCH /:id/quitar-rol · /hacer-docente · /hacer-tutor" },
      { nombre: "docentes", responsabilidad: "Gestión de docentes y conversión a tutor o administrador.", entidades: "Usuario", endpoints: "CRUD /docentes · PATCH /:id/hacer-tutor · /hacer-admin" },
      { nombre: "tutores", responsabilidad: "Gestión de tutores y conversión a docente o administrador.", entidades: "Usuario", endpoints: "CRUD /tutores · PATCH /:id/hacer-docente · /hacer-admin" },
      { nombre: "facultades", responsabilidad: "Catálogo de unidades académicas y administrativas, con plantilla e importación desde Excel.", entidades: "Facultad", endpoints: "CRUD /facultades · GET /plantilla · POST /importar" },
      { nombre: "periodos", responsabilidad: "Periodos de formación, rangos de horas por vinculación y activación de un único periodo.", entidades: "Periodo, RangoHoras", endpoints: "CRUD /periodos · GET /activo · PATCH /:id/activar" },
      { nombre: "cursos", responsabilidad: "Oferta de cursos con bloques horarios; catálogo del docente y cursos propios del tutor.", entidades: "Curso, BloqueHorario", endpoints: "CRUD /cursos · GET /catalogo · /mis-cursos · PATCH /:id/cancelar · /reactivar" },
      { nombre: "inscripciones", responsabilidad: "Inscripción, retiro, saldo de horas, calificación por el tutor y trazabilidad.", entidades: "Inscripcion", endpoints: "POST /inscripciones · GET /mi-resumen-horas · /por-curso/:id · PATCH /:id/calificar · GET /trazabilidad" },
      { nombre: "constancias", responsabilidad: "Constancias del docente y generación del PDF.", entidades: "Constancia", endpoints: "GET /constancias/mis-constancias · /:id/pdf" },
      { nombre: "encuestas", responsabilidad: "Banco de preguntas, respuesta del docente y resultados por curso y generales.", entidades: "CategoriaEncuesta, PreguntaEncuesta, RespuestaEncuesta", endpoints: "CRUD /encuestas/preguntas · POST /responder/:id · GET /resultados/:cursoId" },
      { nombre: "reportes", responsabilidad: "Dashboard de cumplimiento y exportación a Excel.", entidades: "—", endpoints: "GET /reportes/dashboard · /exportar-excel" }
    ],
    modeloDatos: {
      motor: "MariaDB 11",
      orm: "TypeORM 1.1 (driver mysql2)",
      migraciones: "Migración inicial en src/migrations; synchronize desactivado: el esquema solo cambia con migraciones",
      seeds: "Administrador inicial, 63 facultades y unidades, y las preguntas oficiales de la encuesta; son idempotentes y corren en cada despliegue",
      entidades: [
        { nombre: "Usuario", campos: "nombre, correo institucional, oid de Entra, roles (lista), estado, documento, correo personal, tipo de vinculación", relaciones: "N:1 Facultad" },
        { nombre: "Facultad", campos: "nombre, categoría (facultad, posgrado, doctorado, dirección académica, división, dirección, centro de servicio, secretaría)", relaciones: "1:N Usuario" },
        { nombre: "Periodo", campos: "nombre, fecha de inicio y fin, controla horas, activo", relaciones: "1:N RangoHoras" },
        { nombre: "RangoHoras", campos: "tipo de vinculación, horas mínimas, horas máximas", relaciones: "N:1 Periodo (único por vinculación)" },
        { nombre: "Curso", campos: "nombre, descripción, duración en horas, tipo de aprobación, estado, fechas de oferta, modalidad, enlace o ubicación, permite retiro", relaciones: "N:1 Usuario (tutor) · 1:N BloqueHorario" },
        { nombre: "BloqueHorario", campos: "días de la semana, hora de inicio, hora de fin", relaciones: "N:1 Curso" },
        { nombre: "Inscripcion", campos: "estado, nota, observaciones, encuesta respondida, fecha de inscripción y de calificación", relaciones: "N:1 Usuario (docente) · N:1 Curso · N:1 Periodo" },
        { nombre: "Constancia", campos: "código de verificación, fecha de emisión, archivo", relaciones: "1:1 Inscripcion" },
        { nombre: "CategoriaEncuesta", campos: "nombre, orden", relaciones: "1:N PreguntaEncuesta" },
        { nombre: "PreguntaEncuesta", campos: "texto, tipo (Likert de 1 a 5 o abierta), activa", relaciones: "N:1 CategoriaEncuesta" },
        { nombre: "RespuestaEncuesta", campos: "valor Likert, texto de respuesta", relaciones: "N:1 Inscripcion · N:1 PreguntaEncuesta" }
      ]
    },
    tecnologias: [
      { nombre: "Angular", version: "21.2", uso: "SPA con componentes standalone y signals", categoria: "frontend", logo: "assets/img/tecnologias/angular.svg", destacada: true },
      { nombre: "TypeScript", version: "5.9", uso: "", categoria: "frontend", logo: "assets/img/tecnologias/typescript.svg", destacada: true },
      { nombre: "MSAL Angular", version: "6.2", uso: "Inicio de sesión con Microsoft", categoria: "frontend", logo: "assets/img/tecnologias/microsoft.svg" },
      { nombre: "Lordicon", version: "4.1", uso: "Iconos animados de las notificaciones", categoria: "frontend" },
      { nombre: "SCSS", version: "", uso: "Tokens de diseño del prototipo aprobado", categoria: "frontend", logo: "assets/img/tecnologias/sass.svg" },
      { nombre: "NestJS", version: "11", uso: "", categoria: "backend", logo: "assets/img/tecnologias/nestjs.svg", destacada: true },
      { nombre: "TypeORM", version: "1.1", uso: "", categoria: "backend", logo: "assets/img/tecnologias/typeorm.svg" },
      { nombre: "Passport JWT", version: "4.0", uso: "Validación de tokens de Entra ID", categoria: "backend", logo: "assets/img/tecnologias/passport.svg" },
      { nombre: "jwks-rsa", version: "3.1", uso: "Claves públicas del tenant", categoria: "backend" },
      { nombre: "Microsoft Entra ID", version: "", uso: "Identidad institucional", categoria: "backend", logo: "assets/img/tecnologias/microsoft.svg", destacada: true },
      { nombre: "class-validator", version: "0.15", uso: "Validación de DTOs", categoria: "backend" },
      { nombre: "PDFKit", version: "0.20", uso: "Constancias en PDF", categoria: "backend" },
      { nombre: "ExcelJS", version: "4.4", uso: "Reportes e importación de facultades", categoria: "backend", logo: "assets/img/tecnologias/excel.svg" },
      { nombre: "MariaDB", version: "11", uso: "", categoria: "bd", logo: "assets/img/tecnologias/mariadb.svg", destacada: true },
      { nombre: "mysql2", version: "3.23", uso: "", categoria: "bd", logo: "assets/img/tecnologias/mysql.svg" },
      { nombre: "GitHub Actions", version: "", uso: "", categoria: "devops", logo: "assets/img/tecnologias/githubactions.svg", destacada: true },
      { nombre: "cPanel", version: "", uso: "", categoria: "devops", logo: "assets/img/tecnologias/cpanel.svg" },
      { nombre: "PM2", version: "", uso: "", categoria: "devops", logo: "assets/img/tecnologias/pm2.svg" },
      { nombre: "Docker Compose", version: "", uso: "MariaDB en local", categoria: "devops", logo: "assets/img/tecnologias/docker.svg" },
      { nombre: "Vitest", version: "4", uso: "Pruebas del frontend", categoria: "herramienta", logo: "assets/img/tecnologias/vitest.svg" },
      { nombre: "Jest", version: "30", uso: "", categoria: "herramienta", logo: "assets/img/tecnologias/jest.svg" },
      { nombre: "ESLint", version: "9", uso: "", categoria: "herramienta", logo: "assets/img/tecnologias/eslint.svg" },
      { nombre: "Prettier", version: "3", uso: "", categoria: "herramienta", logo: "assets/img/tecnologias/prettier.svg" },
      { nombre: "pnpm", version: "11", uso: "", categoria: "herramienta", logo: "assets/img/tecnologias/pnpm.svg" }
    ],
    herramientas: {
      convencionCommits: "",
      estrategiaRamas: "master guarda el código fuente. Al integrar en la rama de salida —deploy en el frontend y feature/deploy en el backend— GitHub Actions compila y publica el resultado en cpanel-dist, una rama generada automáticamente que cPanel clona y despliega.",
      actions: [
        { nombre: "Build CPanel (frontend)", disparador: "push a deploy", jobs: "build", automatiza: "Compila la SPA, genera el .htaccess para las rutas de Angular y publica el resultado en cpanel-dist; cPanel lo copia con rsync a public_html/GestionDocente/browser/." },
        { nombre: "Build CPanel (backend)", disparador: "push a feature/deploy", jobs: "build", automatiza: "Compila con nest build, empaqueta los scripts de migraciones y semillas junto con deploy.sh y publica todo en cpanel-dist." }
      ],
      otras: ["Docker Compose", "ESLint", "Prettier", "Vitest"]
    },
    gestionAgil: { historiasUsuario: null, sprints: null },
    despliegue: {
      plataforma: "cPanel",
      evidencia: ".github/workflows/build-cpanel.yml · deploy/cpanel-deploy.sh",
      pm2: { proceso: "api-GestionDocente", script: "main.js", modo: "", instancias: "", logs: "" },
      servidorWeb: "Frontend: public_html/GestionDocente/browser/ · API: /home/delegados/BackendGestionDocente/",
      comandoBuild: "pnpm build",
      comandoStart: "node scripts/run-migrations.js && node scripts/seed-admin.js && node scripts/seed-facultades.js && node scripts/seed-encuesta.js && pm2 restart api-GestionDocente --update-env",
      variablesEntorno: ["PORT", "FRONTEND_URL", "DB_HOST", "DB_PORT", "DB_USER", "DB_PASSWORD", "DB_NAME", "TENANT_ID", "API_CLIENT_ID", "API_APPLICATION_ID_URI", "ADMIN_EMAIL", "ADMIN_NOMBRE"],
      puerto: "",
      cors: "Solo FRONTEND_URL"
    },
    calidad: {
      pruebas: "El frontend tiene 50 archivos de pruebas con Vitest, que cubren los componentes compartidos, las páginas de cada rol, los guards, el interceptor de errores y la validación de inscripción.",
      rendimiento: [
        "Cada pantalla se carga bajo demanda (loadComponent), así que el navegador solo descarga lo que corresponde al rol que entra.",
        "El backend se compila en GitHub Actions; en el servidor solo se instalan las dependencias de producción con el lockfile."
      ],
      accesibilidad: [""],
      seguridad: [
        "Sin contraseñas propias: solo se aceptan tokens RS256 emitidos por el tenant de la universidad para esta aplicación.",
        "Las cuentas de estudiante se rechazan al consultar su cargo en Microsoft Graph; si el cargo no se puede verificar, también se rechaza.",
        "Cada ruta exige su rol en el backend; la vista que muestra el frontend es solo navegación.",
        "El ValidationPipe descarta los datos que no están declarados en el DTO.",
        "CORS restringido al dominio del frontend.",
        "El despliegue se detiene si una migración falla, y la versión anterior de la API sigue en servicio."
      ]
    },
    hitos: [
      { fecha: "2026-08-28", descripcion: "Primer commit del frontend a partir del prototipo aprobado." },
      { fecha: "2026-09-22", descripcion: "Ajustes solicitados, fuentes institucionales, componentes unificados e inicio de sesión con la organización de la universidad; se publica el backend." },
      { fecha: "2026-09-23", descripcion: "Bloqueo del ingreso de estudiantes." },
      { fecha: "2026-09-25", descripcion: "Despliegue automático del frontend y del backend en cPanel." },
      { fecha: "2026-10-01", descripcion: "Unidades filtradas según el tipo de vinculación; migraciones y datos semilla automáticos en cada despliegue." }
    ],
    repositorios: [
      { nombre: "formacion-frontend", url: "https://github.com/WldySandoval1/formacion-frontend", commits: 8, primerCommit: "2026-08-28", ultimoCommit: "2026-10-01" },
      { nombre: "formacio-back", url: "https://github.com/WldySandoval1/formacio-back", commits: 10, primerCommit: "2026-09-22", ultimoCommit: "2026-10-01" }
    ],
    urlProduccion: "https://gestiondocente.santototunja.edu.co/",
    capturas: [{ src: "", alt: "", pie: "" }],
    pendientes: [
      "Exponer la verificación pública de constancias por código: el servicio y la pantalla existen, pero falta la ruta en la API y en el frontend."
    ],
    extras: {
      // Apertura breve de la ficha. [[texto]] se resalta con el degradado de la marca;
      // el texto largo (descripcion, queSeHizo, proposito) queda en "Leer el detalle completo".
      // POR CONFIRMAR: la frase resume el propósito redactado a partir del código.
      resumen: {
        declaracion: "Cada periodo, cada docente tiene una [[meta de horas]] de formación. Cumplirla implica cursos, horarios, notas, encuestas y certificados. Gestión Docente lo reúne en [[una sola plataforma]].",
        destacados: [
          { icono: "Ingreso", titulo: "Ingreso con Microsoft", texto: "Solo cuentas de la universidad. Las de estudiante se bloquean.", ancho: 2 },
          { icono: "Periodos y horas", titulo: "Periodos y metas", texto: "Rangos de horas por tipo de vinculación." },
          { icono: "Cursos", titulo: "Oferta de cursos", texto: "Tutor, horarios, modalidad y forma de aprobar." },
          { icono: "Saldo", titulo: "Inscripción con saldo de horas", texto: "Valida los cruces de horario y muestra el avance frente a la meta.", ancho: 2, medidor: true },
          { icono: "Mis calificaciones", titulo: "Constancia automática", texto: "PDF con código de verificación al aprobar." },
          { icono: "Reportes", titulo: "Encuesta y reportes", texto: "Percepción de cada curso, cumplimiento y exportación a Excel.", ancho: 2 }
        ]
      },
      // Síntesis de la sección Arquitectura; el texto completo (teoria) queda en "Leer el detalle completo".
      arquitecturaBreve: {
        peticion: {
          titulo: "Recorrido de una petición",
          ejemplo: "Ejemplo: un docente se inscribe en un curso.",
          pasos: [
            { nombre: "Angular + MSAL", detalle: "Pide el token a Microsoft" },
            { nombre: "Bearer", detalle: "Viaja en la cabecera de la petición" },
            { nombre: "JWT RS256", detalle: "Firma, emisor y audiencia del tenant" },
            { nombre: "Usuario", detalle: "Se busca por su oid de Entra" },
            { nombre: "RolesGuard", detalle: "Confirma el rol docente" },
            { nombre: "ValidationPipe", detalle: "Descarta campos no declarados" },
            { nombre: "Servicio", detalle: "Curso activo, cruces, periodo y vinculación" },
            { nombre: "MariaDB", detalle: "Guarda la inscripción" }
          ]
        },
        tarjetas: [
          { icono: "Capas", rotulo: "Patrón", titulo: "Cliente-servidor", texto: "SPA en Angular y API REST en NestJS. La API solo valida tokens de Microsoft: no guarda contraseñas." },
          { icono: "Carpetas", rotulo: "Organización", titulo: "Un módulo por dominio", texto: "El backend se divide por dominio y el frontend por rol, con una librería de componentes propia." },
          { icono: "Ingreso", rotulo: "Autenticación", titulo: "Microsoft como única identidad", texto: "Las cuentas se enlazan en el primer ingreso, los estudiantes se bloquean y una persona puede tener varios roles." },
          { icono: "Alerta", rotulo: "Errores", titulo: "Validación estricta", texto: "Se rechaza lo no declarado; los mensajes van en español y los de acceso abren una pantalla que explica el motivo." }
        ]
      },
      // Navegación real por rol (src/app/shared/ui/app-shell/app-shell.component.ts).
      gruposModulos: [
        { titulo: "Administrador", descripcion: "Configura periodos, cursos, unidades y usuarios, y audita el cumplimiento de todos.", items: ["Dashboard", "Usuarios", "Facultades", "Cursos", "Periodos y horas", "Encuesta", "Trazabilidad", "Mi perfil"] },
        { titulo: "Tutor", descripcion: "Dicta sus cursos, califica a los inscritos y consulta su propia trazabilidad.", items: ["Mis cursos", "Trazabilidad", "Mi perfil"] },
        { titulo: "Docente", descripcion: "Se inscribe, sigue su saldo de horas, responde la encuesta y descarga sus constancias.", items: ["Mi panel", "Catálogo de cursos", "Mis cursos", "Mis calificaciones", "Mi perfil"] }
      ],
      notaRoles: "Menú real de cada vista. Una misma cuenta puede tener varios roles y cambiar de vista sin cerrar sesión.",
      roles: ["admin", "tutor", "docente"],
      // Cifras de la franja "En cifras" (se animan al entrar en pantalla).
      cifras: [
        { valor: 70, texto: "endpoints en la API" },
        { valor: 11, texto: "módulos de dominio" },
        { valor: 11, texto: "entidades en la base de datos" },
        { valor: 63, texto: "unidades académicas y administrativas" }
      ],
      // Recorrido de un curso de punta a punta; rol: admin | tutor | docente.
      recorrido: [
        { rol: "admin", titulo: "Abre el periodo", detalle: "Define las fechas y el rango de horas mínimas y máximas para cada tipo de vinculación. Solo un periodo puede estar activo." },
        { rol: "admin", titulo: "Publica la oferta", detalle: "Crea el curso con su tutor, duración, bloques horarios, modalidad y tipo de aprobación." },
        { rol: "docente", titulo: "Completa su perfil", detalle: "En el primer ingreso con Microsoft elige su vinculación y su unidad; las unidades se filtran según la vinculación." },
        { rol: "docente", titulo: "Se inscribe", detalle: "El catálogo advierte los cruces de horario y muestra cómo cambia su saldo frente a la meta del periodo." },
        { rol: "tutor", titulo: "Califica", detalle: "Registra la nota o la asistencia de cada inscrito, según el tipo de aprobación del curso." },
        { rol: "docente", titulo: "Responde la encuesta", detalle: "Evalúa al tutor, los contenidos, el material y su propia participación." },
        { rol: "docente", titulo: "Descarga la constancia", detalle: "El PDF se genera al aprobar, con un código de verificación único." }
      ],
      reglas: [
        { titulo: "La meta no es un tope", detalle: "El docente puede inscribirse por encima del máximo de horas; la interfaz se lo advierte, pero no se lo impide." },
        { titulo: "Cruce de horarios", detalle: "Dos cursos se cruzan si comparten un día y sus horas se solapan, aunque sus bloques estén escritos de forma distinta." },
        { titulo: "La cátedra no tiene meta", detalle: "Solo tiempo completo y medio tiempo exigen rangos de horas; cátedra y administrativo participan sin meta." },
        { titulo: "La historia no se borra", detalle: "Un curso o un periodo con inscripciones no se elimina: se cancela o se desactiva y su historial se conserva." },
        { titulo: "La constancia es única", detalle: "Calificar varias veces como aprobado no duplica la constancia." },
        { titulo: "Un rol no excluye a otro", detalle: "Un docente que también dicta cursos tiene los dos roles y cambia de vista sin cerrar sesión." }
      ]
    }
  }
];
