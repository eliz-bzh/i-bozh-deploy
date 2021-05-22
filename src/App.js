import React from 'react';
import Products from './components/Products/Products';
import Navigation from './components/Navigation';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { References, Home, Brands, Types, Cart, LoginForm, RegistrationForm, Supplies, Suppliers, Order } from './components';
import Switcher from './components/Switcher';

function App() {

  return (
    <BrowserRouter>
      <div className='container'>
        <div className='d-flex justify-content-end mt-3'>
          <Switcher />
        </div>
        <Switch>
          <Route path='/' component={LoginForm} exact />

          <Route path='/registration' component={RegistrationForm} />
          <Route path='/admin'>
            <span className='logo mb-2' />
            <Navigation />

            <Switch>
              <Route path='/admin/home'><Home /></Route>
              <Route path='/admin/products'><Products role='admin' /></Route>
              <Route path='/admin/brands' component={Brands} />
              <Route path='/admin/types' component={Types} />
              <Route path='/admin/supplies' component={Supplies} />
              <Route path='/admin/suppliers' component={Suppliers} />
              <Route path='/admin/orders' component={Order} />
              <Route path='/admin/help'><References role='admin' /></Route>
            </Switch>
          </Route>

          <Route path='/client/:login' component={Navigation}>
            <span className='logo mb-2' />
            <Navigation />

            <Switch>
              <Route path='/client/:login/home'><Home /></Route>
              <Route path='/client/:login/products'><Products role='client' /></Route>
              <Route path='/client/:login/shoppingCart' component={Cart}></Route>
              <Route path='/client/:login/help'><References role='client' /></Route>
            </Switch>
          </Route>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;