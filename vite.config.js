// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'project-3-server-lf3h8rhbf-maksims-projects-22a788de.vercel.app', // Cambia esto a la URL de tu backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})


