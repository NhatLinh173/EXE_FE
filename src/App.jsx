import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { About } from "./components/about";
import { Contact } from "./components/contact";
import { Category } from "./components/category";
import { Login } from "./components/login";
import ProductDetail from "./components/productDetail.jsx";
import "./App.css";
import { Profile } from "./components/profile";
import { Checkout } from "./components/checkout.jsx";
import { AdminPage } from "./components/adminPage/adminPage";
import { ToastContainer } from "react-toastify";
import { SuccessPage } from "./components/successPayment.jsx";
import { FailurePage } from "./components/cancalPayment.jsx";
import { Order } from "./components/order.jsx";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./components/cart";
import Service from "./components/service";
import AppWrapper from "../src/utils/AppWrapper.js";
import { UserManagement } from "./components/adminPage/userManagement ";
const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Router>
      <AppWrapper>
        <div>
          <Navigation />
          <ToastContainer />

          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/" exact>
              <Header />
            </Route>
            <Route path="/services">
              <Service />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/admin">
              <AdminPage />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/category">
              <Category cart={cart} addToCart={addToCart} />
            </Route>
            <Route path="/productdetail/:productId">
              <ProductDetail addToCart={addToCart} />
            </Route>
            <Route path="/checkout">
              <Checkout />
            </Route>
            <Route path="/success">
              <SuccessPage />
            </Route>
            <Route path="/fail">
              <FailurePage />
            </Route>
            <Route path="/order-detail">
              <Order />
            </Route>
            <Route path="/admin-user">
              <UserManagement />
            </Route>
          </Switch>
          <Contact />
        </div>
      </AppWrapper>
    </Router>
  );
};

export default App;
