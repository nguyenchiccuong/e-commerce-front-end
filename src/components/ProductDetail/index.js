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
  CardText,
  CardBody,
  CardTitle,
  ButtonGroup,
  Table,
  Input,
  Form,
  FormGroup,
  Label,
  CardHeader,
} from "reactstrap";
import "./ProductDetail.css";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import Navbar from "../NavBar";
import Footer from "../Footer";
import Carousel from "../Carousel";
import ReviewModal from "./ReviewModal";
import * as ProductService from "../../service/ProductService";
import * as ReviewService from "../../service/ReviewService";
import { getProductFailException } from "../../exception/ProductException";
import { saveReviewFailException, reviewContentNullException } from "../../exception/ReviewException";

class index extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      notiContent: "",
      flag: -1,
      items: [],
      cus: this.props.cookies.get("cus") || "",
      product: undefined,
      productDetailId: undefined,
      price: undefined,
      reviews: [],
      reviewContent: "",
    };
    this.toggle = this.toggle.bind(this);
  }

  async componentDidMount() {
    const { cookies } = this.props;
    cookies.set("review", "", { expires: new Date(), path: "/" });

    let productResult = null;
    try {
      productResult = await ProductService.getProductById(this.props.match.params.productId);
    } catch (error) {
      console.log(error);
      this.setState({
        notiContent: getProductFailException(error),
      });
      this.toggle();
      return;
    }
    this.setState({
      product: productResult.data.data,
      productDetailId: productResult.data.data.productDetails[0].id,
      price: productResult.data.data.productDetails[0].price,
    });
    if (productResult.data.data.img > 0) {
      let items = [];
      for (let i = 0; i < productResult.data.data.img; i++) {
        let itemsOnject = { src: `http://localhost:9998/img/product/${this.props.match.params.productId}-${i + 1}.png`, altText: "", caption: "" };
        items.push(itemsOnject);
      }
      this.setState({ items: items, flag: Math.random() + "ajdbsjb" });
    }
    if (productResult.data.data.productDetails.length > 0) {
      let reviews = [];
      productResult.data.data.productDetails.forEach((productDetail) => (reviews = [...reviews, productDetail.reviews]));
      this.setState({ reviews: reviews.flat().sort((a, b) => b.createDate.localeCompare(a.createDate)) });
    }
  }

  async refreshReview() {
    let productResult = null;
    try {
      productResult = await ProductService.getProductById(this.props.match.params.productId);
    } catch (error) {
      console.log(error);
      this.setState({
        notiContent: getProductFailException(error),
      });
      this.toggle();
      return;
    }
    if (productResult.data.data.productDetails.length > 0) {
      let reviews = [];
      productResult.data.data.productDetails.forEach((productDetail) => (reviews = [...reviews, productDetail.reviews]));
      this.setState({ reviews: reviews.flat().sort((a, b) => b.createDate.localeCompare(a.createDate)) });
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  priceChange(index) {
    this.setState({
      productDetailId: this.state.product.productDetails[index].id,
      price: this.state.product.productDetails[index].price,
    });
  }

  reviewInputChange(e) {
    this.setState({ reviewContent: e.target.value });
  }

  async handleSubmitReview(e) {
    e.preventDefault();
    if (this.state.cus === "") {
      const { cookies } = this.props;
      cookies.set("review", `${this.props.match.params.productId}`, { expires: new Date(new Date().valueOf() + 1000 * 3600 * 24), path: "/" });
      this.props.history.push("/signin");
    } else {
      if (this.state.reviewContent.trim() === "") {
        this.setState({
          notiContent: reviewContentNullException(),
        });
        this.toggle();
        return;
      }
      let review = {
        productDetailId: this.state.productDetailId,
        orderId: null,
        numOfStar: 5,
        description: this.state.reviewContent,
        img: 0,
        anonymous: 0,
      };
      let result = null;
      try {
        result = await ReviewService.saveReview(review);
      } catch (error) {
        console.log(error);
        this.setState({
          notiContent: saveReviewFailException(error),
        });
        this.toggle();
        return;
      }
      this.setState({
        reviewContent: "",
      });
      this.refreshReview();
    }
  }

  receiveResult(result) {
    this.refreshReview();
  }

  render() {
    return (
      <div>
        <Navbar signInType="cus" palce="product" />

        <Container className="themed-container product-body-content" fluid={true}>
          <Row className="mb-5">
            <Col md="6">
              <div className="d-flex text-white product-detail-img">
                <div className="w-75 plex-fill">
                  <Carousel items={this.state.items} key={this.state.flag} />
                </div>
              </div>
            </Col>
            <Col md="6">
              <div className="d-plex plex-column product-detail">
                <h1>{this.state.product !== undefined ? this.state.product.productName : ""}</h1>
                <Table className="product-detail-table" striped>
                  <tbody>
                    <tr>
                      <th className="w-50" scope="row">
                        Brand:
                      </th>
                      <td>{this.state.product !== undefined ? this.state.product.brand.brandName : ""}</td>
                    </tr>
                    <tr>
                      <th scope="row">Model:</th>
                      <td>{this.state.product !== undefined ? this.state.product.model : ""}</td>
                    </tr>
                    <tr>
                      <th scope="row">Material:</th>
                      <td>{this.state.product !== undefined ? this.state.product.material : ""}</td>
                    </tr>
                    <tr>
                      <th scope="row">Size:</th>
                      <td>{this.state.product !== undefined ? this.state.product.size : ""}</td>
                    </tr>
                    <tr>
                      <th scope="row">Standard:</th>
                      <td>{this.state.product !== undefined ? this.state.product.standard : ""}</td>
                    </tr>
                    <tr>
                      <th scope="row">Weight:</th>
                      <td>{this.state.product !== undefined ? this.state.product.weight + " kg" : ""}</td>
                    </tr>
                    <tr>
                      <th scope="row">Origin:</th>
                      <td>{this.state.product !== undefined ? this.state.product.origin.country : ""}</td>
                    </tr>
                    <tr>
                      <th scope="row">Warranty:</th>
                      <td>{this.state.product !== undefined ? this.state.product.warranty + " days" : ""}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <Label className="mr-2">Colors:</Label>
              <ButtonGroup role="group" aria-label="Basic example">
                {this.state.product !== undefined
                  ? this.state.product.productDetails.map((productDetail, index) => (
                      <Button key={index + productDetail.color} type="button" color="info" outline onClick={() => this.priceChange(index)}>
                        {productDetail.color}
                      </Button>
                    ))
                  : ""}
              </ButtonGroup>
              <Input type="number" id="quantity" name="quantity" min="1" max="5" className="w-25 mt-3" placeholder="quantity" />
              <h1>{new Intl.NumberFormat("de-DE", { style: "currency", currency: "VND" }).format(this.state.price !== undefined ? this.state.price : "")}</h1>
              <Button type="button" className="btn-success w-50">
                Add to cart
              </Button>
              {/* <!-- detail --> */}
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <Form className="mt-5" onSubmit={(e) => this.handleSubmitReview(e)}>
                <FormGroup>
                  <Label for="exampleInputEmail1">Share you thought about this product with us now! We are here waiting for you</Label>
                  <Input
                    type="textarea"
                    maxLength="200"
                    name="reviewContent"
                    id="reviewContent"
                    className="w-100 review-textarea"
                    rows="3"
                    value={this.state.reviewContent}
                    onChange={(e) => this.reviewInputChange(e)}
                  />
                </FormGroup>
                <Button type="submit" color="primary" className="float-right">
                  Submit
                </Button>
              </Form>
            </Col>
            <Col md="6">
              <h1>Rating</h1>
              <div className="d-plex plex-column p-3 mt-2 overflow-auto review-area">
                {this.state.reviews.map((review) => (
                  <Card key={review.user.username + new Date(review.createDate).toString()}>
                    <CardHeader>
                      {review.user.username} - Review date: {new Date(review.createDate).toString()}
                      {this.state.cus !== "" && this.state.cus.id === review.user.id ? (
                        <ReviewModal
                          color="warning"
                          title="Update review content"
                          buttonLabel="Update"
                          actionButtonColor="warning"
                          actionButtonLabel="Save"
                          business="update"
                          reviewId={review.id}
                          reviewContent={review.description}
                          receiveResult={(result) => this.receiveResult(result)}
                          classForComponent="float-right"
                        />
                      ) : (
                        ""
                      )}
                    </CardHeader>
                    <CardBody>
                      <CardTitle></CardTitle>
                      <CardText>{review.description}</CardText>
                      {this.state.cus !== "" && this.state.cus.id === review.user.id ? (
                        <ReviewModal
                          color="danger"
                          title="Delete review"
                          buttonLabel="Delete"
                          actionButtonColor="danger"
                          actionButtonLabel="Delete"
                          business="del"
                          reviewId={review.id}
                          reviewContent={review.description}
                          receiveResult={(result) => this.receiveResult(result)}
                          classForComponent="float-right"
                        />
                      ) : (
                        ""
                      )}
                    </CardBody>
                  </Card>
                ))}
              </div>
            </Col>
          </Row>
        </Container>

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

export default withCookies(withRouter(index));
