import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewProducts from './pages/NewProducts';
import NewProductDetails from './pages/NewProductDetails';
import UsedProducts from './pages/UsedProducts';
import UsedProductDescription from './pages/UsedProductDescription';
import Article from './pages/Article';
import CreateAnnouncement from './pages/CreateAnnouncement'
import ProtectedRoutes from './ProtectedRoutes';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/createannouncement" component={CreateAnnouncement} />
      <Route exact path="/articles/:id" component={Article} />
      <Route exact path="/newproducts/:id" component={NewProductDetails} />
      <Route exact path="/newproducts" component={NewProducts} />
      <Route exact path="/usedproducts/:id" component={UsedProductDescription} />
      <Route exact path="/usedproducts" component={UsedProducts} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
}
