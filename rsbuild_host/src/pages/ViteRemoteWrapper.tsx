import {RemoteAdapter} from "../types.ts";
import {useRemoteModule} from "../hooks/useRemoteModule.tsx";
import {DocViewer} from "../DocViewer.tsx";

export const ViteRemoteWrapper = (props: { routerBasename?: string; }) => {
  const containerRef = useRemoteModule(
      async () => {
        // @ts-ignore
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