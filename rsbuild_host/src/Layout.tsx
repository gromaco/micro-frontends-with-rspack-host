import {NavLink, Outlet} from "react-router";

export const Layout = () => {
  return (
      <>
        <nav className={"nav"}>
          <NavLink to="/" end>
            Host Info
          </NavLink>
          <NavLink to="/rsbuild_remote" end>
            Rsbuild Remote
          </NavLink>
          <NavLink to="/vite_esm_externals" end>
            Externals Vite ESM
          </NavLink>
          <NavLink to="/vite_esm" end>
            Vite ESM
          </NavLink>
          <NavLink to="/vite_remote" end>
            Vite Remote MF
          </NavLink>
          <NavLink to="/vite_dynamic_remote" end>
            Vite Dynamic Remote
          </NavLink>
        </nav>
        <div className="content">
          <Outlet/>
        </div>
      </>
  );
};