import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom'
import {Login,Home,Public} from './pages/public/Index'
import path from './ultils/path'
function App() {
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public/>}>
            <Route path={path.LOGIN} element={<Login/>}/>
            <Route path={path.HOME} element={<Home/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
