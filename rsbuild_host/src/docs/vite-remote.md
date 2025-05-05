## Remote Configuration (Vite)

The Vite application is configured to expose components that can be consumed by host applications:

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
```

## Host Configuration (RSBuild)

The RSBuild host application is configured to consume the Vite remote module using two configuration files:
**rsbuild.config.ts**

```ts
import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import {pluginModuleFederation} from '@module-federation/rsbuild-plugin';
import moduleFederationConfig from './module-federation.config';

export default defineConfig({
  server: {
    port: 3000,
    open: true,
  },
  plugins: [pluginReact(), pluginModuleFederation(moduleFederationConfig)],
});
```

**module-federation.config.ts**
Notice the `module` type for the remote module

```ts
import {createModuleFederationConfig} from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'rsbuild_host',
  remotes: {
    'vite-remote': 'module http://localhost:3002/remoteEntry.js'
  },

});
```

Then import the remote module in the host application:

```tsx
export const ViteRemoteWrapper = (props: unknown) => {
  const containerRef = useRemoteModule(
      async () => {
        
        return await import('vite-remote/remote-app') as RemoteAdapter;
      },
      'vite-remote',
      props
  );

  return <>
    <h1>Vite remote with Module Federation enabled via plugin during build time</h1>
    <DocViewer docName={'vite-remote'}/>
    <div ref={containerRef}/>
  </>
};
```