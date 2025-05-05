import React from 'react';
import './ProviderComponent.css';
import {BrowserRouter, Link, Route, Routes} from "react-router";


const Index = () => {
  return (
      <div className="container">
        <div className="icon-container">
          <img
              src="https://module-federation.io/svg.svg"
              alt="logo"
              className="logo-image"
          />
        </div>
        <h1 className="title">I'm Rsbuild Remote</h1>
        <h2>Hello Module Federation 2.0</h2>
        Navigate to <Link to="/sub">Sub Page</Link>
      </div>
  );
}

const SubPage = () => {
  return (
      <div className="container">
        <h1 className="title">I'm Rsbuild Remote Subpage</h1>

        Navigate to <Link to="/">Remote Home Page</Link>
      </div>
  )
}
const Provider: React.FC<{ routerBasename?: string }> = ({routerBasename = '/'}) => {
  return (
      <BrowserRouter basename={routerBasename}>
        <Routes>
          <Route path="/" element={<Index/>}/>
          <Route path="/sub" element={<SubPage/>}/>
        </Routes>
      </BrowserRouter>

  );
};

export default Provider;
