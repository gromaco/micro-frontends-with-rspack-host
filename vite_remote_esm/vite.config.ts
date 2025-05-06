import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()
  ],
  build: {
    lib: {
      entry: 'src/mf-adapter.tsx',
      formats: ['es'],
      fileName: 'mf-adapter',
    },
  },
  server: {
    port: 3003,
    strictPort: true,
    origin: 'http://localhost:3003'
  }
})
