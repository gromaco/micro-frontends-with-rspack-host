import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  base: 'http://localhost:3002',
  plugins: [react()],
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/mf-adapter.tsx',
      formats: ['es'],
      fileName: 'mf-adapter',
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('development'), // or 'production'
  }
});
