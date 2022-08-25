import React from 'react';

import './App.css';
import Login from './components/Login/Login';
import Dashboard from './containers/Dashboard/Dashboard';

const code = new URLSearchParams(window.location.search).get('code');

const App = () => {
  return code ? <Dashboard code={code} /> : <Login />;
};

export default App;
