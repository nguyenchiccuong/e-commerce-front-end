import React, { Component } from "react";
import "./SideBar.css";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  render() {
    return (
      <div className="d-flex flex-column">
        <h2 className="text-center text-dark">MANAGEMENT</h2>
        <Button color="dark" className="w-75 mb-3">
          <Link to={"/manage/category"} className="text-light">
            <h3>Category</h3>
          </Link>
        </Button>
        <Button color="dark" className="w-75 mb-3">
          <Link to={"/manage/product"} className="text-light">
            <h3>Product</h3>
          </Link>
        </Button>
        <Button color="dark" className="w-75 mb-3">
          <Link to={"/manage/customer"} className="text-light">
            <h3>Customer</h3>
          </Link>
        </Button>
      </div>
    );
  }
}
