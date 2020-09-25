import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Article from './pages/Article';
import Login from './pages/Login';
import NewProduct from './pages/NewProduct';
import Portal from './pages/Portal';

export default function Nav() {
  const [firstname, setFirstname] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const getUserSession = () => {
    const firstname = localStorage.getItem('firstname');
    setFirstname(firstname);
  };

  useEffect(() => {
    getUserSession();
    setRefresh(true);
    if (refresh) {
      window.location = '/';
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setRefresh(true);
    if (refresh) {
      window.location = '/';
    }
  };
  return (
    <BrowserRouter>
      <nav>
        <div className="box-links">
          {firstname ? (
            <div className="box-session">
              <img
                className="logo"
                src="/assets/images/logo_acturetro_rectangle.png"
                alt="logo"
              />
              <img
                onClick={logout}
                className="sign-out"
                src="/assets/images/deconnexion.png"
                alt="deconnexion"
              />
            </div>
          ) : null}
        </div>
      </nav>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/portal" component={Portal} />
        <Route exact path="/article" component={Article} />
        <Route exact path="/newproduct" component={NewProduct} />
      </Switch>
    </BrowserRouter>
  );
}
