
    export type RemoteKeys = 'rsbuild-remote';
    type PackageType<T> = T extends 'rsbuild-remote' ? typeof import('rsbuild-remote') :any;