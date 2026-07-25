import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App.jsx';
import { LanguageProvider } from '@/i18n/index.jsx';
import { syncScrollTriggers, smoothAnchors } from '@utils/motion.js';

// -----------------------------------------------------------------------------
// Tipografía autoalojada (sin peticiones a terceros: nada de Google Fonts).
// · Playfair Display — serif de alto contraste para titulares. Es la voz de la
//   marca: editorial, de lujo, con el trazo fino/grueso que da el aire de cine.
// · Inter — sans neutra para interfaz y cuerpo, donde manda la legibilidad.
// Ambas son variables: un único fichero cubre todos los pesos. Los `index.css`
// declaran los subconjuntos con `unicode-range`, así que el navegador solo
// descarga el latino que necesita un sitio es-CO / en.
// La cursiva de Playfair va aparte porque se usa de verdad (la cita de
// Lifestyle y el selector `em`), y sin ella el navegador la falsearía
// inclinando los glifos, que en una serif de alto contraste se ve fatal.
// -----------------------------------------------------------------------------
import '@fontsource-variable/playfair-display/index.css';
import '@fontsource-variable/playfair-display/wght-italic.css';
import '@fontsource-variable/inter/index.css';

import '@styles/main.scss';

// Recalcula las posiciones de ScrollTrigger cuando el layout cambia (imágenes
// lazy, fuentes web…). Sin esto, las secciones que se revelan al hacer scroll
// se quedaban invisibles en viewports bajos (portátiles y Macs).
syncScrollTriggers();

// Scroll suave en los enlaces internos, sin el `scroll-behavior: smooth` de CSS
// que hacía rebotar la página en cada refresh de ScrollTrigger.
smoothAnchors();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
