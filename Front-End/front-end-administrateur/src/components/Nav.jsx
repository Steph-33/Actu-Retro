import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  NavLink,
  Switch,
  Redirect,
} from 'react-router-dom';
import Article from './pages/Article';
import Login from './pages/Login';
import NewProduct from './pages/NewProduct';
import Portal from './pages/Portal';

export default function Nav() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/portal" component={Portal} />
        <Route exact path="/article" component={Article} />
        <Route exact path="/newproduct" component={NewProduct} />
      </Switch>
    </BrowserRouter>
  );
}
