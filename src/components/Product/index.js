import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import "./Product.css";
import Navbar from "../NavBar";
import Footer from "../Footer";
import Carousel from "../Carousel";
import Pagination from "../Pagination";
import DropDownCusCategory from "../DropDownCusCategory";
import { getPublic } from "../../httpHelper";
import { getProductFailException, getProductCountFailException } from "../../exception/ProductExeption";
import slide1 from "../../img/slide1.jpg";
import slide2 from "../../img/slide2.jpg";
import slide3 from "../../img/slide3.jpg";
import slide4 from "../../img/slide4.jpg";
import slide5 from "../../img/slide5.jpg";
import slide6 from "../../img/slide6.jpg";
import slide7 from "../../img/slide7.jpg";
import slide8 from "../../img/slide8.jpg";
import { getParentCategoryFailException } from "../../exception/CategoryException";

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
      parentCategoryList: [],
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

  async receiveCategory(CategoryId) {
    console.log(CategoryId);
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
                <DropDownCusCategory categoryName={category.categoryName} categoryId={category.id} receiveCategory={this.receiveCategory}/>
              ))}
              {/* <!-- category --> */}
            </div>
          </div>
          <div className="p-2 flex-grow-1">
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
