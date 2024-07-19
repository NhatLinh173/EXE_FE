import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import About  from "./components/about";
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
import { OrderPage } from "./components/adminPage/orderPage";
import PaidTransactions from "./components/adminPage/paidTransactions.jsx";
import ProductManager from "./components/adminPage/productManage.jsx";
import AdminRoute from "./components/adminPage/AdminRoute.jsx";
import Unauthorized from "./components/unauthorized.jsx";
import Loading from "./components/loading.jsx";
import withLoading from "./components/withLoading";

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
            <Route path="/login" component={withLoading(Login)} />
            <Route path="/" exact component={withLoading(Header)} />
            <Route path="/services" component={withLoading(Service)} />
            <Route path="/about" component={withLoading(About)} />
            <Route path="/profile" component={withLoading(Profile)} />
            <Route path="/order-detail" component={withLoading(Order)} />
            <Route path="/admin" component={withLoading(AdminPage)} />
            <Route path="/cart" component={withLoading(Cart)} />
            <Route path="/category">
              <Category cart={cart} addToCart={addToCart} />
            </Route>
            <Route path="/productdetail/:productId">
              <ProductDetail addToCart={addToCart} />
            </Route>
            <Route path="/checkout" component={withLoading(Checkout)} />
            <Route path="/success" component={withLoading(SuccessPage)} />
            <Route path="/fail" component={withLoading(FailurePage)} />
            <AdminRoute
              path="/admin-user"
              component={withLoading(UserManagement)}
            />
            <AdminRoute
              path="/admin-order"
              component={withLoading(OrderPage)}
            />
            <AdminRoute
              path="/admin-paid"
              component={withLoading(PaidTransactions)}
            />
            <AdminRoute
              path="/admin-product"
              component={withLoading(ProductManager)}
            />
            <Route path="/unauthorized" component={withLoading(Unauthorized)} />
            <Route path="/loading" component={withLoading(Loading)} />
          </Switch>
          <Contact />
        </div>
      </AppWrapper>
    </Router>
  );
};

export default App;
