import React, { Component } from "react";
import "./CustomerSignUp.css";
import { Button, Input, Label, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import * as CustomerService from "../../service/CustomerService";
import checkPattern from "../../util/filter";
import {
  invalidUsernameException,
  invalidNameException,
  invalidEmailException,
  invalidPhoneNumberException,
  invalidPasswordException,
  invalidRepeatPasswordException,
  notCheckAgreementException,
  customerSignUpFailException,
} from "../../exception/UserException";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      isChecked: false,
      name: "",
      email: "",
      username: "",
      phoneNumber: "",
      password: "",
      repeatPassword: "",
      errorUsername: "",
      errorName: "",
      errorEmail: "",
      errorPhonenumber: "",
      errorPassword: "",
      errorRepeatPassword: "",
      errorAgreement: "",
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };

  clearForm(e) {
    this.setState({ isChecked: false });
    e.target[6].checked = false;
    this.setState({ name: "" });
    this.setState({ email: "" });
    this.setState({ username: "" });
    this.setState({ phoneNumber: "" });
    this.setState({ password: "" });
    this.setState({ repeatPassword: "" });
    this.setState({
      notiContent: "Create account success",
    });
  }

  clearErrorMessage() {
    setTimeout(() => {
      this.setState({
        errorUsername: "",
        errorName: "",
        errorEmail: "",
        errorPhonenumber: "",
        errorPassword: "",
        errorRepeatPassword: "",
        errorAgreement: "",
      });
    }, 2000);
  }

  async signup(user, e) {
    let result;
    try {
      result = await CustomerService.customerSignUp(user);
    } catch (error) {
      console.log(error);
      this.setState({
        notiContent: customerSignUpFailException(error),
      });
      this.toggle();
      return;
    }
    if (result.status === 200) {
      this.clearForm(e);

      this.toggle();
    }
  }

  handleSignUp(e) {
    e.preventDefault();
    let name = e.target.name.value.trim();
    let email = e.target.email.value.trim();
    let username = e.target.username.value.trim();
    let phoneNumber = e.target.phoneNumber.value.trim();
    let password = e.target.password.value.trim();
    let repeatPassword = e.target.repeatPassword.value.trim();
    let isChecked = this.state.isChecked;

    let patternName =
      /[a-zA-Z ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????]+/;
    let patternID = /^[a-zA-Z][a-zA-Z0-9.]{7,15}/; //char num . 8->16
    let patternPhoneNumber = /[0-9]+/;
    let patternEmail = /^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
    // let patternEmail = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,}){1,}$/; more truth
    let patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
    //Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:

    if (checkPattern(patternID, username) === false) {
      this.setState({
        errorUsername: invalidUsernameException(),
      });
      this.clearErrorMessage();
      return;
    }

    if (checkPattern(patternName, name) === false || name.trim() === "") {
      this.setState({
        errorName: invalidNameException(),
      });
      this.clearErrorMessage();
      return;
    }

    if (email !== "") {
      if (checkPattern(patternEmail, email) === false) {
        this.setState({
          errorEmail: invalidEmailException(),
        });
        this.clearErrorMessage();
        return;
      }
    }

    if (phoneNumber !== "") {
      if (checkPattern(patternPhoneNumber, phoneNumber) === false || (phoneNumber.length < 7 && phoneNumber.length > 12) === true) {
        this.setState({
          errorPhonenumber: invalidPhoneNumberException(),
        });
        this.clearErrorMessage();
        return;
      }
    }

    if (checkPattern(patternPassword, password) === false) {
      this.setState({
        errorPassword: invalidPasswordException(),
      });
      this.clearErrorMessage();
      return;
    }

    if (password.localeCompare(repeatPassword) !== 0) {
      this.setState({
        errorRepeatPassword: invalidRepeatPasswordException(),
      });
      this.clearErrorMessage();
      return;
    }

    if (isChecked === false) {
      this.setState({
        errorAgreement: notCheckAgreementException(),
      });
      this.clearErrorMessage();
      return;
    }

    let user = {};
    user.name = name;
    user.email = email === "" ? null : email;
    user.username = username;
    user.phoneNumber = phoneNumber === "" ? null : phoneNumber;
    user.password = password;
    this.signup(user, e);
  }

  handleFieldChange(e, key) {
    this.setState({ [key]: e.target.value });
  }

  render() {
    return (
      <div className="sign-up">
        <h3 className="pl-4">Sign up now to get free 3$!</h3>
        <Form onSubmit={(e) => this.handleSignUp(e)}>
          <div className="form-group pl-4 pr-3 pt-1 mb-1 pr-3">
            <Label for="username">Username</Label>
            <span className="tooltip-text">(*)</span>
            <Input
              type="text"
              name="username"
              className="form-control"
              id="username"
              placeholder="Char, num, . (8-16)"
              value={this.state.username}
              onChange={(e) => this.handleFieldChange(e, "username")}
            />
            <small className="text-danger">{this.state.errorUsername}</small>
          </div>
          <div className="form-group pl-4 pr-3 pt-1 mb-1">
            <Label for="name">Name</Label>
            <span className="tooltip-text">(*)</span>
            <Input
              type="text"
              name="name"
              className="form-control"
              id="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.handleFieldChange(e, "name")}
            />
            <small className="text-danger">{this.state.errorName}</small>
          </div>
          <div className="form-group pl-4 pr-3 pt-1 mb-1">
            <Label for="email">Email</Label>
            <span className="tooltip-text"></span>
            <Input
              type="email"
              name="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.handleFieldChange(e, "email")}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
            <small className="text-danger">{this.state.email}</small>
          </div>
          <div className="form-group pl-4 pr-3 pt-1 mb-1">
            <Label for="phoneNumber">Phone number</Label>
            <span className="tooltip-text"></span>
            <Input
              type="text"
              name="phoneNumber"
              className="form-control"
              id="phoneNumber"
              placeholder="Phone number"
              value={this.state.phoneNumber}
              onChange={(e) => this.handleFieldChange(e, "phoneNumber")}
            />
            <small className="text-danger">{this.state.errorPhonenumber}</small>
          </div>
          <div className="form-group pl-4 pr-3 pt-1 mb-1">
            <Label for="password">Password</Label>
            <span className="tooltip-text">(*)</span>
            <Input
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="Uppercase, lowercase, special char, number (8-10)"
              value={this.state.password}
              onChange={(e) => this.handleFieldChange(e, "password")}
            />
            <small className="text-danger">{this.state.errorPassword}</small>
          </div>
          <div className="form-group pl-4 pr-3 pt-1 mb-1">
            <Label for="repeatPassword">Repeat password</Label>
            <span className="tooltip-text">(*)</span>
            <Input
              type="password"
              name="repeatPassword"
              className="form-control"
              id="repeatPassword"
              placeholder="Repeat Password"
              value={this.state.repeatPassword}
              onChange={(e) => this.handleFieldChange(e, "repeatPassword")}
            />
            <small className="text-danger">{this.state.errorRepeatPassword}</small>
          </div>
          <div className="form-group form-check pl-4 pr-3">
            <input
              type="checkbox"
              name="agree"
              className="form-check-input"
              id="showRepeatPass"
              defaultChecked={this.state.isChecked}
              onChange={this.toggleChange}
            />
            <Label className="form-check-label" for="showRepeatPass">
              I have read and agree with all agreement!
            </Label>
            <small className="text-danger">{this.state.errorAgreement}</small>
          </div>
          <Button type="submit" color="primary" className="submit-button w-100 text-center">
            Sign up
          </Button>
        </Form>
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
