import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

// GitHub Pages serves this site from https://mdrakibtrofder.github.io/database-management-systems-sessional/
// so production builds need that sub-path as the base. `npm run dev` keeps using '/'.
const PAGES_BASE = '/database-management-systems-sessional/';

export default defineConfig(({ command }) => {
  return {
    base: command === 'build' ? PAGES_BASE : '/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
