import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  
  plugins: [react()],
})





// import { defineConfig, loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig(({mode}) => {
  
//   const env = loadEnv(mode, process.cwd());
//   console.log(env);
//   return {
//     plugins: [react()],
//     server: {
//       proxy: {
//         [env.VITE_SERVER]: {
//           target: env.VITE_PROXY_TARGET,
//           changeOrigin: true,
//           rewrite: (path) => path.replace(/^\/api/, ''),
//         },
//       }
//     }
//   }
// })

// import { defineConfig, loadEnv } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig(({ mode }) => {
//   // eslint-disable-next-line no-undef
//   const env = loadEnv(mode, process.cwd())
//   console.log(env)

//   return {
//     plugins: [react()],
//     server: {
//       proxy: {
//         [env.VITE_SERVER]: {
//           target: env.VITE_PROXY_TARGET,
//           changeOrigin: true,
//           rewrite: (path) => path.replace(new RegExp(`^${env.VITE_SERVER}`), ''),
//         },
//       },
//     },
//   }
// })


