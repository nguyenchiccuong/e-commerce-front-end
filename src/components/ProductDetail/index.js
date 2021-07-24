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
import { getPublic } from "../../httpHelper";
import { getProductFailException } from "../../exception/ProductExeption";

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
    };
    this.toggle = this.toggle.bind(this);
  }

  async componentDidMount() {
    let productResult = null;
    try {
      productResult = await getPublic(`public/product/${this.props.match.params.productId}`);
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
                <Table className="product-detail-table">
                  <tbody>
                    <tr>
                      <td scope="row">Brand:</td>
                      <td>{this.state.product !== undefined ? this.state.product.brand.brandName : ""}</td>
                    </tr>
                    <tr>
                      <td scope="row">Model:</td>
                      <td>{this.state.product !== undefined ? this.state.product.model : ""}</td>
                    </tr>
                    <tr>
                      <td scope="row">Material:</td>
                      <td>{this.state.product !== undefined ? this.state.product.material : ""}</td>
                    </tr>
                    <tr>
                      <td scope="row">Size:</td>
                      <td>{this.state.product !== undefined ? this.state.product.size : ""}</td>
                    </tr>
                    <tr>
                      <td scope="row">Standard:</td>
                      <td>{this.state.product !== undefined ? this.state.product.standard : ""}</td>
                    </tr>
                    <tr>
                      <td scope="row">Weight:</td>
                      <td>{this.state.product !== undefined ? this.state.product.weight + " kg" : ""}</td>
                    </tr>
                    <tr>
                      <td scope="row">Origin:</td>
                      <td>{this.state.product !== undefined ? this.state.product.origin.country : ""}</td>
                    </tr>
                    <tr>
                      <td scope="row">Warranty:</td>
                      <td>{this.state.product !== undefined ? this.state.product.warranty + " days" : ""}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <Label className="mr-2">Colors:</Label>
              <ButtonGroup role="group" aria-label="Basic example">
                {this.state.product !== undefined
                  ? this.state.product.productDetails.map((productDetail, index) => (
                      <Button type="button" color="info" outline onClick={() => this.priceChange(index)}>
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
              <Form className="mt-5">
                <FormGroup>
                  <Label for="exampleInputEmail1">Share you thought with us now! We are here waiting for you</Label>
                  <Input type="textarea" name="text" id="exampleText" className="w-100 review-textarea" rows="3" />
                </FormGroup>
                <Button type="submit" color="primary" className="float-right">
                  Submit
                </Button>
              </Form>
            </Col>
            <Col md="6">
              <h1>Rating</h1>
              <div className="d-plex plex-column p-3 mt-2 overflow-auto review-area">
                <Card>
                  <CardHeader>
                    Featured
                    <Button type="button" color="primary" className="float-right">
                      Update
                    </Button>
                  </CardHeader>
                  <CardBody>
                    <CardTitle>Special title treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button type="button" color="danger" className="float-right">
                      Delete
                    </Button>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>Featured</CardHeader>
                  <CardBody>
                    <CardTitle>Special title treatment</CardTitle>
                    <CardText>
                      With supporting text below as a natural lead-in to additional
                      content.ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    </CardText>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>Featured</CardHeader>
                  <CardBody>
                    <CardTitle>Special title treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>Featured</CardHeader>
                  <CardBody>
                    <CardTitle>Special title treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>Featured</CardHeader>
                  <CardBody>
                    <CardTitle>Special title treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>Featured</CardHeader>
                  <CardBody>
                    <CardTitle>Special title treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>Featured</CardHeader>
                  <CardBody>
                    <CardTitle>Special title treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>Featured</CardHeader>
                  <CardBody>
                    <CardTitle>Special title treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  </CardBody>
                </Card>
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
