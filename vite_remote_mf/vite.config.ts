import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {federation} from '@module-federation/vite';
// https://vite.dev/config/
export default defineConfig({
  mode: 'production',
  plugins: [
    federation({
      filename: 'remoteEntry.js',
      name: 'remote',

      exposes: {
        './remote-app': './src/mf-adapter.tsx',
      },
    }),
    react()
  ],
  server: {
    port: 3002,
    strictPort: true,
    origin: 'http://localhost:3002'
  }
})
