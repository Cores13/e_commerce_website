import React, { useContext } from "react";
import { GlobalState } from "./GlobalState";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Cart } from "./pages/cart/Cart";
import { Landing } from "./pages/landing/Landing";
import { Login } from "./pages/login/Login";
import { Products } from "./pages/products/Products";
import { Register } from "./pages/register/Register";
import { PaymentHistory } from "./pages/history/PaymentHistory";
import { PaymentDetail } from "./pages/history/PaymentDetail";
import { NotFound } from "./pages/notFound/NotFound";
import { ProductDetail } from "./pages/productDetail/ProductDetail";
import { Categories } from "./pages/categories/Categories";
import { CreateProduct } from "./pages/createProduct/CreateProduct";
import "./App.css";

function App() {
  const state = useContext(GlobalState);
  const [isLogged] = state?.userAPI?.isLogged;
  const [isAdmin] = state?.userAPI?.isAdmin;

  // TODO: ADDRESS

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Landing />
          </Route>
          <Route exact path='/cart'>
            <Cart />
          </Route>
          <Route exact path='/login'>
            {isLogged ? <Landing /> : <Login />}
          </Route>
          <Route exact path='/register'>
            {isLogged ? <Landing /> : <Register />}
          </Route>
          <Route exact path='/products'>
            <Products />
          </Route>
          <Route exact path='/detail/:id'>
            <ProductDetail />
          </Route>
          <Route exact path='/history'>
            {isLogged ? <PaymentHistory /> : <Login />}
          </Route>
          <Route exact path='/history/:id'>
            {isLogged ? <PaymentDetail /> : <Login />}
          </Route>
          <Route exact path='/category'>
            {isAdmin ? <Categories /> : <Login />}
          </Route>
          <Route exact path='/create_product'>
            {isAdmin ? <CreateProduct /> : <Login />}
          </Route>
          <Route exact path='*'>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
