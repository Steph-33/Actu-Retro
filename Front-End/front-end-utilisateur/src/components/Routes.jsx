import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import Article from './pages/Article';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewProduct from './pages/NewProduct';
// import Portal from './pages/Portal';
import ProtectedRoutes from './ProtectedRoutes';

export default function Routes() {
  return (
    <Switch>
      {/* <ProtectedRoutes exact path="/portal" component={Portal} />
      <ProtectedRoutes exact path="/article" component={Article} />
      <ProtectedRoutes exact path="/newproducts" component={NewProduct} /> */}
      <Route exact path="/newproducts" component={NewProduct} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
}
