import React, { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Register from './pages/Register';


function App() {
  const spacing = {
    margin: "1em"
  }
  return (
    <BrowserRouter>
    <nav>
      <Link to='/' style={spacing}>Home</Link>
      <Link to='/register' style={spacing}>Register</Link>
    </nav>
      <Routes>
        <Route path='/' element={ <Homepage /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/testing' element={ <div><h1>Testing...</h1></div> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
