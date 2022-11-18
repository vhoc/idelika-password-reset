import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RestorePassword from './RestorePassword'

function App() {

  return (
    <BrowserRouter basename='/recover-account'>
      <Routes>
        <Route path='/:usuarioId/:token/' element={<RestorePassword/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
