import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { post, put, del } from "../../httpHelper";
import {
  saveParentCategoryFailException,
  saveSubCategoryFailException,
  updateCategoryFailException,
  deleteCategoryFailException,
  invalidCategoryNameException,
} from "../../exception/CategoryException";

export default class CategoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      categoryName: this.props.categoryName,
      message: "",
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
      result = await post(`employee/category/parent`, category);
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
      result = await post(`employee/category/sub`, category);
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
      result = await put(`employee/category`, category);
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
      result = await del(`employee/category/${this.props.categoryId}`);
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

  handleCategoryNameChange(e) {
    this.setState({ categoryName: e.target.value });
  }

  render() {
    return (
      <div>
        <Button color={this.props.color} onClick={this.toggle}>
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
            <Button color={this.props.actionButtonColor} onClick={this.toggleSave}>
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
