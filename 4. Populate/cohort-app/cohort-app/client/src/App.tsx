// import React, { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import NavBar from './components/NavBar';
import { AuthContextProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Pets from './pages/Pets';


function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={ <Homepage /> } />
          <Route path='/register' element={ <Register /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/pets' element={ <Pets /> } />
          <Route path='/testing' element={ <div><h1>Testing...</h1></div> } />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
