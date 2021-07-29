import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {DataProvider} from './GlobalState'
import {Navbar} from './components/navbar/Navbar'
import {Cart} from './components/pages/cart/Cart'
import {Landing} from './components/pages/landing/Landing'
import {Login} from './components/pages/login/Login'
import {Products} from './components/pages/products/Products'
import {Register} from './components/pages/register/Register'
import {NotFound} from './components/pages/notFound/NotFound'


import './App.css';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route exact path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
