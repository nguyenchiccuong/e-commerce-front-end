import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import "./Product.css";
import Navbar from "../NavBar";
import Footer from "../Footer";
import Carousel from "../Carousel";
import Pagination from "../Pagination";
import DropDownCusCategory from "../DropDownCusCategory";
import { getPublic } from "../../httpHelper";
import { withRouter } from "react-router-dom";
import { getProductFailException, getProductCountFailException } from "../../exception/ProductException";
import slide1 from "../../img/slide1.jpg";
import slide2 from "../../img/slide2.jpg";
import slide3 from "../../img/slide3.jpg";
import slide4 from "../../img/slide4.jpg";
import slide5 from "../../img/slide5.jpg";
import slide6 from "../../img/slide6.jpg";
import slide7 from "../../img/slide7.jpg";
import slide8 from "../../img/slide8.jpg";
import { getParentCategoryFailException } from "../../exception/CategoryException";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      notiContent: "",
      numOfPage: 1,
      activePage: 0,
      itemPerPage: 2,
      productList: [],
      parentCategoryList: [],
      categoryId: undefined,
      flag: -1,
      items: [
        {
          src: slide1,
          altText: "Slide 1",
          caption: "",
        },
        {
          src: slide2,
          altText: "Slide 2",
          caption: "",
        },
        {
          src: slide3,
          altText: "Slide 3",
          caption: "",
        },
        {
          src: slide4,
          altText: "Slide 4",
          caption: "",
        },
        {
          src: slide5,
          altText: "Slide 5",
          caption: "",
        },
        {
          src: slide6,
          altText: "Slide 6",
          caption: "",
        },
        {
          src: slide7,
          altText: "Slide 7",
          caption: "",
        },
        {
          src: slide8,
          altText: "Slide 8",
          caption: "",
        },
      ],
    };
    this.toggle = this.toggle.bind(this);
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

    this.setNumOfPageAndReloadPaging(page.data.data.numberOfEntity);
    this.getRecentPagePr();

    let result = null;
    try {
      result = await getPublic("public/category/parent");
    } catch (error) {
      console.log(error);
      this.setState({
        notiContent: getParentCategoryFailException(error),
      });
      this.toggle();
      return;
    }
    this.setParentCategory(result.data.data);
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
        if (this.state.categoryId !== undefined) {
          this.getRecentPagePrByCategoryIdCallback(() => {
            if (this.state.productList.length <= 0) {
              this.getRecentPagePrByParentCategoryId();
            }
          });
        } else {
          this.getRecentPagePr();
        }
      }
    );
  }

  async receiveCategory(categoryId) {
    this.setState({ categoryId: categoryId });
    let page = null;
    try {
      page = await getPublic(`public/product/count/parent-category?category_id=${categoryId}`);
    } catch (error) {
      console.log(error);
      this.setState({
        notiContent: getProductCountFailException(error),
      });
      this.toggle();
      return;
    }
    let page2 = null;
    try {
      page2 = await getPublic(`public/product/count/category?category_id=${categoryId}`);
    } catch (error) {
      console.log(error);
      this.setState({
        notiContent: getProductCountFailException(error),
      });
      this.toggle();
      return;
    }
    if (page.data.data.numberOfEntity >= page2.data.data.numberOfEntity) {
      this.setNumOfPageAndReloadPaging(page.data.data.numberOfEntity, () => {
        this.getRecentPagePrByParentCategoryId();
      });
    } else {
      this.setNumOfPageAndReloadPaging(page2.data.data.numberOfEntity, () => {
        this.getRecentPagePrByCategoryIdCallback();
      });
    }
  }

  setParentCategory(parentCategory) {
    this.setState({
      parentCategoryList: parentCategory.sort((a, b) => {
        var nameA = a.categoryName.toUpperCase();
        var nameB = b.categoryName.toUpperCase();
        return nameA.localeCompare(nameB);
      }),
    });
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

  async getRecentPagePrByParentCategoryId() {
    let result = null;
    try {
      result = await getPublic(
        `public/product/parent-category?page=${this.state.activePage}&items=${this.state.itemPerPage}&category_id=${this.state.categoryId}`
      );
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

  async getRecentPagePrByCategoryIdCallback(callback) {
    let result = null;
    try {
      result = await getPublic(`public/product/category?page=${this.state.activePage}&items=${this.state.itemPerPage}&category_id=${this.state.categoryId}`);
    } catch (error) {
      console.log(error);
      this.setState({
        notiContent: getProductFailException(error),
      });
      this.toggle();
      return;
    }
    this.setState(
      {
        productList: result.data.data,
      },
      callback
    );
  }

  setNumOfPageAndReloadPaging(numOfEntity, callback) {
    this.setState(
      {
        numOfPage:
          numOfEntity / this.state.itemPerPage === 0
            ? 1
            : numOfEntity % this.state.itemPerPage === 0
            ? numOfEntity / this.state.itemPerPage
            : Math.floor(numOfEntity / this.state.itemPerPage) + 1,
        flag: Math.random() + "abc",
      },
      callback
    );
  }

  seeDetail(productId) {
    this.props.history.push(`/product-detail/${productId}`);
  }

  render() {
    return (
      <div>
        <Navbar signInType="cus" palce="product" />

        <div className="d-flex text-white hero-banner">
          <div className="w-100 plex-fill">
            <Carousel items={this.state.items} />
          </div>
        </div>

        <div className="d-flex product-body-content">
          <div className="p-2 w-25">
            <div className="side-bar-category">
              <p class="w-100 text-center my-0 rounded side-bar-category-header p-2">Category</p>
              {/* <!-- category --> */}
              {this.state.parentCategoryList.map((category) => (
                <DropDownCusCategory
                  categoryName={category.categoryName}
                  categoryId={category.id}
                  receiveCategory={(categoryId) => this.receiveCategory(categoryId)}
                />
              ))}
              {/* <!-- category --> */}
            </div>
          </div>
          <div className="p-2 flex-grow-1">
            <Container>
              <h1 class="border-bottom">New product</h1>
              {this.state.productList.map((product, index) => {
                if (index % 3 === 0) {
                  return (
                    <Row className="mb-1">
                      <Col xs="4" md="4">
                        <Card className="my-card">
                          <CardImg
                            className="my-card-img"
                            top
                            width="100%"
                            src={`http://localhost:9998/img/product/${product.id}-1.png`}
                            alt="Card image cap"
                          />
                          <CardBody>
                            <CardTitle tag="h5">{product.productName}</CardTitle>
                            {/* <CardSubtitle tag="h6" className="mb-2 text-muted">
                              Card subtitle
                            </CardSubtitle> */}
                            <CardText>
                              {new Intl.NumberFormat("de-DE", { style: "currency", currency: "VND" }).format(product.productDetails[0].price)}
                            </CardText>
                            <div className="d-plex">
                              <Button color="warning" className="w-25" onClick={() => this.seeDetail(product.id)}>
                                ?
                              </Button>
                              <Button color="primary" className="float-right w-50">
                                Add to cart
                              </Button>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                      <Col xs="4" md="4">
                        {this.state.productList[index + 1] !== undefined ? (
                          <Card className="my-card">
                            <CardImg
                              className="my-card-img"
                              top
                              width="100%"
                              src={`http://localhost:9998/img/product/${this.state.productList[index + 1].id}-1.png`}
                              alt="Card image cap"
                            />
                            <CardBody>
                              <CardTitle tag="h5">{this.state.productList[index + 1].productName}</CardTitle>
                              <CardText>
                                {new Intl.NumberFormat("de-DE", { style: "currency", currency: "VND" }).format(
                                  this.state.productList[index + 1].productDetails[0].price
                                )}
                              </CardText>
                              <div className="d-plex">
                                <Button color="warning" className="w-25" onClick={() => this.seeDetail(this.state.productList[index + 1].id)}>
                                  ?
                                </Button>
                                <Button color="primary" className="float-right w-50">
                                  Add to cart
                                </Button>
                              </div>
                            </CardBody>
                          </Card>
                        ) : (
                          ""
                        )}
                      </Col>
                      <Col xs="4" md="4">
                        {this.state.productList[index + 2] !== undefined ? (
                          <Card className="my-card">
                            <CardImg
                              className="my-card-img"
                              top
                              width="100%"
                              src={`http://localhost:9998/img/product/${this.state.productList[index + 2].id}-1.png`}
                              alt="Card image cap"
                            />
                            <CardBody>
                              <CardTitle tag="h5">{this.state.productList[index + 2].productName}</CardTitle>
                              <CardText>
                                {new Intl.NumberFormat("de-DE", { style: "currency", currency: "VND" }).format(
                                  this.state.productList[index + 2].productDetails[0].price
                                )}
                              </CardText>
                              <div className="d-plex">
                                <Button color="warning" className="w-25" onClick={() => this.seeDetail(this.state.productList[index + 2].id)}>
                                  ?
                                </Button>
                                <Button color="primary" className="float-right w-50">
                                  Add to cart
                                </Button>
                              </div>
                            </CardBody>
                          </Card>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                  );
                }
              })}
            </Container>
            {/* <!-- pagin --> */}
            <Pagination key={this.state.flag} numOfPage={this.state.numOfPage} pageReturn={(result) => this.pageReturn(result)} />
            {/* <!-- pagin --> */}
          </div>
        </div>
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

export default withRouter(index);
