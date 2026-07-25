import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// -----------------------------------------------------------------------------
// Configuración de Vite — SportsLAB
// - El servidor de desarrollo se sirve SIEMPRE en el puerto 5412 (strictPort).
// - Producción es Cloudflare Pages en https://abrahamsportslab.com/, es decir la
//   raíz del dominio: por eso `base` es '/' por defecto.
// - GitHub Pages sirve el sitio bajo /SportsLAB/, así que ese despliegue pasa
//   DEPLOY_BASE=/SportsLAB/ (ver .github/workflows/deploy.yml). No se toca aquí
//   para que Cloudflare no herede un subpath que allí daría 404 en todos los
//   assets.
// - La config se exporta como OBJETO, no como callback: Wrangler intenta leer
//   este fichero de forma estática cuando no encuentra un wrangler.jsonc y con
//   la forma `({ command }) => ({...})` falla con "Error parsing file".
// -----------------------------------------------------------------------------
export default defineConfig({
  base: process.env.DEPLOY_BASE ?? '/',

  plugins: [react()],

  // Alias de rutas para imports absolutos y legibles (@/…).
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@sections': fileURLToPath(new URL('./src/sections', import.meta.url)),
      '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
    },
  },

  server: {
    port: 5412,
    strictPort: true, // Si el 5412 está ocupado, falla en lugar de cambiar de puerto.
    open: true,
    host: true,
  },

  preview: {
    port: 5412,
    strictPort: true,
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },

  build: {
    outDir: 'dist',
    // Sin sourcemap en producción: generaba un `.map` de ~1,6 MB que se publicaba
    // en Pages y expone el código fuente. Para depurar un build puntual, usa
    // `vite build --sourcemap`.
    sourcemap: false,
    target: 'es2020',

    rollupOptions: {
      output: {
        // React y GSAP (~106 kB gzip) van a su propio chunk: no cambian nunca,
        // así que el navegador los reutiliza de caché y cada despliegue solo
        // obliga a redescargar los ~23 kB gzip del código de la landing.
        // Medido: separar no penaliza el peso total (380,6 kB frente a 380,8 kB
        // en un único chunk), y además los dos ficheros se bajan en paralelo.
        manualChunks(id) {
          if (id.includes('/node_modules/')) return 'vendor';
          return undefined;
        },
      },
    },
  },
});
