import React, { Component } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { getPublic } from "../../httpHelper";
import { getSubCategoryFailException } from "../../exception/CategoryException";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      notiContent: "",
      btnDropright: false,
      subCategoryList: [],
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  setSubCategory(subCategory) {
    this.setState({
      subCategoryList: subCategory.sort((a, b) => {
        var nameA = a.categoryName.toUpperCase();
        var nameB = b.categoryName.toUpperCase();
        return nameA.localeCompare(nameB);
      }),
    });
  }

  async componentDidMount() {
    let result = null;
    try {
      result = await getPublic(`public/category/sub/${this.props.categoryId}`);
    } catch (error) {
      console.log(error);
      this.setState({
        notiContent: getSubCategoryFailException(error),
      });
      this.toggle();
      return;
    }
    this.setSubCategory(result.data.data);
  }
  render() {
    return (
      <Dropdown
        direction="right"
        isOpen={this.state.btnDropright}
        toggle={() => {
          this.setState({ btnDropright: !this.state.btnDropright });
        }}
        className="w-100"
      >
        <DropdownToggle caret className="w-100">
          {this.props.categoryName}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => this.props.receiveCategory(this.props.categoryId)}>All</DropdownItem>
          {this.state.subCategoryList.map((e) => (
            <DropdownItem key={e.id + e.categoryName} onClick={() => this.props.receiveCategory(e.id)}>
              {e.categoryName}
            </DropdownItem>
          ))}
        </DropdownMenu>
        {/* noti modal */}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={["static"]} keyboard={false}>
          <ModalHeader toggle={this.toggle}>Alert</ModalHeader>
          <ModalBody>{this.state.notiContent}</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Dismiss
            </Button>
          </ModalFooter>
        </Modal>
        {/* noti modal */}
      </Dropdown>
    );
  }
}
