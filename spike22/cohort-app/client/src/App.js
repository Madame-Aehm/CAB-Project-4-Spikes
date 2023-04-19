import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Register from './pages/Register';

function App() {
  
  return (
    <Routes>
      <Route path='/' element={ <Homepage /> } />
      <Route path='register' element={ <Register /> } />
    </Routes>
  );
}

export default App;
