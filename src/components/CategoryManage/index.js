import React, { Component } from "react";
import "./Manage.css";
import Navbar from "../NavBar";
import SideBar from "../SideBar";
import Footer from "../Footer";
import { Button, Input, FormGroup, Form } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CategoryModal from "./CategoryModal";
import { getPublic } from "../../httpHelper";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      notiContent: "",
      parentCategory: [],
      subCategroy: [],
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

  receiveResult(result) {
    console.log(result);
  }

  async componentDidMount() {
    let result = null;
    try {
      result = await getPublic("public/category/parent");
    } catch (error) {
      console.log(error.response.data.error);
      this.setState({
        notiContent: "Fail to get data",
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
              this.setState(
                {
                  subCategory: e.data.data.sort((a, b) => {
                    var nameA = a.categoryName.toUpperCase();
                    var nameB = b.categoryName.toUpperCase();
                    return nameA.localeCompare(nameB);
                  }),
                },
                () => {
                  console.log(this.state.parentCategory);
                  console.log(this.state.subCategory);
                }
              );
            });
          } catch (error) {
            console.log(error.response.data.error);
            this.setState({
              notiContent: "Fail to get data",
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

                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category name</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex-fill p-3">
                  {/* <!-- sub category --> */}
                  <h3 className="ml-5">Sub Category: {this.state.categoryName}</h3>
                  <div className="d-flex justify-content-between">
                    <CategoryModal
                      color="success"
                      title="Add Sub Category"
                      buttonLabel="Add"
                      parentCategoryId={""}
                      actionButtonColor="primary"
                      actionButtonLabel="Save"
                      business="add"
                      receiveResult={(result) => this.receiveResult(result)}
                      parentId={this.state.id}
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
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category name</th>
                        <th scope="col">Update</th>
                        <th scope="col">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                      </tr>
                    </tbody>
                  </table>
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
