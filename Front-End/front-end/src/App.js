import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/Routes';
import AuthContext from './components/AuthContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const value = {
    isAuthenticated,
    setIsAuthenticated,
  };
  return (
    <Router>
      <AuthContext.Provider value={value}>
        <Routes />
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
