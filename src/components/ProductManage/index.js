import React, { Component } from "react";
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import Navbar from "../NavBar";
import SideBar from "../SideBar";
import Footer from "../Footer";
import ProductModal from "./ProductModal";
import Pagination from "../Pagination";
import { getPublic } from "../../httpHelper";
import { getProductFailException, getProductCountFailException } from "../../exception/ProductExeption";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      notiContent: "",
      numOfPage: 1,
      activePage: 0,
      itemPerPage: 2,
      productList: [],
      flag: -1,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  async pageReturn(result) {
    this.setState(
      {
        activePage: result - 1,
      },
      () => {
        this.getRecentPagePr();
      }
    );
  }

  async receiveResult(result) {
    if (result.data.successCode === "SUCCESS_SAVE_PRODUCT") {
      this.componentDidMount();
    } else {
      this.getRecentPagePr();
    }
  }

  async componentDidMount() {
    let page = null;
    try {
      page = await getPublic(`public/product/count`);
    } catch (error) {
      console.log(error);
      this.setState({
        notiContent: getProductCountFailException(error),
      });
      this.toggle();
      return;
    }
    this.setState({
      numOfPage:
        page.data.data.numberOfEntity / this.state.itemPerPage === 0
          ? 1
          : page.data.data.numberOfEntity % this.state.itemPerPage === 0
          ? page.data.data.numberOfEntity / this.state.itemPerPage
          : Math.floor(page.data.data.numberOfEntity / this.state.itemPerPage) + 1,
      flag: Math.random() + "abc",
    });
    this.getRecentPagePr();
  }

  async getRecentPagePr() {
    let result = null;
    try {
      result = await getPublic(`public/product?page=${this.state.activePage}&items=${this.state.itemPerPage}`);
    } catch (error) {
      console.log(error);
      this.setState({
        notiContent: getProductFailException(error),
      });
      this.toggle();
      return;
    }
    this.setState({
      productList: result.data.data,
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

              <div className="d-plex w-100 plex row justify-content-between">
                <h3 className="ml-5">Product</h3>

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
              <Table className="table-striped">
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
                  {this.state.productList.map((e, index) => (
                    <tr key={e.productName + e.category.CategoryName + index}>
                      <th scope="row">{index + 1}</th>
                      <td>{e.productName}</td>
                      <td>{e.category.categoryName}</td>
                      <td>{e.model}</td>
                      <td>{e.brand.brandName}</td>
                      <td>{e.origin.country}</td>
                      <td>
                        <ProductModal
                          productId={`${e.id}`}
                          color="info"
                          title="Update product"
                          buttonLabel="Update"
                          actionButtonColor="primary"
                          actionButtonLabel="Save"
                          business="update"
                          receiveResult={(result) => this.receiveResult(result)}
                        />
                      </td>
                      <td>
                        <ProductModal
                          productId={`${e.id}`}
                          color="danger"
                          title="Delete product"
                          buttonLabel="Del"
                          actionButtonColor="danger"
                          actionButtonLabel="delete"
                          business="del"
                          receiveResult={(result) => this.receiveResult(result)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* <!-- table --> */}
              <Pagination key={this.state.flag} numOfPage={this.state.numOfPage} pageReturn={(result) => this.pageReturn(result)} />
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
