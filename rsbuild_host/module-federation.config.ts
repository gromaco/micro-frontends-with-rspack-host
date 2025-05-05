import {createModuleFederationConfig} from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'rsbuild_host',
  remotes: {
    'rsbuild-remote': 'rsbuild_remote@http://localhost:3001/mf-manifest.json',
    'vite-remote': 'module http://localhost:3002/remoteEntry.js'
  },
  
  shareStrategy: 'loaded-first',
  shared: {
    react: {singleton: true},
    'react-dom': {singleton: true},
  },
});
