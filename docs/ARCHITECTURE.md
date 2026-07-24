# Arquitectura · SportsLAB

## Stack

| Capa            | Tecnología            | Motivo                                             |
| --------------- | --------------------- | -------------------------------------------------- |
| UI              | React 19              | Componentes declarativos y reutilizables           |
| Build / dev     | Vite 7                | Arranque instantáneo y HMR; dev en puerto **5412** |
| Estilos         | SCSS (Sass modules)   | Tokens, mixins y BEM; arquitectura 7-1 adaptada    |
| Calidad         | ESLint + Prettier     | Estándar de código homogéneo                       |

## Flujo de renderizado

```
index.html
  └── src/main.jsx          (monta React + importa styles/main.scss)
        └── src/App.jsx      (composición de la landing / funnel)
              ├── Header            (layout)
              ├── main
              │     ├── Hero
              │     ├── LiveMatches → MatchCard → OddsButton
              │     ├── Sports
              │     ├── Promotions
              │     ├── Features
              │     └── CtaBanner
              ├── Footer            (layout + juego responsable)
              └── MobileCta         (barra fija, solo móvil)
```

## Principios

- **Separación datos / vista:** todo dato vive en `src/data`. Cambiar de mock a API real
  = cambiar solo esos archivos (o su fetch), sin tocar componentes.
- **Componentes UI presentacionales:** `components/ui` no conoce el dominio; recibe props.
- **Secciones = orquestación:** cada sección compone UI + datos y define su franja de página.
- **Estilos co-localizados:** el CSS viaja con su componente; lo global vive en `styles/`.
- **Mobile-first como principio rector:** ver `CONVENTIONS.md` §0.

## Sistema de diseño (tokens)

Fuente única de verdad en `src/styles/abstracts/_variables.scss`:
color, espaciado (escala 4px), tipografía, radios, sombras, z-index y transiciones.
Ningún valor de diseño se escribe a mano en un componente.

## Alias de importación

Definidos en `vite.config.js` y `jsconfig.json`:

`@` · `@styles` · `@components` · `@sections` · `@data` · `@hooks` · `@utils` · `@assets`

## Preparado para el futuro

- Migración a TypeScript: `jsconfig.json` ya define `paths`; renombrar a `tsconfig`.
- Datos reales: sustituir mocks de `data/` por llamadas a `VITE_API_BASE_URL`.
- Testing: hueco previsto para Vitest + Testing Library.
