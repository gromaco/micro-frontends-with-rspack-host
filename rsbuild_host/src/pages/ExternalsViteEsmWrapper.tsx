import {RemoteAdapter} from "../types.ts";
import {useRemoteModule} from "../hooks/useRemoteModule.tsx";
import {DocViewer} from "../DocViewer.tsx";

export const ExternalsViteEsmWrapper = (props: { routerBasename?: string; }) => {

  const containerRef = useRemoteModule(
      async () => {
        // @ts-ignore
        return await import('externals-vite-esm') as RemoteAdapter;
      },
      'Externals ESM Vite',
      props
  );


  return <>
    <h1 className={'title'}>
      Vite as ESM Module using Externals option
    </h1>
    <DocViewer docName={'vite-esm-externals'}/>
    <div ref={containerRef}/>
  </>;
};