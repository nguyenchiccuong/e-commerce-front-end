import React, { Component } from "react";
import "./ProductManage.css";
import Navbar from "../NavBar";
import SideBar from "../SideBar";
import Footer from "../Footer";
import { Table } from "reactstrap";
import ProductModal from "./ProductModal";
import Pagination from "../Pagination";
import { getPublic } from "../../httpHelper";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      notiContent: "",
      numOfPage: 15,
      activePage: 1,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  pageReturn(result) {
    this.setState({
      activePage: result,
    });
  }

  render() {
    return (
      <div>
        <Navbar signInType="em" palce="product" />
        <section>
          <div className="d-flex text-white align-items-stretch justify-content-between manage-body-content">
            <div className="flex-fill side-bar px-auto">
              <SideBar />
            </div>
            <div className="w-75 flex-fill main-content overflow-auto">
              <h1>Product manage</h1>

              <div class="d-plex w-100 plex row justify-content-between">
                <h3 class="ml-5">Product</h3>

                <ProductModal
                  color="success"
                  title="Add Product"
                  buttonLabel="Add"
                  actionButtonColor="primary"
                  actionButtonLabel="Save"
                  business="add"
                  receiveResult={(result) => this.receiveResult(result)}
                />
              </div>
              {/* <!-- table --> */}
              <Table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Model</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Origin</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Ottosssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</td>
                    <td>dvd</td>
                    <td>dvd</td>
                    <td>dvd</td>
                    <td>dvd</td>
                    <td>dvd</td>
                    <td>dvd</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Ottosssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</td>
                    <td>dvd</td>
                    <td>dvd</td>
                    <td>dvd</td>
                    <td>dvd</td>
                    <td>dvd</td>
                    <td>dvd</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Ottosssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss</td>
                    <td>dvd</td>
                    <td>dvd</td>
                    <td>dvd</td>
                    <td>dvd</td>
                    <td>dvd</td>
                    <td>dvd</td>
                  </tr>
                </tbody>
              </Table>
              {/* <!-- table --> */}
              {/* <!-- pagin --> */}
              <Pagination numOfPage={this.state.numOfPage} pageReturn={(result) => this.pageReturn(result)} />
              {/* <!-- pagin --> */}
            </div>
          </div>
        </section>
        <Footer />
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
      </div>
    );
  }
}
