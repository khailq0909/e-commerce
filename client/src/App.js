import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom'
import {Login,Home,Public, Register, VerifyAccount} from './pages/public/Index'
import path from './ultils/path'
function App() {
  return (
    <div className="min-h-screen font-main relative">
      <Routes>
        <Route path={path.PUBLIC} element={<Public/>}>
            <Route path={path.LOGIN} element={<Login/>}/>
            <Route path={path.REGISTER} element={<Register/>}/>
            <Route path={path.HOME} element={<Home/>}/>
        </Route>
        <Route path={path.VERIFYACCOUNT} element={<VerifyAccount/>}/>

      </Routes>
    </div>
  );
}

export default App;
