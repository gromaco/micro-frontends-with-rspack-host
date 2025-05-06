import {RemoteAdapter} from "../types.ts";
import {useRemoteModule} from "../hooks/useRemoteModule.tsx";
import {DocViewer} from "../DocViewer.tsx";

export const ViteEsmWrapper = (props: { routerBasename?: string; }) => {

  const containerRef = useRemoteModule(
      async () => {
        // @ts-ignore
        return await import(/* webpackIgnore: true */ 'http://localhost:3003/src/mf-adapter.js') as RemoteAdapter;
      },
      'ESM Vite',
      props
  );


  return <>
    <h1 className={'title'}>
      Vite as ESM Module without MF
    </h1>
    <DocViewer docName={'vite-esm'}/>
    <div ref={containerRef}/>
  </>;
};