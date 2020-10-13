import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewProducts from './pages/NewProducts';
import NewProductDetails from './pages/NewProductDetails';
import Article from './pages/Article';
import ProtectedRoutes from './ProtectedRoutes';

export default function Routes() {
  return (
    <Switch>
      {/* <ProtectedRoutes exact path="/portal" component={Portal} />
      <ProtectedRoutes exact path="/article" component={Article} />
      <ProtectedRoutes exact path="/newproducts" component={NewProduct} /> */}
      <Route exact path="/articles/:id" component={Article} />
      <Route exact path="/newproducts/:id" component={NewProductDetails} />
      <Route exact path="/newproducts" component={NewProducts} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
}
