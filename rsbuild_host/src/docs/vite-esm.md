The Vite application builds its adapter as an ESM library with a specified entry point. The host application then
imports this module directly via URL without using Module Federation.

## Remote Configuration (Vite)

For production, the Vite application is configured to build as an ESM library that can be consumed by other
applications.

```ts
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
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
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});
```

For development, it can be served directly from the vite dev server - 'http://localhost:5002/src/mf-adapter.js'

## Host Integration

The RSBuild host application consumes the ESM remote module by directly importing it at runtime:

```tsx
export const ViteEsmWrapper = (props: unknown) => {
  const containerRef = useRemoteModule(
      async () => {
        // Import the ESM module directly
        return await import(/* webpackIgnore: true */ 'http://localhost:5002/src/mf-adapter.js') as RemoteAdapter;
      },
      'vite-esm',
      props
  );

  return <>
    <h1>Vite ESM remote without Module Federation</h1>
    <DocViewer docName={'vite-esm'}/>
    <div ref={containerRef}/>
  </>
};
```