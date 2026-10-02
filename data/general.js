/*
 * data/general.js — Datos generales del informe.
 * Se carga con <script> (no con fetch) para que el sitio funcione también
 * abriendo los archivos directamente desde el disco (file://).
 *
 * Reglas de edición:
 *  - Las fechas van en formato ISO: "AAAA-MM-DD".
 *  - Las rutas a imágenes son relativas a la raíz del sitio y NUNCA empiezan
 *    por "/" (ej.: "assets/img/escudo.png").
 *  - Un campo vacío ("" o []) simplemente no se muestra en el sitio.
 */
window.GENERAL = {
  tituloInforme: "Informe final de pasantía",
  subtituloInforme:
    "Desarrollo de software para la Dirección de Comunicaciones",

  institucion: "Universidad Santo Tomás",
  seccional: "Tunja",
  dependencia: "Dirección de Comunicaciones",
  programaAcademico: "Ingeniería de Sistemas",
  anio: 2026,

  // Ruta relativa a la raíz. Vacía = se muestra el marcador provisional.
  escudo: "",

  pasantes: [
    { nombre: "Julián Tobito", correo: "jose.tobito@usantoto.edu.co" },
    { nombre: "Wldy Sandoval", correo: "wldy.sandoval@usantoto.edu.co" },
  ],

  // Director de la dependencia donde se hizo la pasantía.
  director: "Iván Darío Gonzales Rubio",

  tutores: {
    empresarial: "William Fernando Abril Avella",
    academico: "Héctor Mauricio Bravo Cepeda",
  },

  periodo: {
    inicio: "2026-06-01",
    fin: "2 de octubre de 2026",
    texto: "1 de junio – 2 de octubre de 2026",
  },

  indicadores: {
    micrositiosIntervenidos: "20+", // mínimo conocido; fueron más, sin recuento exacto
  },

  // Cada elemento es un párrafo.
  resumenEjecutivo: [
    "Este informe documenta la pasantía de desarrollo de software realizada por Julián Tobito y Wldy Sandoval en la Dirección de Comunicaciones de la Universidad Santo Tomás, seccional Tunja, entre el 1 de junio y el 2 de octubre de 2026, con una intensidad de 640 horas cumplidas en su totalidad.",
    "El trabajo se organizó en ocho frentes: la intervención de los micrositios institucionales de más de veinte programas académicos; la landing de CAMINA-Living-Lab; dos rallies sobre una misma base de código —el Pasaporte Neotomasino, rally de bienvenida para estudiantes nuevos, y el Rally Living Lab, festival del mapa de soluciones de CAMINA—; ReservaLab, un sistema de reserva de laboratorios planificado en 31 historias de usuario distribuidas en nueve sprints; la Plataforma de Nómina, con un dashboard de estadísticas y la pre-nómina de talento humano; las mesas de ayuda creadas en la universidad; y Gestión Docente, la plataforma de formación permanente que lleva el control de cursos, horas y constancias del cuerpo docente.",
    "Para cada frente, el informe presenta el propósito, la arquitectura, el modelo de datos, las tecnologías, el control de versiones y el esquema de alojamiento y despliegue. Se complementa con el marco metodológico común a todos los desarrollos, el cronograma de dedicación horaria y las conclusiones del proceso.",
  ],

  // Contenido de conclusiones.html. Las secciones vacías no se muestran.
  cierre: {
    resultados: [""], // párrafos adicionales a los resultados calculados
    aportes: [""], // aportes concretos a la dependencia
    dificultades: [{ dificultad: "", solucion: "" }],
    conclusiones: [""],
    recomendaciones: [""],
    anexos: [{ titulo: "", url: "", descripcion: "" }],
  },
};
