# Micro Frontends with Rspack and Vite

This project demonstrates how to implement micro frontends using an Rspack host and Vite remote modules, both with and
without Module Federation. It consists of four applications:

1. **`rsbuild_host`**  
   The main host application built with **Rsbuild**.  
   It consumes `rsbuild_remote` as a remote module and renders it, along with two variants of Vite remotes:
    - `vite_remote_mf` using **Module Federation**
    - `vite_remote_esm` as a regular **ESM module** (no Module Federation)

2. **`rsbuild_remote`**  
   A remote application built with **Rsbuild**, using the same React version as the host.

3. **`vite_remote_mf`**  
   A remote application built with **Vite**.  
   It exposes its module via the **Module Federation** plugin for consumption by the host.

4. **`vite_remote_esm`**  
   A remote application built with **Vite**.  
   It exposes its module as a plain ESM build for direct import by the host (no Module Federation).

---

## Quick Start

```bash
npm install
npm run dev
```

This will install dependencies for all apps and start all of them.
It should automatically open http://localhost:3000 in your browser.