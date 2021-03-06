import React, { Component } from "react";
import { Navbar, NavbarBrand, Button, Form, Label, Input, CardImg, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Redirect, withRouter } from "react-router-dom";
import "./Login.css";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import logo from "../../img/logo.png";
import checkPattern from "../../util/filter";
import * as CustomerService from "../../service/CustomerService";
import * as EmployeeService from "../../service/EmployeeService";
import {
  employeeSignInFailException,
  customerSignInFailException,
  usernamePasswordWrongException,
  serverErrorExceptionException,
  invalidUsernameException,
  nullUsernameException,
  invalidPasswordException,
  nullPasswordException,
} from "../../exception/UserException";

class index extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      signInType: this.props.signInType,
      modal: false,
      notiContent: "",
      cus: this.props.cookies.get("cus") || "",
      em: this.props.cookies.get("em") || "",
      review: this.props.cookies.get("review") || "",
    };

    this.toggle = this.toggle.bind(this);
  }

  customerSignInResult(result) {
    if (result.data.successCode === "SUCCESS_CUSTOMER_LOGIN" && result.data.data.role === "ROLE_CUSTOMER") {
      const { cookies } = this.props;
      cookies.set("cus", JSON.stringify(result.data.data), { expires: new Date(new Date().valueOf() + 1000 * 3600 * 24), path: "/" });
      this.setState({ cus: cookies.get("cus") });
      localStorage.setItem("cus", JSON.stringify(result.data.data));
      //redirect to product page or review page page
    } else {
      this.setState({
        notiContent: usernamePasswordWrongException(),
      });
      this.toggle();
    }
  }

  employeeSignInResult(result) {
    if (
      result.data.successCode === "SUCCESS_EMPLOYEE_LOGIN" &&
      (result.data.data.role === "ROLE_EMPLOYEE" || result.data.data.role === "ROLE_MANAGER" || result.data.data.role === "ROLE_ADMIN")
    ) {
      const { cookies } = this.props;
      cookies.set("em", JSON.stringify(result.data.data), { expires: new Date(new Date().valueOf() + 1000 * 3600 * 24), path: "/" });
      this.setState({ em: cookies.get("em") });
      localStorage.setItem("em", JSON.stringify(result.data.data));
      //redirect to manage page
    } else {
      this.setState({
        notiContent: usernamePasswordWrongException(),
      });
      this.toggle();
    }
  }

  async handleSignIn(e) {
    e.preventDefault();
    let username = e.target.username.value.trim();
    let pass = e.target.password.value.trim();
    let patternID = /^[a-zA-Z][a-zA-Z0-9.]{7,15}/; //char, num, . 8->16
    let patternPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
    //Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    if (checkPattern(patternID, username) === true && checkPattern(patternPass, pass) === true) {
      let user = {};
      user.username = username;
      user.password = pass;
      let result = null;
      if (this.state.signInType === "em") {
        try {
          result = await EmployeeService.employeeSignIn(user);
        } catch (error) {
          console.log(error);
          this.setState({
            notiContent: employeeSignInFailException(error),
          });
          this.toggle();
          return;
        }
      } else {
        try {
          result = await CustomerService.customerSignIn(user);
        } catch (error) {
          console.log(error);
          this.setState({
            notiContent: customerSignInFailException(error),
          });
          this.toggle();
          return;
        }
      }
      if (result.status === 200) {
        if (this.state.signInType === "em") {
          this.employeeSignInResult(result);
        } else {
          this.customerSignInResult(result);
        }
      } else {
        this.setState({
          notiContent: serverErrorExceptionException(),
        });
        this.toggle();
      }
    } else {
      if (pass.length === 0) {
        this.setState({
          notiContent: nullPasswordException(),
        });
        this.toggle();
      } else if (patternPass.test(pass) === false) {
        this.setState({
          notiContent: invalidPasswordException(),
        });
        this.toggle();
      }

      if (username.length === 0) {
        this.setState({
          notiContent: nullUsernameException(),
        });
        this.toggle();
      } else if (patternID.test(username) === false) {
        this.setState({
          notiContent: invalidUsernameException(),
        });
        this.toggle();
      }
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  interceptor() {
    if (this.state.signInType === "em" && this.state.em !== "") {
      // redirect to emp page
      return <Redirect to="/manage/product" />;
    } else if (this.state.signInType === "cus" && this.state.cus !== "") {
      if (this.state.review !== "") {
        return <Redirect to={`/product-detail/${this.state.review}`} />;
      } else {
        // redirect to pr page
        return <Redirect to="/home" />;
      }
    }
  }

  logoClick() {
    if (this.state.signInType === "cus") {
      this.props.history.push("/home");
    }
  }

  render() {
    return (
      <div className="login-form">
        {this.interceptor()}
        <Navbar className="bg-primary my-signin-nav" light expand="md">
          <NavbarBrand href="#">
            <CardImg width="100%" className="logo-img" src={logo} alt="" onClick={() => this.logoClick()} />
          </NavbarBrand>
          <h1>THE FIT SHOP</h1>
          <Form inline className="my-2 my-lg-0 ml-auto" onSubmit={(e) => this.handleSignIn(e)}>
            <h5 className="mr-5">Have an account. Sign in now!</h5>
            <FormGroup>
              <Label className="mr-3" for="username">
                USERNAME
              </Label>
              <Input className="form-control mr-sm-2" type="text" name="username" placeholder="Username" id="username" />
            </FormGroup>
            <FormGroup>
              <Label className="mr-3" for="password">
                PASSWORD
              </Label>
              <Input className="form-control mr-sm-2" type="password" name="password" placeholder="Password" id="password" />
            </FormGroup>

            <Button className="btn btn-success my-2 my-sm-0" type="submit">
              Sign in
            </Button>
          </Form>
        </Navbar>
        {/* noti modal */}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Alert</ModalHeader>
          <ModalBody>{this.state.notiContent}</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Dismiss
            </Button>
          </ModalFooter>
        </Modal>
        {/* noti modal */}
      </div>
    );
  }
}

export default withCookies(withRouter(index));
