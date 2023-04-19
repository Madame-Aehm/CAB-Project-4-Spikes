import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  
  return (
    <Routes>
      <Route path='/' element={ <Homepage /> } />
      <Route path='register' element={ <Register /> } />
      <Route path='login' element={ <Login /> } />
    </Routes>
  );
}

export default App;
