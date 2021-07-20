import React, { Component } from "react";
import "./ProductManage.css";
import Navbar from "../NavBar";
import SideBar from "../SideBar";
import Footer from "../Footer";
import { Button, Input, CardImg, InputGroup, InputGroupAddon, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";

export default class index extends Component {
  render() {
    return (
      <div>
        <Navbar signInType="em" palce="product" />
        <section>
          <div className="d-flex text-white align-items-stretch justify-content-between manage-body-content">
            <div className="flex-fill side-bar px-auto">
              <SideBar />
            </div>
            <div className="w-75 flex-fill main-content overflow-auto"> </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
