# Micro Frontends with Rspack and Vite

This project demonstrates how to implement micro frontends using an Rspack host and Vite remote modules, both with and
without Module Federation. It consists of three applications:

1. **`rsbuild_host`**  
   The main host application built with **Rsbuild**.  
   It consumes `rsbuild_remote` as a remote module and renders it, along with two variants of `vite_remote_mf`:
    - one using **Module Federation**
    - one as a regular **ESM module** (without Module Federation)

2. **`rsbuild_remote`**  
   A remote application built with **Rsbuild**, using the same React version as the host.

3. **`vite_remote_mf`**  
   A remote application built with **Vite**.  
   It provides two variants for its remote module:
    - one using the **Module Federation plugin**
    - one as a regular **ESM module**

### Start the app

```bash
npm run install:deps
npm run dev
```

This will install dependencies for all apps and start all of them.
It should automatically open http://localhost:3000 in your browser.