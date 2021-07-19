import React, { Component } from "react";
import Login from "../Login";
import CustomerSignUp from "../CustomerSignUp";

export default class index extends Component {
  render() {
    return (
      <div>
        <Login signInType="cus" />
        <CustomerSignUp />
      </div>
    );
  }
}
