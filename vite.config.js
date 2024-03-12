import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: import.meta.env.VITE_PROXY_URL || 'http://localhost:5005',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       }
//     }
//   }
// });



