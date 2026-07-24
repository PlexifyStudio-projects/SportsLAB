# SportsLAB · Landing de apuestas deportivas

Landing page de apuestas deportivas construida con **React + Vite + SCSS (BEM)**.
Diseño **mobile-first**: pensada para verse aún mejor en el teléfono que en el escritorio.

> ⚠️ Proyecto de demostración. Cuotas y promociones ilustrativas. **+18 · Juega con
> responsabilidad.**

---

## Requisitos

- Node.js **≥ 20** (recomendado 22, ver `.nvmrc`)
- npm ≥ 10

## Puesta en marcha

```bash
npm install      # instala dependencias
npm run dev      # arranca el servidor de desarrollo en http://localhost:5412
```

> El servidor de desarrollo se sirve **siempre en el puerto 5412** (`strictPort`).

## Scripts

| Script                | Descripción                                     |
| --------------------- | ----------------------------------------------- |
| `npm run dev`         | Servidor de desarrollo con HMR (puerto **5412**) |
| `npm run build`       | Build de producción en `dist/`                   |
| `npm run preview`     | Sirve el build de producción (puerto 5412)       |
| `npm run lint`        | Analiza el código con ESLint                     |
| `npm run lint:fix`    | Corrige problemas de lint automáticamente        |
| `npm run format`      | Formatea el código con Prettier                  |

## Estructura

```
SportsLAB/
├── docs/                 Documentación del proyecto
│   ├── ARCHITECTURE.md   Arquitectura y decisiones técnicas
│   └── CONVENTIONS.md    Convenciones de código (LECTURA OBLIGATORIA)
├── public/               Estáticos servidos tal cual
├── src/
│   ├── assets/           Imágenes, iconos, fuentes
│   ├── components/
│   │   ├── layout/       Header, Footer, MobileCta
│   │   └── ui/           Button, Badge, OddsButton, SectionHeader
│   ├── sections/         Hero, LiveMatches, Sports, Promotions, Features, CtaBanner
│   ├── data/             Datos/mock desacoplados de la vista
│   ├── hooks/            Custom hooks
│   ├── utils/            Helpers puros
│   ├── styles/           SCSS global (abstracts + base)
│   ├── App.jsx
│   └── main.jsx
├── vite.config.js        Config de Vite (alias + puerto 5412)
├── eslint.config.js      Reglas de ESLint
└── .env.example          Plantilla de variables de entorno
```

## Convenciones

Antes de escribir código, lee **[`docs/CONVENTIONS.md`](docs/CONVENTIONS.md)**.
Resumen: mobile-first innegociable, BEM estricto, un componente por carpeta con su SCSS,
tokens de diseño centralizados y datos separados de la vista.

## Variables de entorno

Copia `.env.example` a `.env`. Toda variable expuesta al cliente lleva prefijo `VITE_`.
