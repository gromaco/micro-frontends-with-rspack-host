import {RemoteAdapter} from "../types.ts";
import {loadRemote, registerRemotes} from '@module-federation/enhanced/runtime';
import {useRemoteModule} from "../hooks/useRemoteModule.tsx";
import {DocViewer} from "../DocViewer.tsx";

// if no plugin is used in the bundler\s config, then we can use this to init remotes:
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

registerRemotes([
  {
    name: 'vite-remote-dynamic-mf',
    entry: 'http://localhost:3002/remoteEntry.js',
    type: 'module',
  },
]);


export const ViteDynamicRemoteWrapper = (props: { routerBasename?: string; }) => {
  const containerRef = useRemoteModule(
      () => loadRemote('vite-remote-dynamic-mf/remote-app') as Promise<RemoteAdapter>,
      'vite-remote-dynamic-mf/remote-app',
      props
  );

  return <>
    <h1>Dynamic Remotes with Vite</h1>
    <DocViewer docName={'vite-remote-dynamic-mf'}/>
    <div ref={containerRef}/>
  </>;
};
