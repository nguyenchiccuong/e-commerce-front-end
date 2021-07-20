import React, { Component } from "react";
import "./NavBar.css";
import logo from "../../img/logo.png";
import { Button, Input, CardImg, InputGroup, InputGroupAddon, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

class index extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      signInType: this.props.signInType,
      place: this.props.place,
      signInClassName: "",
      notSignInClassName: "",
      cus: this.props.cookies.get("cus") || "",
      em: this.props.cookies.get("em") || "",
      name: "",
      signOutRedirect: "",
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  componentDidMount() {
    if (this.state.signInType === "em") {
      this.setState({ notSignInClassName: "d-none" });
      this.setState({ name: this.state.em.username });
      this.setState({ signOutRedirect: "/employee/signin" });
    } else if (this.state.signInType === "cus") {
      if (this.state.cus === "") {
        this.setState({ notSignInClassName: "d-none" });
        this.setState({ name: this.state.cus.username });
        this.setState({ signOutRedirect: "/signin" });
      } else {
        this.setState({ signInClassName: "d-none" });
      }
    }
  }

  handleSignOut() {
    if (this.state.signInType === "em") {
      const { cookies } = this.props;
      cookies.set("em", "", { expires: new Date(), path: "/" });
      this.setState({ em: cookies.get("em") });
      localStorage.removeItem("em");
    } else if (this.state.signInType === "cus") {
      const { cookies } = this.props;
      cookies.set("cus", "", { expires: new Date(), path: "/" });
      this.setState({ em: cookies.get("cus") });
      localStorage.removeItem("cus");
    }
    this.props.history.push(this.state.signOutRedirect);
    // window.location.href = this.state.signOutRedirect;
  }

  render() {
    return (
      <div className="my-nav-bar">
        <header>
          <div className="header d-flex p-3 bg-dark text-white justify-content-between">
            <div className="d-flex">
              <div className="ml-5 mr-3">
                <CardImg width="100%" className="logo-img" src={logo} alt="" />
              </div>
              <h3 className="align-self-center">THE FIT SHOP {this.state.signInType === "cus" ? "" : "MANAGE"}</h3>
            </div>
            <div className="w-25 align-self-center">
              {/* <!-- Another variation with a button --> */}
              <InputGroup className="input-group">
                <Input type="text" placeholder="Search anything" />
                <InputGroupAddon addonType="prepend">
                  <Button color="success">SEARCH</Button>
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div class="mr-5">
              <Link to={"/signin"} className={"text-light " + this.state.notSignInClassName}>
                Sign in
              </Link>
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className={this.state.signInClassName}>
                <DropdownToggle caret color="warning">
                  {this.state.name}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => this.handleSignOut()}>Sign out</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
export default withCookies(withRouter(index));
