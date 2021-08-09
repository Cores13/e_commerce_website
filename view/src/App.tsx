import React, { useContext } from "react";
import { GlobalState } from "./GlobalState";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Cart } from "./pages/cart/Cart";
import { Landing } from "./pages/landing/Landing";
import { Login } from "./pages/login/Login";
import { Products } from "./pages/products/Products";
import { Register } from "./pages/register/Register";
import { NotFound } from "./pages/notFound/NotFound";
import { ProductDetail } from "./pages/productDetail/ProductDetail";

import "./App.css";

function App() {
  const state = useContext(GlobalState);
  const [isLogged] = state?.userAPI?.isLogged;
  // const [isAdmin, setIsAdmin] = state?.userAPI?.isAdmin;

  return (
    // <DataProvider>
    <Router>
      <div className='App'>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            {isLogged ? <Landing /> : <Login />}
            {/* <Landing /> */}
          </Route>
          <Route exact path='/cart'>
            {isLogged ? <Cart /> : <Login />}
            {/* <Cart /> */}
          </Route>
          <Route exact path='/login'>
            {isLogged ? <Landing /> : <Login />}
            {/* <Login /> */}
          </Route>
          <Route exact path='/register'>
            {isLogged ? <Landing /> : <Register />}
            {/* <Register /> */}
          </Route>
          <Route exact path='/products'>
            {isLogged ? <Products /> : <Login />}
            {/* <Products /> */}
          </Route>
          <Route exact path='/detail/:id'>
            {isLogged ? <ProductDetail /> : <Login />}
            {/* <ProductDetail /> */}
          </Route>
          <Route exact path='*'>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
    // </DataProvider>
  );
}

export default App;
