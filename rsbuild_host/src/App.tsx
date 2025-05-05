import './App.css';

import RsbuildRemote from 'rsbuild-remote';
import {Route, Routes} from "react-router";
import {ViteEsmWrapper} from "./pages/ViteEsmWrapper.tsx";
import {ViteRemoteWrapper} from "./pages/ViteRemoteWrapper.tsx";
import {HostInfo} from "./pages/HostInfo.tsx";
import {Layout} from "./Layout.tsx";
import {ViteDynamicRemoteWrapper} from "./pages/ViteDynamicRemoteWrapper.tsx";
import {ExternalsViteEsmWrapper} from "./pages/ExternalsViteEsmWrapper.tsx";


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
          <Route path="vite_esm" element={<ViteEsmWrapper routerBasename={'/vite_esm'}/>}/>
          <Route path="vite_esm_externals" element={<ExternalsViteEsmWrapper routerBasename={'/vite_esm_externals'}/>}/>
        </Route>
      </Routes>
  );
};

export default App;
