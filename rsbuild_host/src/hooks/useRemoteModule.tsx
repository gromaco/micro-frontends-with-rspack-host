import {useEffect, useRef} from "react";
import {RemoteAdapter} from "../types";

type RemoteLoader = () => Promise<RemoteAdapter>;

export function useRemoteModule(
    remoteLoader: RemoteLoader,
    remoteName: string,
    props: unknown
) {
  const containerRef = useRef(null);
  const remoteModuleRef = useRef<RemoteAdapter | null>(null);
  const mountedContainer = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function mountRemote() {
      try {
        const module = await remoteLoader() as RemoteAdapter;
        console.log(`Mounting ${remoteName} ...`);
        if (!cancelled && containerRef.current) {
          remoteModuleRef.current = module;
          mountedContainer.current = containerRef.current;
          module.render(mountedContainer.current, props);
        }
      } catch (error) {
        console.error(`Error loading remote ${remoteName}:`, error);
      }
    }

    mountRemote();

    return () => {
      cancelled = true;
      console.log(`Unmounting ${remoteName}...`, containerRef.current, remoteModuleRef.current);
      if (mountedContainer.current && remoteModuleRef.current) {
        console.log(`Unmounting ${remoteName} ...`);
        remoteModuleRef.current.unmount(mountedContainer.current);
      }
    };
  }, [remoteLoader, remoteName, props]);

  return containerRef;
}