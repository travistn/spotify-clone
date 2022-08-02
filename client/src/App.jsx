import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Login from './components/Login/Login';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
