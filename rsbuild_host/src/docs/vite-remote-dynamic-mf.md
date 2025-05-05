This example demonstrates how to dynamically load a Vite-based remote module

## How It Works

The host application dynamically loads a remote Vite application at runtime using `@module-federation/enhanced/runtime`.
See the [documentation](https://module-federation.io/guide/basic/runtime.html) for more details.
The following example assumes, that there is a module federation plugin configured in the bundler.

```tsx
import {loadRemote, registerRemotes} from '@module-federation/enhanced/runtime';

// When no plugin is configured in the bundler, this can be used to initialize remote modules dynamically:
// 
// import {init} from '@module-federation/enhanced/runtime';
//
// init({
//   name: '@demo/register-new-remotes',
//   remotes: [
//     {
//       name: 'vite-remote-dynamic-mf',
//       entry: 'http://localhost:3002/remoteEntry.js',
//       type: 'module',
//     },
//   ],
// });

// 1. Register the remote module
registerRemotes([
  {
    name: 'vite-remote-dynamic-mf',
    entry: 'http://localhost:3002/remoteEntry.js',
    type: 'module',
  },
]);

// 2. Create a component that uses the remote module at runtime
export const ViteDynamicRemoteWrapper = (props) => {
  // Load and mount the remote module
  const containerRef = useRemoteModule(
      () => loadRemote('vite-remote-dynamic-mf/remote-app') as Promise<RemoteAdapter>,
      'vite-remote-dynamic-mf/remote-app',
      props
  );

  return (
      <>
        <h1>Dynamic Remotes with Vite</h1>
        <div ref={containerRef}/>
      </>
  );
};
```

## Vite Remote Module Federation Configuration

```ts
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {federation} from '@module-federation/vite';

export default defineConfig({
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
    port: 3002
  }
})