# Informe final de pasantía — Dirección de Comunicaciones USTA Tunja

Sitio web estático con el informe final de la pasantía de desarrollo de software
realizada por **Julián Tobito** y **Wldy Sandoval** en la Dirección de
Comunicaciones de la Universidad Santo Tomás, seccional Tunja (junio – octubre
de 2026, 640 horas).

Está hecho con HTML, CSS y JavaScript puros: sin frameworks, sin paso de
compilación, sin npm y sin dependencias externas. Las fuentes (Poppins y Nunito,
licencia OFL) están autoalojadas en `assets/fonts/`. Funciona igual abierto
desde el disco que publicado en GitHub Pages.

### Identidad visual

El informe tiene un marco común con la paleta institucional USTA (azul
medianoche, cerúleo y amarillo) y, dentro de él, **cada ficha de proyecto adopta
la identidad del producto que documenta**: colores, tipografía, radios y
recursos gráficos tomados de su propio repositorio (logos de CAMINA, sellos de
los rallies, decoraciones de la Plataforma de Nómina…).

## Estructura

```
├── index.html                Portada, cifras, resumen ejecutivo y mosaico de proyectos
├── metodologia.html          Marco teórico y metodológico (texto estático)
├── cronograma.html           Avance de horas, meses, semanas y diagrama de Gantt
├── conclusiones.html         Resultados, dificultades, conclusiones, recomendaciones, anexos
├── proyectos/                Una página por frente; solo cambia ID_PROYECTO y el tema
│   ├── micrositios.html      ├── rally-living-lab.html   ├── mesas-ayuda.html
│   ├── camina.html           ├── reservalab.html
│   └── rally-neotomasino.html└── nomina.html
├── assets/
│   ├── css/estilos.css       Marco común y componentes (variables --p-* por ficha)
│   ├── css/temas/*.css       Un tema por proyecto: paleta, tipografía y héroe
│   ├── js/app.js             Render de datos, navegación e interacciones
│   ├── fonts/                Poppins y Nunito autoalojadas (OFL)
│   └── img/                  Marcas, sellos y capturas
├── data/
│   ├── general.js            Datos del informe, resumen ejecutivo y textos de cierre
│   ├── proyectos.js          Ficha técnica de cada frente
│   └── cronograma.js         Horas por mes y actividades por semana
└── .nojekyll
```

## Verlo en local

Basta con hacer doble clic en `index.html`. No hace falta servidor.

Si prefieres servirlo (por ejemplo, para probarlo como en GitHub Pages):

```bash
python -m http.server 8000
# y abrir http://localhost:8000
```

## Editar el contenido

Todo el contenido variable vive en `data/`. Son archivos **`.js`, no `.json`**:
cada uno asigna un objeto global (`window.GENERAL`, `window.PROYECTOS`,
`window.CRONOGRAMA`) y se cargan con `<script>` antes de `app.js`. Así se evita
`fetch()`, que los navegadores bloquean al abrir archivos con `file://`.

Reglas generales:

- **Un campo vacío no se muestra.** Si una sección de un proyecto queda sin
  datos, desaparece completa (sin títulos huérfanos). No hace falta borrar las
  plantillas en blanco.
- **Fechas en formato ISO** `AAAA-MM-DD` (por ejemplo `"2026-07-29"`). También
  se acepta `"30 de septiembre de 2026"`.
- **Rutas siempre relativas y sin `/` inicial**: `assets/img/pasaporte/inicio.png`.
- Tras guardar, recarga la página. Si algo deja de verse, revisa la consola del
  navegador: lo más común es una coma faltante o una comilla sin cerrar.

### `data/proyectos.js`

Un objeto por proyecto. Campos principales:

