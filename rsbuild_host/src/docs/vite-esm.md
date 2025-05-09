The Vite application builds its adapter as an ESM module. The host application then
imports this module directly via URL without using Module Federation.

## Remote Configuration (Vite)

For production, the Vite application is configured to build as an ESM module that can be consumed by other
applications.

```ts
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({command, mode, isPreview}) => ({
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
  }
}))
```

For development, it can be served directly from the vite dev server - 'http://localhost:3003/src/mf-adapter.js'

## Host Integration

The RSBuild host application consumes the ESM remote module by directly importing it at runtime:

```tsx
export const ViteEsmWrapper = (props: unknown) => {
  const containerRef = useRemoteModule(
      async () => {
        // Import the ESM module directly
        return await import(/* webpackIgnore: true */ 'http://localhost:4173/mf-adapter.js') as RemoteAdapter;
      },
      'vite-esm',
      props
  );

  return <>
    <h1>Vite ESM remote without Module Federation</h1>
    <div ref={containerRef}/>
  </>
};