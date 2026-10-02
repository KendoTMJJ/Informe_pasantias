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
    queSeHizo: [""],
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
    periodo: { inicio: "2026-09-22", fin: "" },
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
    subtitulo: "Reserva y gestión de laboratorios de la seccional",
    estado: "",
    solicitante: "",
    periodo: { inicio: "", fin: "" },
    horasAproximadas: null,
    proposito: "",
    descripcion: "",
    queSeHizo: [""],
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
    queSeHizo: [""],
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
    queSeHizo: [""],
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
