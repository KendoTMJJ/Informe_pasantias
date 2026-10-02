/*
 * data/cronograma.js — Dedicación horaria de la pasantía.
 *
 * - "horas" y "acumulado" de cada mes son los totales reales registrados.
 * - Cada semana se muestra en la línea de tiempo solo si tiene horas, título
 *   o actividades. Los rangos ya están calculados (lunes a viernes); basta con
 *   completar horas, título y actividades.
 */
window.CRONOGRAMA = {
  metaHoras: 640,
  horasAcumuladas: 640,
  // Fecha en la que se completaron las horas.
  fechaCorte: "2026-10-02",
  inicio: "2026-06-01",
  // Plan de la propuesta de pasantía (Tabla 2): 4 meses de 4 semanas.
  // Mes 1 = junio … Mes 4 = septiembre. "proyecto" enlaza la fase con su ficha
  // y toma de ella el color; las semanas van de 1 a 16.
  plan: {
    meses: ["Junio", "Julio", "Agosto", "Septiembre"],
    fases: [
      { nombre: "CAMINA-LIVING-LAB", proyecto: "camina", actividades: [
        { nombre: "Levantamiento de requerimientos", semanas: [1] },
        { nombre: "Diseño de interfaces y módulo de gestión de contenidos", semanas: [2] },
        { nombre: "Desarrollo", semanas: [3] },
        { nombre: "Pruebas funcionales y despliegue", semanas: [4] }
      ] },
      { nombre: "SigueLab (reserva de laboratorios)", proyecto: "reservalab", actividades: [
        { nombre: "Levantamiento de requerimientos", semanas: [1, 2] },
        { nombre: "Diseño de arquitectura e interfaces", semanas: [3, 4] },
        { nombre: "Desarrollo (calendario, disponibilidad, trazabilidad y estadísticas)", semanas: [5, 6, 7, 8, 9, 10, 11, 12] },
        { nombre: "Pruebas funcionales", semanas: [13, 14, 15] },
        { nombre: "Despliegue, manual de uso y capacitación", semanas: [16] }
      ] },
      { nombre: "Rally neotomasino", proyecto: "rally-neotomasino", actividades: [
        { nombre: "Levantamiento de requerimientos y diseño del mapa interactivo", semanas: [5] },
        { nombre: "Desarrollo de los módulos de registro y seguimiento", semanas: [6, 7] },
        { nombre: "Pruebas funcionales y despliegue", semanas: [8] }
      ] },
      { nombre: "Mesas de ayuda", proyecto: "mesas-ayuda", actividades: [
        { nombre: "Levantamiento de requerimientos y diseño", semanas: [4, 5, 6] },
        { nombre: "Desarrollo del aplicativo", semanas: [7, 8, 9, 10] },
        { nombre: "Pruebas funcionales", semanas: [11] },
        { nombre: "Despliegue y capacitación", semanas: [12] }
      ] },
      { nombre: "Novedades de nómina", proyecto: "nomina-novedades", actividades: [
        { nombre: "Levantamiento de requerimientos y diseño", semanas: [9, 10] },
        { nombre: "Desarrollo del aplicativo", semanas: [11, 12] },
        { nombre: "Exposición y validación con la dependencia", semanas: [13, 14] },
        { nombre: "Pruebas funcionales y despliegue", semanas: [15, 16] }
      ] },
      { nombre: "Estadísticas de nómina", proyecto: "nomina-dashboard", actividades: [
        { nombre: "Levantamiento de requerimientos y diseño", semanas: [9, 10] },
        { nombre: "Desarrollo del módulo de estadísticas", semanas: [11, 12] },
        { nombre: "Exposición y validación con la dependencia", semanas: [13, 14] },
        { nombre: "Pruebas funcionales y despliegue", semanas: [15, 16] }
      ] },
      { nombre: "Gestión Docente", proyecto: "gestion-docente", actividades: [
        { nombre: "Levantamiento de requerimientos y diseño", semanas: [9, 10] },
        { nombre: "Desarrollo del aplicativo", semanas: [11, 12, 13] },
        { nombre: "Exposición y validación con la dependencia", semanas: [14] },
        { nombre: "Pruebas funcionales y despliegue", semanas: [15, 16] }
      ] },
      { nombre: "Mantenimiento de páginas web institucionales", proyecto: "micrositios", transversal: true, actividades: [
        { nombre: "Labor transversal durante todo el periodo", semanas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] }
      ] }
    ]
  },

  meses: [
    {
      mes: "Junio", anio: 2026, horas: 157.5, acumulado: 157.5,
      semanas: [
        { rango: "1–5 de junio", horas: 38.5, titulo: "", actividades: [""] },
        { rango: "8–12 de junio", horas: null, titulo: "", actividades: [""] },
        { rango: "15–19 de junio", horas: null, titulo: "", actividades: [""] },
        { rango: "22–26 de junio", horas: null, titulo: "", actividades: [""] },
        { rango: "29 de junio – 3 de julio", horas: null, titulo: "", actividades: [""] }
      ]
    },
    {
      mes: "Julio", anio: 2026, horas: 172.5, acumulado: 330,
      semanas: [
        { rango: "6–10 de julio", horas: null, titulo: "", actividades: [""] },
        { rango: "13–17 de julio", horas: null, titulo: "", actividades: [""] },
        { rango: "20–24 de julio", horas: null, titulo: "", actividades: [""] },
        { rango: "27–31 de julio", horas: null, titulo: "", actividades: [""] }
      ]
    },
    {
      mes: "Agosto", anio: 2026, horas: 138, acumulado: 468,
      semanas: [
        { rango: "3–7 de agosto", horas: null, titulo: "", actividades: [""] },
        { rango: "10–14 de agosto", horas: null, titulo: "", actividades: [""] },
        { rango: "17–21 de agosto", horas: null, titulo: "", actividades: [""] },
        { rango: "24–28 de agosto", horas: null, titulo: "", actividades: [""] },
        { rango: "31 de agosto – 4 de septiembre", horas: null, titulo: "", actividades: [""] }
      ]
    },
    {
      mes: "Septiembre", anio: 2026, horas: 157, acumulado: 625,
      semanas: [
        { rango: "7–11 de septiembre", horas: null, titulo: "", actividades: [""] },
        { rango: "14–18 de septiembre", horas: null, titulo: "", actividades: [""] },
        { rango: "21–25 de septiembre", horas: null, titulo: "", actividades: [""] },
        { rango: "28 de septiembre – 2 de octubre", horas: null, titulo: "", actividades: [""] }
      ]
    },
    {
      mes: "Octubre", anio: 2026, horas: 15, acumulado: 640,
      semanas: []
    }
  ]
};
