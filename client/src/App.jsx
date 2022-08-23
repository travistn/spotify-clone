import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Login from './components/Login/Login';
import Dashboard from './containers/Dashboard/Dashboard';
import Search from './containers/Search/Search';
import { AppContext } from './contexts/AppContext';

const code = new URLSearchParams(window.location.search).get('code');

const App = () => {
  const [playingTrack, setPlayingTrack] = useState();

  const contextValues = { playingTrack };

  return code ? (
    <AppContext.Provider value={contextValues}>
      <Routes>
        <Route path='/' element={<Dashboard code={code} />}>
          <Route path='search' element={<Search setPlayingTrack={setPlayingTrack} />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  ) : (
    <Login />
  );
};

export default App;
