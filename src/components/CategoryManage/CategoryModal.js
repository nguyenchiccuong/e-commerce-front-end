import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input } from "reactstrap";
import * as CategoryService from "../../service/CategoryService";
import {
  saveParentCategoryFailException,
  saveSubCategoryFailException,
  updateCategoryFailException,
  deleteCategoryFailException,
  invalidCategoryNameException,
} from "../../exception/CategoryException";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { confirmAlert } from "react-confirm-alert"; // Import

class CategoryModal extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      categoryName: this.props.categoryName,
      message: "",
      em: this.props.cookies.get("em") || "",
      updateClassName: "",
      deleteClassName: "",
    };
    this.toggle = this.toggle.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.handleCategoryNameChange = this.handleCategoryNameChange.bind(this);
  }

  clearMessage() {
    setTimeout(() => {
      this.setState({
        message: "",
      });
    }, 2000);
  }

  clearCategoryNameForm() {
    this.setState({
      categoryName: "",
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
    this.setState({
      categoryName: this.props.categoryName,
    });
  }

  async saveCategory(category) {
    let result = null;
    try {
      result = await CategoryService.saveCategory(category);
    } catch (error) {
      console.log(error.response);
      this.setState({
        message: saveParentCategoryFailException(error),
      });
      this.clearMessage();
      return;
    }
    this.props.receiveResult(result);
    this.setState({
      modal: !this.state.modal,
    });
    this.clearCategoryNameForm();
  }

  async saveSubCategory(category) {
    category.id = this.props.parentCategoryId;
    let result = null;
    try {
      result = await CategoryService.saveSubCategory(category);
    } catch (error) {
      console.log(error);
      this.setState({
        message: saveSubCategoryFailException(error),
      });
      this.clearMessage();
      return;
    }
    this.props.receiveResult(result);
    this.setState({
      modal: !this.state.modal,
    });
    this.clearCategoryNameForm();
  }

  async updateCategory(category) {
    let result = null;
    category.id = this.props.categoryId;
    try {
      result = await CategoryService.updateCategory(category);
    } catch (error) {
      console.log(error);
      this.setState({
        message: updateCategoryFailException(error),
      });
      this.clearMessage();
      return;
    }
    this.props.receiveResult(result);
    this.setState({
      modal: !this.state.modal,
    });
  }

  async delCategory(category) {
    let result = null;
    try {
      result = await CategoryService.deleteCategory(this.props.categoryId);
    } catch (error) {
      console.log(error);
      this.setState({
        message: deleteCategoryFailException(error),
      });
      this.clearMessage();
      return;
    }
    this.props.receiveResult(result);
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleSave() {
    if (this.state.categoryName === undefined || this.state.categoryName.trim() === "") {
      this.setState({
        message: invalidCategoryNameException(),
      });
      this.clearMessage();
      return;
    }
    let category = {};
    category.categoryName = this.state.categoryName;
    if (this.props.business === "add") {
      this.saveCategory(category);
    } else if (this.props.business === "addsub") {
      this.saveSubCategory(category);
    } else if (this.props.business === "update") {
      this.updateCategory(category);
    } else if (this.props.business === "del") {
      this.delCategory(category);
    }
  }

  handleSaveClick = () => {
    if (this.props.business === "update" || this.props.business === "del") {
      confirmAlert({
        title: "Confirm to submit",
        message: "Are you sure to do this.",
        buttons: [
          {
            label: "Yes",
            onClick: () => this.toggleSave(),
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
        overlayClassName: "conform-box",
      });
    } else {
      this.toggleSave();
    }
  };

  handleCategoryNameChange(e) {
    this.setState({ categoryName: e.target.value });
  }

  componentDidMount() {
    if (this.state.em.role === "ROLE_EMPLOYEE") {
      if (this.props.business === "update") {
        this.setState({
          updateClassName: "d-none",
        });
      } else if (this.props.business === "del") {
        this.setState({
          deleteClassName: "d-none",
        });
      }
    } else if (this.state.em.role === "ROLE_MANAGER") {
      if (this.props.business === "del") {
        this.setState({
          deleteClassName: "d-none",
        });
      }
    }
  }

  render() {
    return (
      <div>
        <Button color={this.props.color} onClick={this.toggle} className={this.state.deleteClassName}>
          {this.props.buttonLabel}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg">
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
            <h4 className="text-danger">{this.state.message}</h4>
            <Form>
              <FormGroup row>
                <Label sm={4}>Id</Label>
                <Col sm={8}>
                  <Label>{this.props.categoryId}</Label>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="categoryName" sm={4}>
                  Category name
                </Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    name="categoryName"
                    id="categoryName"
                    placeholder="Category name"
                    value={this.state.categoryName}
                    onChange={this.handleCategoryNameChange}
                  />
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color={this.props.actionButtonColor} onClick={this.handleSaveClick} className={this.state.updateClassName}>
              {this.props.actionButtonLabel}
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default withCookies(CategoryModal);
