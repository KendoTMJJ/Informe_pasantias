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
    descripcion: "Se construyó la plataforma web completa de CAMINA Living Lab: una landing pública, un panel administrativo y la API que los conecta, desplegados en el servidor cPanel de la universidad con publicación automática desde GitHub.",
    queSeHizo: [
      "Landing pública con las secciones de inicio, nosotros, metodología, servicios, retos, noticias, aliados y contacto.",
      "Galería de retos y página de detalle de cada reto, con su bitácora por etapa de la ruta CAMINA, galería de imágenes y la experiencia publicada.",
      "Páginas públicas de servicios y de aliados.",
      "Panel administrativo para gestionar retos, tipos de reto, aliados, servicios, noticias y usuarios, con inicio de sesión y recuperación de contraseña por correo.",
      "Historial de las respuestas de los formularios de contacto, con exportación a Excel.",
      "API REST de 9 módulos y 50 endpoints, documentada en Swagger.",
      "Base de datos MariaDB con 11 entidades y migraciones versionadas.",
      "Despliegue automático del frontend y del backend al servidor cPanel mediante GitHub Actions."
    ],
    identidad: { tema: "camina", color: "#2c56fc", numero: "02", etiqueta: "Living Lab" },
    capas: [
      { rol: "Landing y panel", nombre: "React 19 + Vite 8", detalle: "SPA en TypeScript · camina-front" },
      { rol: "API REST", nombre: "NestJS 11", detalle: "9 módulos · 50 endpoints · camina-back" },
      { rol: "Datos", nombre: "MariaDB", detalle: "TypeORM · 11 entidades · 7 migraciones" }
    ],
    teoria: {
      arquitectura: "Arquitectura cliente-servidor con dos aplicaciones independientes. El frontend es una SPA en React que sirve tanto la landing pública como el panel administrativo; el backend es una API REST en NestJS organizada en capas —controladores, servicios y entidades de TypeORM— que es la única que accede a la base de datos MariaDB.",
      organizacion: "El backend tiene un módulo por dominio (auth, user, challenges, challenge-types, partners, services, news, submissions y uploads), cada uno con su controlador, servicio, DTOs y entidades; la configuración transversal (conexión, correo, Swagger, seed) vive en src/config. El frontend separa páginas públicas y de administración (src/pages), componentes, servicios HTTP por recurso (src/services), contexto de autenticación y notificaciones (src/context) y layouts para la parte pública y el panel.",
      flujoPeticion: "Cuando un administrador guarda un reto, la SPA envía la petición con Axios incluyendo la cookie de sesión (withCredentials). En el backend la petición pasa por helmet y CORS (solo se acepta el origen del frontend), luego por tres guardas globales en orden: límite de peticiones por cuenta, validación del JWT leído desde la cookie y verificación del rol. El ValidationPipe descarta los campos no declarados en el DTO y valida el resto; el controlador delega en el servicio, que persiste con TypeORM en MariaDB y devuelve la entidad en JSON.",
      autenticacion: "El panel usa JWT guardado en una cookie httpOnly con sameSite=strict y vigencia de 8 horas, de modo que el token no es accesible desde JavaScript. Las contraseñas se almacenan con bcrypt. Hay dos roles, SUPER_ADMIN y EDITOR, aplicados con un decorador @Roles sobre cada endpoint; las rutas públicas se marcan con @Public. El inicio de sesión y la recuperación de contraseña admiten 5 intentos por hora, y la recuperación usa un token de un solo uso, guardado como hash y con fecha de expiración.",
      manejoErrores: "Un ValidationPipe global con whitelist rechaza datos inválidos, y una fábrica de excepciones propia traduce al español los mensajes de class-validator con etiquetas legibles para cada campo. Los parámetros :id se validan con ParseUUIDPipe y los errores de dominio se devuelven con las excepciones HTTP de NestJS (400, 401, 403, 404).",
      documentacionApi: "Swagger en /api/docs, con los endpoints agrupados en 9 etiquetas y autenticación por cookie declarada. Los DTOs se documentan a mano con @ApiProperty: el plugin de inferencia automática de @nestjs/swagger se descartó porque generaba un require roto en el build de producción."
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
      orm: "TypeORM 1.0 (driver mysql2)",
      migraciones: "7 migraciones en src/migrations; synchronize desactivado en producción",
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
      estrategiaRamas: "Cada cambio nace en una rama feature/* desde develop y vuelve a develop por pull request. Cuando se decide liberar, develop se integra en deploy, lo que dispara la compilación en GitHub Actions; el resultado se publica en cpanel-dist, una rama generada automáticamente que nunca se edita a mano. main se actualiza con los merges de deploy como referencia histórica de lo que está en producción. El mismo esquema se aplica en los dos repositorios.",
      actions: [
        { nombre: "Build CPanel (frontend)", disparador: "push a deploy", jobs: "build", automatiza: "Instala dependencias, compila la SPA y publica el dist con su .cpanel.yml en cpanel-dist; cPanel lo copia con rsync a public_html/CaminaLivingLab/." },
        { nombre: "Build CPanel (backend)", disparador: "push a deploy", jobs: "build", automatiza: "Compila con nest build, deja solo dependencias de producción y empaqueta todo en cpanel-dist; en el servidor se ejecutan las migraciones y se reinicia el proceso PM2." }
      ],
      otras: ["Swagger", "ESLint", "Prettier", "Jest", "Docker Compose"]
    },
    gestionAgil: { historiasUsuario: null, sprints: null },
    despliegue: {
      plataforma: "cPanel",
      evidencia: ".github/workflows/build-cpanel.yml · deploy/cpanel-deploy.sh · DEPLOY.md",
      pm2: { proceso: "api-LivingLab", script: "main.js", modo: "", instancias: "", logs: "" },
      servidorWeb: "Frontend: public_html/CaminaLivingLab/ · API: /home/delegados/BackendLivingLab/",
      comandoBuild: "pnpm build",
      comandoStart: "node node_modules/typeorm/cli.js -d config/conection/data-source.js migration:run && pm2 restart api-LivingLab --update-env",
      variablesEntorno: ["DB_HOST", "DB_PORT", "DB_USER", "DB_PASSWORD", "DB_NAME", "NODE_ENV", "PORT", "FRONTEND_URL", "JWT_SECRET", "MAIL_HOST", "MAIL_PORT", "MAIL_USER", "MAIL_PASS", "MAIL_FROM", "SEED_ADMIN_NAME", "SEED_ADMIN_EMAIL", "SEED_ADMIN_PASSWORD", "VITE_API_URL"],
      puerto: "",
      cors: "Solo FRONTEND_URL · GET, POST, PATCH, DELETE · con credenciales"
    },
    calidad: {
      pruebas: "9 suites de pruebas unitarias con Jest sobre los servicios (autenticación, tokens de recuperación, usuarios, retos, tipos de reto, aliados, servicios, noticias y subida de archivos), más una prueba de extremo a extremo. Se ejecutan con pnpm test y pnpm test:cov.",
      rendimiento: [
        "Todo el build, incluidas las dependencias de producción, se genera en GitHub Actions: el servidor solo recibe el resultado, sin instalar nada."
      ],
      accesibilidad: [""],
      seguridad: [
        "Sesión en cookie httpOnly y sameSite=strict, inaccesible desde JavaScript.",
        "Límite de 5 intentos por hora en el inicio de sesión y en la recuperación de contraseña, y de 30 peticiones por minuto en general.",
        "Las imágenes subidas se validan por su firma real y no solo por el tipo declarado, lo que evita archivos disfrazados; los SVG se sanitizan.",
        "El HTML de los formularios se escapa antes de enviarse por correo.",
        "CORS restringido al dominio del frontend y cabeceras de seguridad con helmet.",
        "synchronize desactivado en producción: el esquema solo cambia mediante migraciones."
      ]
    },
    hitos: [
      { fecha: "2026-06-17", descripcion: "Inicio del backend: primer commit y estructura de módulos." },
      { fecha: "2026-06-24", descripcion: "Primera versión pública de la landing: banner, nosotros y metodología, publicada en GitHub Pages." },
      { fecha: "2026-07-09", descripcion: "Pruebas unitarias de los servicios y endurecimiento de seguridad en la subida de archivos y los formularios." },
      { fecha: "2026-09-21", descripcion: "Migración a MariaDB, unificación de casos en retos, noticias y formularios; el frontend pasa de GitHub Pages a cPanel." },
      { fecha: "2026-09-22", descripcion: "Despliegue automático del backend en cPanel con PM2 (api-LivingLab)." },
      { fecha: "2026-09-24", descripcion: "Galería de imágenes de los retos y migraciones ejecutadas en el servidor durante el despliegue." },
      { fecha: "2026-10-01", descripcion: "Documentación del flujo de ramas y de la API en los dos repositorios." }
    ],
    repositorios: [
      { nombre: "CAMINA-Living-Lab-front", url: "https://github.com/Santoto-Web/CAMINA-Living-Lab-front", commits: 78, primerCommit: "2026-06-19", ultimoCommit: "2026-10-01" },
      { nombre: "CAMINA-Living-Lab-back", url: "https://github.com/Santoto-Web/CAMINA-Living-Lab-back", commits: 52, primerCommit: "2026-06-17", ultimoCommit: "2026-10-01" }
    ],
    urlProduccion: "",
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
    subtitulo: "Rally de bienvenida: los estudiantes nuevos recorren el campus, visitan dependencias y sellan su pasaporte.",
    estado: "",
    solicitante: "",
    periodo: { inicio: "2026-07-14", fin: "2026-07-31" },
    horasAproximadas: null,
    proposito: "",
    descripcion: "",
    queSeHizo: [""],
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
    queSeHizo: [""],
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
