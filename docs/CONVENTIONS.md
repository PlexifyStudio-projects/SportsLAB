# Convenciones de ingeniería · SportsLAB

Estándar obligatorio para todo el que toque este repositorio. El objetivo es que
cualquier persona del equipo pueda abrir un archivo y saber exactamente dónde está,
cómo se llama y por qué. Orden estricto, sin excepciones.

---

## 0. Regla nº 1 — Mobile-first, siempre

> **La web DEBE verse mejor en el teléfono que en el ordenador.** El móvil no es
> una adaptación del escritorio: es el diseño principal. El escritorio es la
> ampliación.

Esto es innegociable y condiciona cada decisión de CSS y de maquetación:

1. **Se escribe primero el estilo móvil**, sin media queries. Ese es el estado base.
2. Las mejoras para pantallas grandes se añaden **solo** con `@include respond-to('md')`,
   `('lg')`, etc. (media queries `min-width`). Nunca se parte del escritorio hacia abajo.
3. Áreas táctiles mínimas de **44 × 44 px**. Botones y enlaces cómodos con el pulgar.
4. Acciones clave siempre accesibles en móvil → barra fija inferior (`MobileCta`).
5. Nada de scroll horizontal. Contenido ancho (tablas, filas de cuotas) va dentro de
   contenedores con `overflow-x: auto`.
6. Tipografía y espaciados fluidos; se prueban en 360 px de ancho como mínimo.
7. Se respeta `prefers-reduced-motion` y las _safe areas_ (`env(safe-area-inset-*)`).

**Checklist antes de dar una tarea por terminada:** ábrela a 360 px, 768 px y 1280 px.
Si en 360 px no se ve _igual de bien o mejor_ que en 1280 px, no está terminada.

---

## 1. Estructura de carpetas

```
src/
├── assets/          Recursos estáticos (imágenes, iconos, fuentes)
├── components/
│   ├── layout/      Estructura global (Header, Footer, MobileCta)
│   └── ui/          Piezas reutilizables y "tontas" (Button, Badge, ...)
├── sections/        Bloques de la landing (Hero, Promotions, ...)
├── data/            Datos/mock desacoplados de la vista
├── hooks/           Custom hooks de React
├── utils/           Funciones puras y helpers
└── styles/          Sistema SCSS global (abstracts + base)
```

**Regla de co-localización:** cada componente vive en su **propia carpeta** junto a su
SCSS: `Button/Button.jsx` + `Button/Button.scss`. Un componente = una carpeta.

---

## 2. Nomenclatura

| Elemento              | Convención               | Ejemplo                    |
| --------------------- | ------------------------ | -------------------------- |
| Carpeta de componente | `PascalCase`             | `MatchCard/`               |
| Componente React      | `PascalCase.jsx`         | `MatchCard.jsx`            |
| Hooks                 | `useCamelCase.js`        | `useScrolled.js`           |
| Utilidades / datos    | `camelCase.js`           | `format.js`, `matches.js`  |
| Clases CSS            | **BEM**                  | `match-card__team--live`   |
| Constantes de datos   | `UPPER_SNAKE_CASE`       | `LIVE_MATCHES`             |
| Variables SCSS        | `$kebab-case`            | `$color-primary`           |

---

## 3. Metodología CSS — BEM estricto

`bloque__elemento--modificador`. Sin anidar selectores por estética; el anidamiento
en SCSS se usa solo para `&__elemento`, `&--modificador` y estados (`&:hover`).

```scss
.match-card {              // Bloque
  &__team { }              // Elemento  -> .match-card__team
  &--featured { }          // Modificador -> .match-card--featured
}
```

- **Un archivo `.scss` por componente**, importado desde su `.jsx`.
- Nada de estilos globales fuera de `src/styles/base`.
- Tokens (color, espaciado, tipografía) **solo** desde `src/styles/abstracts`. Prohibido
  escribir un color a mano (`#22c55e`) en un componente: usa `$color-primary`.
- Cada componente accede a los tokens con `@use '@styles/abstracts' as *;`.

---

## 4. Arquitectura SCSS (patrón 7-1 adaptado)

- `abstracts/` → variables, breakpoints, funciones, mixins. **No emite CSS.**
- `base/` → reset, tipografía y estilos globales. **Sí emite CSS**, se importa en `main.scss`.
- Los estilos de componentes/secciones **no** se importan en `main.scss`: viajan con su JSX.

---

## 5. React

- Componentes **funcionales** con Hooks. Un componente por archivo, `export default`.
- Componentes de `ui/` son presentacionales (sin lógica de negocio ni fetch).
- Los datos se importan desde `data/`, nunca se hardcodean dentro del JSX de una sección.
- Imports absolutos con alias (`@components`, `@sections`, `@data`, ...). Nada de `../../../`.
- Documenta props con JSDoc.

---

## 6. Calidad y flujo

| Acción              | Comando              |
| ------------------- | -------------------- |
| Desarrollo (5412)   | `npm run dev`        |
| Lint                | `npm run lint`       |
| Formateo            | `npm run format`     |
| Build producción    | `npm run build`      |

- El puerto de desarrollo es **siempre 5412** (`strictPort`). No se cambia.
- No se sube código que no pase `npm run lint`.
- `.env` nunca se commitea; usa `.env.example` como plantilla.

---

## 7. Juego responsable (obligatorio en apuestas)

Toda página debe mostrar de forma visible: aviso **+18**, mensaje de juego responsable
y referencia a T&C. Ya centralizado en `Footer` y `CtaBanner`. No se elimina.
