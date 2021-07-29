import React, { Component } from "react";
import Login from "./components/Login";
import CustomerLogin from "./components/CustomerLogin";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CategoryManage from "./components/CategoryManage";
import ProductManage from "./components/ProductManage";
import CustomerManage from "./components/CustomerManage";
import Product from "./components/Product";
import ProductDetail from "./components/ProductDetail";
import ProtectedRoute from "./components/ProtectedRoute";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/employee/signin">
              <Login signInType="em" />
            </Route>
            <Route exact path="/signin">
              <CustomerLogin />
            </Route>
            <ProtectedRoute exact path="/manage/category" component={CategoryManage} />

            <ProtectedRoute exact path="/manage/product" component={ProductManage} />

            <ProtectedRoute exact path="/manage/customer" component={CustomerManage} />
            {/* <Route exact path="/manage/category">
              <CategoryManage />
            </Route>
            <Route exact path="/manage/product">
              <ProductManage />
            </Route>
            <Route exact path="/manage/customer">
              <CustomerManage />
            </Route> */}
            <Route exact path="/home">
              <Product />
            </Route>
            <Route exact path="/product-detail/:productId">
              <ProductDetail />
            </Route>
            <Route path="/**" render={() => <h2>Not found</h2>}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
