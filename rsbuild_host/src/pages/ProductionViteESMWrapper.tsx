import {RemoteAdapter} from "../types.ts";
import {useRemoteModule} from "../hooks/useRemoteModule.tsx";
import {DocViewer} from "../DocViewer.tsx";

export const ProductionViteEsmWrapper = (props: { routerBasename?: string; }) => {

  const containerRef = useRemoteModule(
      async () => {
        // @ts-ignore
        return await import(/* webpackIgnore: true */ 'http://localhost:4173/mf-adapter.js') as RemoteAdapter;
      },
      'ESM Vite',
      props
  );


  return <>
    <h1 className={'title'}>
      This page is using <b>ESM Vite</b> as production build
    </h1>
    <DocViewer docName={'vite-esm'}/>
    <div ref={containerRef}/>
  </>;
};