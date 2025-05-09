import './App.css';

import RsbuildRemote from 'rsbuild-remote';
import {Route, Routes} from "react-router";
import {DevViteEsmWrapper} from "./pages/DevViteEsmWrapper.tsx";
import {ViteRemoteWrapper} from "./pages/ViteRemoteWrapper.tsx";
import {HostInfo} from "./pages/HostInfo.tsx";
import {Layout} from "./Layout.tsx";
import {ViteDynamicRemoteWrapper} from "./pages/ViteDynamicRemoteWrapper.tsx";
import {ExternalsViteEsmWrapper} from "./pages/ExternalsViteEsmWrapper.tsx";
import {ProductionViteEsmWrapper} from "./pages/ProductionViteESMWrapper.tsx";


const App = () => {
  return (
      <Routes>
        <Route element={<Layout/>}>
          <Route index element={<HostInfo/>}/>
          {/* Rsbuild with the same React version*/}
          <Route path="rsbuild_remote" element={<RsbuildRemote routerBasename={'/rsbuild_remote'}/>}/>
          <Route path="vite_remote" element={<ViteRemoteWrapper routerBasename={'/vite_remote'}/>}/>
          <Route path="vite_dynamic_remote"
                 element={<ViteDynamicRemoteWrapper routerBasename={'/vite_dynamic_remote'}/>}/>
          <Route path="vite_esm_prod" element={<ProductionViteEsmWrapper routerBasename={'/vite_esm_prod'}/>}/>
          <Route path="vite_esm_dev" element={<DevViteEsmWrapper routerBasename={'/vite_esm_dev'}/>}/>
          <Route path="vite_esm_externals" element={<ExternalsViteEsmWrapper routerBasename={'/vite_esm_externals'}/>}/>
        </Route>
      </Routes>
  );
};

export default App;
