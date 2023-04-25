import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={ <Homepage /> } />
          <Route path='/login' element={ <Login /> } />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
