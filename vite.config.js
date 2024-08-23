
// para conexion externa.
// import { defineConfig, loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   server: {
//     proxy: {
//       '/': {
//         changeOrigin: true,
//       }
//     }
//   },
//   plugins: [react()],
// })

// localhost
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});





