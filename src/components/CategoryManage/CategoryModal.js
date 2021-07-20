import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Col, Form, FormGroup, Label, Input } from "reactstrap";
import React, { Component } from "react";

export default class CategoryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      categoryName: this.props.categoryName,
    };

    this.toggle = this.toggle.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
    // this.setState({ categoryName: "" });
    console.log(this.props.business)
    console.log(this.props.parentCategoryId)
    console.log(this.props.categoryName)
  }
  toggleSave() {
    console.log(this.props.business)
    this.setState({
      modal: !this.state.modal,
    });
  }

  handleCategoryNameChange(e, key) {
    console.log(this.props.categoryName);
    this.setState({ [key]: e.target.value });
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
                    onChange={(e) => this.handleCategoryNameChange(e, "categoryName")}
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