| Campo | Contenido |
|---|---|
| `estado` | `"En producción"`, `"Entregado"` o `"En desarrollo"` |
| `periodo` | `{ inicio, fin }` — alimenta las tarjetas y el diagrama de Gantt |
| `teoria` | Arquitectura, organización del código, flujo de una petición, autenticación, errores, documentación de la API |
| `modulos`, `modeloDatos.entidades` | Filas de tabla; duplica el objeto de ejemplo para añadir más |
| `tecnologias` | `{ nombre, version, uso, categoria }` con categoría `frontend`, `backend`, `bd`, `devops` o `herramienta` |
| `herramientas.actions` | Workflows de GitHub Actions |
| `identidad` | Tema visual (`tema`), color del Gantt, número y rótulo de la tarjeta |
| `capas` | Diagrama de arquitectura `[{ rol, nombre, detalle }]` |
| `gestionAgil` | Historias de usuario y sprints (campo adicional) |
| `extras` | Contenido propio del frente: `sellos`, `gruposModulos`, `roles`, `desarrollos`, `mesas`, `flujo`, `programas`, `relacionado`… |
| `despliegue.variablesEntorno` | **Solo nombres** de variables, nunca valores |
| `capturas` | `{ src, alt, pie }`; guarda las imágenes en `assets/img/<proyecto>/` |
| `pendientes` | Se agrupan automáticamente en la página de conclusiones |

Para **añadir un proyecto nuevo**:

1. Copia un objeto completo en `data/proyectos.js` y cambia su `id`.
2. Duplica cualquier archivo de `proyectos/` con el nombre `<id>.html`.
3. En ese archivo cambia la línea `const ID_PROYECTO = "<id>";`, el `<title>`,
   la clase `tema-<tema>` del `<body>` y el `<link>` a `assets/css/temas/<tema>.css`.
4. Si el frente tiene identidad propia, crea su tema en `assets/css/temas/`
   redefiniendo las variables `--p-*` y su héroe en `HEROES` dentro de `app.js`.

La tarjeta en la portada, el índice y la fila del Gantt aparecen solos.

### `data/cronograma.js`

`meses[]` contiene los totales reales por mes. Cada semana se muestra en la
línea de tiempo solo si tiene `horas`, `titulo` o `actividades`. Actualiza
también `horasAcumuladas` al registrar horas nuevas.

### `data/general.js`

Título, pasantes, tutores, periodo, resumen ejecutivo y el bloque `cierre`
(aportes, dificultades, conclusiones, recomendaciones y anexos). Para usar el
escudo real, guarda la imagen en `assets/img/` y escribe su ruta en `escudo`.

### Colores

La paleta institucional está en las variables `--usta-*` al inicio de
`assets/css/estilos.css`. Cada ficha redefine las variables `--p-*` en su archivo
de `assets/css/temas/`, con los valores tomados del repositorio del proyecto.

Nota: Firefox bloquea las fuentes de una carpeta superior cuando el sitio se
abre con `file://`; en ese caso las fichas usan la fuente del sistema. Servido
(GitHub Pages o `python -m http.server`) se ven con Poppins y Nunito.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub (por ejemplo `informe-pasantia`) y sube el
   contenido de esta carpeta **en la raíz** del repositorio:

   ```bash
   git add .
   git commit -m "docs: informe final de pasantía"
   git branch -M main
   git remote add origin https://github.com/<usuario>/informe-pasantia.git
   git push -u origin main
   ```

2. En GitHub, entra a **Settings → Pages**.
3. En **Build and deployment → Source**, elige **Deploy from a branch**.
4. En **Branch**, selecciona la rama **`main`** y la carpeta **`/ (root)`**, y
   pulsa **Save**.
5. Espera uno o dos minutos. El sitio quedará en
   `https://<usuario>.github.io/informe-pasantia/`.

Cada `git push` a `main` vuelve a publicar el sitio automáticamente.

### Por qué todas las rutas son relativas

GitHub Pages sirve los sitios de proyecto desde `/<nombre-del-repositorio>/`, no
desde la raíz del dominio. Una ruta absoluta como `/assets/css/estilos.css`
apuntaría a `https://<usuario>.github.io/assets/...` y fallaría. Por eso todas
las rutas usan `./` (páginas de la raíz) o `../` (páginas dentro de
`proyectos/`), y el sitio funciona igual en cualquier subcarpeta y con `file://`.

### Para qué sirve `.nojekyll`

Por defecto, GitHub Pages procesa los sitios con Jekyll, que ignora archivos y
carpetas que empiezan por `_` o `.` y puede alterar algunos archivos. El archivo
vacío `.nojekyll` en la raíz desactiva ese procesamiento: GitHub publica los
archivos exactamente como están. No lo borres.

## Imprimir o exportar a PDF

Cada página tiene estilos de impresión: se ocultan la navegación y los índices,
el fondo pasa a blanco, las tablas y tarjetas no se cortan entre páginas y los
enlaces externos muestran su URL. Usa **Imprimir → Guardar como PDF** desde el
navegador.
