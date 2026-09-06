import { defineConfig } from 'vite';

// El sitio se sirve como GitHub Pages de proyecto en
// https://jp-rosales.github.io/Heirloom/, no en la raíz del dominio,
// así que el base path debe incluir el nombre del repo para que Vite
// genere rutas de assets correctas en el build de producción.
export default defineConfig({
  base: '/Heirloom/',
});
