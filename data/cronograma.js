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
  inicio: "2026-06-01",
  meses: [
    {
      mes: "Junio",
      anio: 2026,
      horas: 157.5,
      acumulado: 157.5,
      semanas: [
        { rango: "1–5 de junio", horas: 38.5, titulo: "", actividades: [""] },
        { rango: "8–12 de junio", horas: null, titulo: "", actividades: [""] },
        { rango: "15–19 de junio", horas: null, titulo: "", actividades: [""] },
        { rango: "22–26 de junio", horas: null, titulo: "", actividades: [""] },
        {
          rango: "29 de junio – 3 de julio",
          horas: null,
          titulo: "",
          actividades: [""],
        },
      ],
    },
    {
      mes: "Julio",
      anio: 2026,
      horas: 172.5,
      acumulado: 330,
      semanas: [
        { rango: "6–10 de julio", horas: null, titulo: "", actividades: [""] },
        { rango: "13–17 de julio", horas: null, titulo: "", actividades: [""] },
        { rango: "20–24 de julio", horas: null, titulo: "", actividades: [""] },
        { rango: "27–31 de julio", horas: null, titulo: "", actividades: [""] },
      ],
    },
    {
      mes: "Agosto",
      anio: 2026,
      horas: 138,
      acumulado: 468,
      semanas: [
        { rango: "3–7 de agosto", horas: null, titulo: "", actividades: [""] },
        {
          rango: "10–14 de agosto",
          horas: null,
          titulo: "",
          actividades: [""],
        },
        {
          rango: "17–21 de agosto",
          horas: null,
          titulo: "",
          actividades: [""],
        },
        {
          rango: "24–28 de agosto",
          horas: null,
          titulo: "",
          actividades: [""],
        },
        {
          rango: "31 de agosto – 4 de septiembre",
          horas: null,
          titulo: "",
          actividades: [""],
        },
      ],
    },
    {
      mes: "Septiembre",
      anio: 2026,
      horas: 157,
      acumulado: 625,
      semanas: [
        {
          rango: "7–11 de septiembre",
          horas: null,
          titulo: "",
          actividades: [""],
        },
        {
          rango: "14–18 de septiembre",
          horas: null,
          titulo: "",
          actividades: [""],
        },
        {
          rango: "21–25 de septiembre",
          horas: null,
          titulo: "",
          actividades: [""],
        },
        {
          rango: "28 de septiembre – 2 de octubre",
          horas: null,
          titulo: "",
          actividades: [""],
        },
      ],
    },
    {
      mes: "Octubre",
      anio: 2026,
      horas: 0,
      acumulado: 625,
      semanas: [],
    },
  ],
};
