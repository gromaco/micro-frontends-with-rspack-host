# Vite ESM Externals Integration

This example demonstrates how to consume a Vite-built ESM module in the host application using the `externals`
configuration in RSBuild (Rspack).

## Overview

Instead of using Module Federation or direct dynamic import, the host leverages Rspack's `externals` feature to map an
import specifier to a remote ESM module URL. This allows the host to import the remote module as if it were a local
dependency, but the code is loaded at runtime from a specified URL.

## Host Configuration (`rsbuild.config.ts`)

```ts
export default defineConfig({
  output: {
    externals: {
      'externals-vite-esm': 'module http://localhost:5002/src/mf-adapter.js',
    },
  },
});
```

- `'externals-vite-esm'` is the import specifier used in the host code.
- The value `'module http://localhost:5002/mf-adapter.js'` tells Rspack to load this module as an ESM from the provided
  URL at runtime.

## Usage in Host Code

The host can now import the remote module using the external specifier:

```tsx
// ExternalsViteEsmWrapper.tsx
const containerRef = useRemoteModule(
    async () => {
      // Import via externals mapping
      return await import('externals-vite-esm') as RemoteAdapter;
    },
    'Externals ESM Vite',
    props
);
```

- The import statement is resolved by Rspack to load the remote ESM module from the configured URL.
- This approach keeps the host code clean and decoupled from the remote URL.

## When to Use

- Use this method when you want to consume a remote ESM module at runtime without Module Federation.
- Useful for integrating Vite-built ESM libraries or adapters into a Rspack/RSBuild host.
