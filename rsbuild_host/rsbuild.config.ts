import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import {pluginModuleFederation} from '@module-federation/rsbuild-plugin';
import moduleFederationConfig from './module-federation.config';

export default defineConfig({
  server: {
    port: 3000,
    // open: true,
    strictPort: true,
  },
  output: {
    externals: {
      'externals-vite-esm': 'module http://localhost:3003/src/mf-adapter.js',
    },
  },
  tools: {
    rspack(config) {
      config.module?.rules?.push({
        test: /\.md$/,
        resourceQuery: /raw/,
        type: 'asset/source',
      });
    },
  },
  plugins: [pluginReact(), pluginModuleFederation(moduleFederationConfig)],
});
