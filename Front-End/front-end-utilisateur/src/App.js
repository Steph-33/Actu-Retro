import React, { useEffect, useReducer } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './components/Routes';
import AuthContext from './components/AuthContext';
import reducer from './reducer';

function App() {
  const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
  };

  const[state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
    
      if (token) {
        const result = await axios(`http://localhost:8080/api/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        dispatch({
          type: "LOAD_USER",
          payload: result.data,
          
        });
      }
    };
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{state, dispatch}}>
    <Router>  
        <Routes />
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
