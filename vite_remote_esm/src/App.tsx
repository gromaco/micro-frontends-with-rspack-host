import {BrowserRouter, Link, Route, Routes} from 'react-router';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const Index = () => (
    <div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo"/>
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo"/>
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Link to="/sub">Go to Sub Page</Link>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
);

const SubPage = () => (
    <div>
      <h1>I'm Vite Remote Subpage</h1>
      <Link to="/">Go to Home Page</Link>
    </div>
);

function App({routerBasename = '/'}: { routerBasename?: string } = {}) {
  return (
      <BrowserRouter basename={routerBasename}>
        <Routes>
          <Route path="/" element={<Index/>}/>
          <Route path="/sub" element={<SubPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App
