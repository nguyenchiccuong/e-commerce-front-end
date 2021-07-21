import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Col, Form, FormGroup, Label, Input } from "reactstrap";
import React, { Component } from "react";
import { post, put, del } from "../../httpHelper";

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

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  async toggleSave() {
    if (this.state.categoryName === undefined || this.state.categoryName.trim() === "") {
      this.setState({
        message: "Invalid input",
      });
      setTimeout(() => {
        this.setState({
          message: "",
        });
      }, 2000);
      return;
    }
    let result = null;
    let category = {};
    category.categoryName = this.state.categoryName;
    if (this.props.business === "add") {
      try {
        result = await post(`employee/category/parent`, category);
      } catch (error) {
        console.log(error.response);
        this.setState({
          message:
            error.response === undefined
              ? "Fail to save data"
              : error.response.data.errorCode !== undefined
              ? error.response.data.errorCode
              : error.response.data.message !== undefined
              ? error.response.data.message
              : "Fail to save data",
        });
        setTimeout(() => {
          this.setState({
            message: "",
          });
        }, 2000);
        return;
      }
      this.props.receiveResult(result);
      this.setState({
        modal: !this.state.modal,
        categoryName: "",
      });
    } else if (this.props.business === "addsub") {
      category.id = this.props.parentCategoryId;
      try {
        result = await post(`employee/category/sub`, category);
      } catch (error) {
        console.log(error);
        this.setState({
          message:
            error.response === undefined
              ? "Fail to save data"
              : error.response.data.errorCode !== undefined
              ? error.response.data.errorCode
              : error.response.data.message !== undefined
              ? error.response.data.message
              : "Fail to save data",
        });
        setTimeout(() => {
          this.setState({
            message: "",
          });
        }, 2000);
        return;
      }
      this.props.receiveResult(result);
      this.setState({
        modal: !this.state.modal,
        categoryName: "",
      });
    } else if (this.props.business === "update") {
      category.id = this.props.categoryId;
      try {
        result = await put(`employee/category`, category);
      } catch (error) {
        console.log(error);
        this.setState({
          message:
            error.response === undefined
              ? "Fail to save data"
              : error.response.data.errorCode !== undefined
              ? error.response.data.errorCode
              : error.response.data.message !== undefined
              ? error.response.data.message
              : "Fail to save data",
        });
        setTimeout(() => {
          this.setState({
            message: "",
          });
        }, 2000);
        return;
      }
      this.props.receiveResult(result);
      this.setState({
        modal: !this.state.modal,
      });
    } else if (this.props.business === "del") {
      try {
        result = await del(`employee/category/${this.props.categoryId}`);
      } catch (error) {
        console.log(error);
        this.setState({
          message:
            error.response === undefined
              ? "Fail to delete data"
              : error.response.data.errorCode !== undefined
              ? error.response.data.errorCode
              : error.response.data.message !== undefined
              ? error.response.data.message
              : "Fail to delete data",
        });
        setTimeout(() => {
          this.setState({
            message: "",
          });
        }, 2000);
        return;
      }
      this.props.receiveResult(result);
      this.setState({
        modal: !this.state.modal,
      });
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
