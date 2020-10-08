import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Article from './pages/Article';
import ArticlesList from './pages/ArticlesList';
import Login from './pages/Login';
import NewProduct from './pages/NewProduct';
import NewProductsList from './pages/NewProductsList';
import Portal from './pages/Portal';
import ProtectedRoutes from './ProtectedRoutes';

export default function Routes() {
  return (
    <Switch>
      <ProtectedRoutes exact path="/portal" component={Portal} />
      <ProtectedRoutes exact path="/article" component={Article} />
      <ProtectedRoutes exact path="/articles" component={ArticlesList} />
      <ProtectedRoutes exact path="/newproduct" component={NewProduct} />
      <ProtectedRoutes exact path="/newproducts" component={NewProductsList} />
      <Route exact path="/" component={Login} />
    </Switch>
  );
}
