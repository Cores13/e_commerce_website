import React, {useContext} from 'react'
import {GlobalState} from './GlobalState'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {DataProvider} from './GlobalState'
import {Navbar} from './components/navbar/Navbar'
import {Cart} from './pages/cart/Cart'
import {Landing} from './pages/landing/Landing'
import {Login} from './pages/login/Login'
import {Products} from './pages/products/Products'
import {Register} from './pages/register/Register'
import {NotFound} from './pages/notFound/NotFound'
import {ProductDetail} from './pages/productDetail/ProductDetail'


import './App.css';

function App() {
  const state = useContext(GlobalState);
  console.log(state);
  
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
            <Route exact path="/detail/:id">
              <ProductDetail />
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
