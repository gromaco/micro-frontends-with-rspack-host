import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({command}) => ({
  base: command === 'build' ? 'http://localhost:4173' : '/',
  plugins: [
    react()
  ],
  build: {
    manifest: true,
    rollupOptions: {
      // Use mf-adapter.tsx as the entry point instead of index.html
      input: 'src/mf-adapter.tsx',
      output: {
        format: 'esm',
        entryFileNames: 'mf-adapter.js',
        chunkFileNames: 'chunks/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
      preserveEntrySignatures: 'strict', // Preserve exports from entry points
    },
    minify: false,
    sourcemap: true,
  },
  preview: {
    cors: true,
  },

  server: {
    port: 3003,
    strictPort: true,
    origin: command === 'build' ? 'http://localhost:4173' : 'http://localhost:3003',
  }
}))
