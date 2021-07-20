import React, { Component } from "react";
import "./Manage.css";
import Navbar from "../NavBar";
import SideBar from "../SideBar";
import Footer from "../Footer";
import { Button, Input, FormGroup, Form } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Table } from "reactstrap";
import CategoryModal from "./CategoryModal";
import { getPublic } from "../../httpHelper";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      notiContent: "",
      parentCategory: [],
      subCategory: [],
      parentCategoryId: null,
      categoryName: null,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  async receiveResult(finalResult) {
    let result = null;
    try {
      result = await getPublic("public/category/parent");
    } catch (error) {
      console.log(error);
      this.setState({
        notiContent:
          error.response.data.errorCode !== undefined
            ? error.response.data.errorCode
            : error.response.data.message !== undefined
            ? error.response.data.message
            : "Fail to get data",
      });
      this.toggle();
      return;
    }
    if (
      finalResult.data.successCode === "SUCCESS_DELETE_CATEGORY" &&
      result.data.data.length !== this.state.parentCategory.length &&
      result.data.data.length > 0
    ) {
      this.setState({ parentCategoryId: this.state.parentCategory[0].id, categoryName: this.state.parentCategory[0].categoryName });
    }
    this.setState(
      {
        parentCategory: result.data.data.sort((a, b) => {
          var nameA = a.categoryName.toUpperCase();
          var nameB = b.categoryName.toUpperCase();
          return nameA.localeCompare(nameB);
        }),
      },
      () => {
        if (this.state.parentCategory.length > 0) {
          if (finalResult.data.successCode === "SUCCESS_SAVE_CATEGORY") {
            this.setState({ parentCategoryId: finalResult.data.data.id, categoryName: finalResult.data.data.categoryName });
          }

          let parentCategoryId = finalResult.data.successCode === "SUCCESS_SAVE_CATEGORY" ? finalResult.data.data.id : this.state.parentCategoryId;

          try {
            result = getPublic(`public/category/sub/${parentCategoryId}`);
            result.then((e) => {
              this.setState({
                subCategory: e.data.data.sort((a, b) => {
                  var nameA = a.categoryName.toUpperCase();
                  var nameB = b.categoryName.toUpperCase();
                  return nameA.localeCompare(nameB);
                }),
              });
            });
          } catch (error) {
            console.log(error);
            this.setState({
              notiContent:
                error.response.data.errorCode !== undefined
                  ? error.response.data.errorCode
                  : error.response.data.message !== undefined
                  ? error.response.data.message
                  : "Fail to get data",
            });
            this.toggle();
            return;
          }
        } else {
          this.setState({ parentCategoryId: null, categoryName: null });
        }
      }
    );
  }

  handleParentRowClick(parentCategoryId, categoryName) {
    let result = null;
    this.setState({ parentCategoryId: parentCategoryId, categoryName: categoryName });
    try {
      result = getPublic(`public/category/sub/${parentCategoryId}`);
      result.then((e) => {
        this.setState({
          subCategory: e.data.data.sort((a, b) => {
            var nameA = a.categoryName.toUpperCase();
            var nameB = b.categoryName.toUpperCase();
            return nameA.localeCompare(nameB);
          }),
        });
      });
    } catch (error) {
      console.log(error);
      this.setState({
        notiContent:
          error.response.data.errorCode !== undefined
            ? error.response.data.errorCode
            : error.response.data.message !== undefined
            ? error.response.data.message
            : "Fail to get data",
      });
      this.toggle();
      return;
    }
  }

  async componentDidMount() {
    let result = null;
    try {
      result = await getPublic("public/category/parent");
    } catch (error) {
      console.log(error);
      this.setState({
        notiContent:
          error.response.data.errorCode !== undefined
            ? error.response.data.errorCode
            : error.response.data.message !== undefined
            ? error.response.data.message
            : "Fail to get data",
      });
      this.toggle();
      return;
    }
    this.setState(
      {
        parentCategory: result.data.data.sort((a, b) => {
          var nameA = a.categoryName.toUpperCase();
          var nameB = b.categoryName.toUpperCase();
          return nameA.localeCompare(nameB);
        }),
      },
      () => {
        if (this.state.parentCategory.length > 0) {
          this.setState({ parentCategoryId: this.state.parentCategory[0].id, categoryName: this.state.parentCategory[0].categoryName });
          try {
            result = getPublic(`public/category/sub/${this.state.parentCategory[0].id}`);
            result.then((e) => {
              this.setState({
                subCategory: e.data.data.sort((a, b) => {
                  var nameA = a.categoryName.toUpperCase();
                  var nameB = b.categoryName.toUpperCase();
                  return nameA.localeCompare(nameB);
                }),
              });
            });
          } catch (error) {
            console.log(error);
            this.setState({
              notiContent:
                error.response.data.errorCode !== undefined
                  ? error.response.data.errorCode
                  : error.response.data.message !== undefined
                  ? error.response.data.message
                  : "Fail to get data",
            });
            this.toggle();
            return;
          }
        }
      }
    );
  }

  render() {
    return (
      <div>
        <Navbar signInType="em" palce="category" />
        <section>
          <div className="d-flex text-white align-items-stretch justify-content-between manage-body-content">
            <div className="flex-fill side-bar px-auto">
              <SideBar />
            </div>
            <div className="w-75 flex-fill main-content overflow-auto">
              <h1>Category manage</h1>
              <div className="d-flex">
                <div className="flex-fill p-3">
                  {/* <!-- parent category --> */}
                  <h3 className="ml-5">Parent Category: {""}</h3>
                  <div className="d-flex justify-content-between">
                    <CategoryModal
                      color="success"
                      title="Add Category"
                      buttonLabel="Add"
                      actionButtonColor="primary"
                      actionButtonLabel="Save"
                      business="add"
                      receiveResult={(result) => this.receiveResult(result)}
                    />
                    <Form inline className="float-sm-right">
                      <FormGroup className="mx-sm-3 mb-2">
                        <Input type="text" className="form-control" id="inputSearchParent" placeholder="Parent category" name="inputSearchParent" />
                      </FormGroup>
                      <Button color="primary" type="submit" className="mb-2">
                        Search
                      </Button>
                    </Form>
                  </div>

                  <Table className="table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category name</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.parentCategory.map((e, index) => (
                        <tr key={e.categoryName} onClick={() => this.handleParentRowClick(e.id, e.categoryName)}>
                          <th scope="row">{index + 1}</th>
                          <td>{e.categoryName}</td>
                          <td>
                            <CategoryModal
                              color="warning"
                              title="Update Category"
                              buttonLabel="Update"
                              actionButtonColor="warning"
                              actionButtonLabel="Save"
                              business="update"
                              categoryId={e.id}
                              categoryName={e.categoryName}
                              receiveResult={(result) => this.receiveResult(result)}
                            />
                          </td>
                          <td>
                            <CategoryModal
                              color="danger"
                              title="Delete Category"
                              buttonLabel="Del"
                              actionButtonColor="danger"
                              actionButtonLabel="Delete"
                              business="del"
                              categoryId={e.id}
                              categoryName={e.categoryName}
                              receiveResult={(result) => this.receiveResult(result)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <div className="flex-fill p-3">
                  {/* <!-- sub category --> */}
                  <h3 className="ml-5">Sub Category: {this.state.categoryName}</h3>
                  <div className="d-flex justify-content-between">
                    <CategoryModal
                      color="success"
                      title="Add Sub Category"
                      buttonLabel="Add"
                      parentCategoryId={this.state.parentCategoryId}
                      actionButtonColor="primary"
                      actionButtonLabel="Save"
                      business="addsub"
                      receiveResult={(result) => this.receiveResult(result)}
                    />
                    <Form inline className="float-sm-right">
                      <FormGroup className="mx-sm-3 mb-2">
                        <Input type="text" className="form-control" id="inputSearchSub" placeholder="Sub category" name="inputSearchSub" />
                      </FormGroup>
                      <Button color="primary" type="submit" className="mb-2">
                        Search
                      </Button>
                    </Form>
                  </div>
                  <Table className="table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category name</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.subCategory.map((e, index) => (
                        <tr key={e.categoryName}>
                          <th scope="row">{index + 1}</th>
                          <td>{e.categoryName}</td>
                          <td>
                            <CategoryModal
                              color="warning"
                              title="Update Category"
                              buttonLabel="Update"
                              actionButtonColor="warning"
                              actionButtonLabel="Save"
                              business="update"
                              categoryId={e.id}
                              categoryName={e.categoryName}
                              parentCategoryId={this.state.parentCategoryId}
                              receiveResult={(result) => this.receiveResult(result)}
                            />
                          </td>
                          <td>
                            <CategoryModal
                              color="danger"
                              title="Delete Category"
                              buttonLabel="Del"
                              actionButtonColor="danger"
                              actionButtonLabel="Delete"
                              business="del"
                              categoryId={e.id}
                              categoryName={e.categoryName}
                              parentCategoryId={this.state.parentCategoryId}
                              receiveResult={(result) => this.receiveResult(result)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
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
