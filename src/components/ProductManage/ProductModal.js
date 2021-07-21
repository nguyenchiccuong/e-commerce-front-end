import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Col, Form, FormGroup, Label, Input, Table } from "reactstrap";
import { Row } from "reactstrap";
import React, { Component } from "react";
import { post, put, del, getPublic } from "../../httpHelper";

export default class ProductModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      message: "",
      productId: "",
      productName: "",
      createDate: "",
      description: "",
      img: [],
      numOfImg: 0,
      material: "",
      model: "",
      size: "",
      standard: "",
      updateDate: "",
      warranty: "",
      weight: "",
      brandId: "",
      originId: "",
      parentCategoryId: "",
      subCategoryId: "",
      parentCategory: [],
      subCategory: [],
      origin: [],
      brand: [],
      productDetail: [],
    };

    this.toggle = this.toggle.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
    this.componentDidMount();
  }

  async toggleSave() {}

  handleInsertRow() {
    let recentProductDetail = JSON.parse(JSON.stringify(this.state.productDetail));
    let productDetailObject = { id: "", color: "", price: "", quantity: "" };
    recentProductDetail.push(productDetailObject);
    this.setState({ productDetail: recentProductDetail });
  }

  async handleFieldChange(e, key) {
    if (key === "img") {
      this.setState({ [key]: e.target.files });
    } else if (key === "parentCategoryId") {
      this.setState({ [key]: e.target.value });
      this.setState({ subCategoryId: "" });
      let subCategoryResult = null;
      try {
        subCategoryResult = await getPublic(`public/category/sub/${e.target.value}`);
      } catch (error) {
        console.log(error);
        this.setState({
          message:
            error.response === undefined
              ? "Fail to get data"
              : error.response.data.errorCode !== undefined
              ? error.response.data.errorCode
              : error.response.data.message !== undefined
              ? error.response.data.message
              : "Fail to get data",
        });
        setTimeout(() => {
          this.setState({
            message: "",
          });
        }, 2000);
        return;
      }
      this.setState({
        subCategory: subCategoryResult.data.data.sort((a, b) => {
          var nameA = a.categoryName.toUpperCase();
          var nameB = b.categoryName.toUpperCase();
          return nameA.localeCompare(nameB);
        }),
      });
    } else if (key === "weight" || key === "warranty") {
      if (isNaN(e.target.value) || e.target.value.trim() === "") {
        this.setState({ [key]: this.state[key] });
      } else {
        this.setState({ [key]: e.target.value });
      }
    } else {
      this.setState({ [key]: e.target.value });
    }
  }

  handleRowChange(e, index, key) {
    let recentProductDetail = JSON.parse(JSON.stringify(this.state.productDetail));
    if (key === "price" || key === "quantity") {
      if (!(isNaN(e.target.value) || e.target.value.trim() === "")) {
        recentProductDetail[index][key] = e.target.value;
      }
    } else {
      recentProductDetail[index][key] = e.target.value;
    }
    this.setState({ productDetail: recentProductDetail }, () => {
      console.log(this.state);
    });
  }

  handleDeleteRow(index) {
    let recentProductDetail = JSON.parse(JSON.stringify(this.state.productDetail));
    recentProductDetail.splice(index, 1);
    this.setState({ productDetail: recentProductDetail });
  }

  async componentDidMount() {
    let parentCategoryResult = null;
    try {
      parentCategoryResult = await getPublic("public/category/parent");
    } catch (error) {
      console.log(error);
      this.setState({
        message:
          error.response === undefined
            ? "Fail to get data"
            : error.response.data.errorCode !== undefined
            ? error.response.data.errorCode
            : error.response.data.message !== undefined
            ? error.response.data.message
            : "Fail to get data",
      });
      setTimeout(() => {
        this.setState({
          message: "",
        });
      }, 2000);
      return;
    }
    this.setState({
      parentCategory: parentCategoryResult.data.data.sort((a, b) => {
        var nameA = a.categoryName.toUpperCase();
        var nameB = b.categoryName.toUpperCase();
        return nameA.localeCompare(nameB);
      }),
    });
    let originResult = null;
    try {
      originResult = await getPublic("public/origin");
    } catch (error) {
      console.log(error);
      this.setState({
        message:
          error.response === undefined
            ? "Fail to get data"
            : error.response.data.errorCode !== undefined
            ? error.response.data.errorCode
            : error.response.data.message !== undefined
            ? error.response.data.message
            : "Fail to get data",
      });
      setTimeout(() => {
        this.setState({
          message: "",
        });
      }, 2000);
      return;
    }
    this.setState({
      origin: originResult.data.data.sort((a, b) => {
        var nameA = a.country.toUpperCase();
        var nameB = b.country.toUpperCase();
        return nameA.localeCompare(nameB);
      }),
    });
    let brandResult = null;
    try {
      brandResult = await getPublic("public/brand");
    } catch (error) {
      console.log(error);
      this.setState({
        message:
          error.response === undefined
            ? "Fail to get data"
            : error.response.data.errorCode !== undefined
            ? error.response.data.errorCode
            : error.response.data.message !== undefined
            ? error.response.data.message
            : "Fail to get data",
      });
      setTimeout(() => {
        this.setState({
          message: "",
        });
      }, 2000);
      return;
    }
    this.setState({
      brand: brandResult.data.data.sort((a, b) => {
        var nameA = a.brandName.toUpperCase();
        var nameB = b.brandName.toUpperCase();
        return nameA.localeCompare(nameB);
      }),
    });
    if (this.props.productId !== undefined && !isNaN(this.props.productId) && this.props.productId.trim() !== "") {
      let productResult = null;
      try {
        productResult = await getPublic(`public/product/${this.props.productId}`);
      } catch (error) {
        console.log(error);
        this.setState({
          message:
            error.response === undefined
              ? "Fail to get data"
              : error.response.data.errorCode !== undefined
              ? error.response.data.errorCode
              : error.response.data.message !== undefined
              ? error.response.data.message
              : "Fail to get data",
        });
        setTimeout(() => {
          this.setState({
            message: "",
          });
        }, 2000);
        return;
      }

      this.setState({
        productId: productResult.data.data.id,
        productName: productResult.data.data.productName,
        createDate: productResult.data.data.createDate,
        description: productResult.data.data.description === null ? "" : productResult.data.data.description,
        material: productResult.data.data.material === null ? "" : productResult.data.data.material,
        model: productResult.data.data.model === null ? "" : productResult.data.data.model,
        size: productResult.data.data.size === null ? "" : productResult.data.data.size,
        standard: productResult.data.data.standard === null ? "" : productResult.data.data.standard,
        updateDate: productResult.data.data.updateDate === null ? "" : productResult.data.data.updateDate,
        warranty: productResult.data.data.warranty === null ? "" : productResult.data.data.warranty,
        weight: productResult.data.data.weight === null ? "" : productResult.data.data.weight,
        brandId: productResult.data.data.brand.id,
        originId: productResult.data.data.origin.id,
        parentCategoryId: productResult.data.data.categoryId,
        subCategoryId: productResult.data.data.category.id,
        productDetail: productResult.data.data.productDetails,
        numOfImg: productResult.data.data.img === null ? 0 : productResult.data.data.img,
      });
      let subCategoryResult = null;
      try {
        subCategoryResult = await getPublic(`public/category/sub/${productResult.data.data.categoryId}`);
      } catch (error) {
        console.log(error);
        this.setState({
          message:
            error.response === undefined
              ? "Fail to get data"
              : error.response.data.errorCode !== undefined
              ? error.response.data.errorCode
              : error.response.data.message !== undefined
              ? error.response.data.message
              : "Fail to get data",
        });
        setTimeout(() => {
          this.setState({
            message: "",
          });
        }, 2000);
        return;
      }
      this.setState({
        subCategory: subCategoryResult.data.data.sort((a, b) => {
          var nameA = a.categoryName.toUpperCase();
          var nameB = b.categoryName.toUpperCase();
          return nameA.localeCompare(nameB);
        }),
      });
    }
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
            <h4 className="text-danger">{this.state.message}</h4>
            <Form>
              <Row form>
                <Col md={3}>
                  <FormGroup>
                    <Row className="ml-1">
                      <Label for="productId" className="mr-1">
                        id
                      </Label>
                      <h5 className="text-danger"></h5>
                    </Row>
                    <Input type="text" name="productId" id="productId" placeholder="Product id" disabled value={this.state.productId} />
                  </FormGroup>
                </Col>
                <Col md={9}>
                  <FormGroup>
                    <Row className="ml-1">
                      <Label for="productName" className="mr-1">
                        Product name
                      </Label>
                      <h5 className="text-danger"></h5>
                    </Row>
                    <Input
                      type="text"
                      name="productName"
                      id="productName"
                      placeholder="Product name"
                      value={this.state.productName}
                      onChange={(e) => this.handleFieldChange(e, "productName")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Row className="ml-1">
                      <Label for="parentCategory" className="mr-1">
                        Category
                      </Label>
                      <h5 className="text-danger"></h5>
                    </Row>
                    <Input
                      type="select"
                      name="parentCategory"
                      id="parentCategory"
                      value={this.state.parentCategoryId}
                      onChange={(e) => this.handleFieldChange(e, "parentCategoryId")}
                    >
                      <option value="" disabled hidden>
                        Choose here
                      </option>
                      {this.state.parentCategory.map((e) => (
                        <option value={e.id}>{e.categoryName}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Row className="ml-1">
                      <Label for="subCategory" className="mr-1">
                        Sub categgory
                      </Label>
                      <h5 className="text-danger"></h5>
                    </Row>
                    <Input
                      type="select"
                      name="subCategory"
                      id="subCategory"
                      value={this.state.subCategoryId}
                      onChange={(e) => this.handleFieldChange(e, "subCategoryId")}
                    >
                      <option value="" disabled hidden>
                        Choose here
                      </option>
                      {this.state.subCategory.map((e) => (
                        <option value={e.id}>{e.categoryName}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Row className="ml-1">
                      <Label for="brand" className="mr-1">
                        Brand
                      </Label>
                      <h5 className="text-danger"></h5>
                    </Row>
                    <Input type="select" name="brand" id="brand" value={this.state.brandId} onChange={(e) => this.handleFieldChange(e, "brandId")}>
                      <option value="" disabled hidden>
                        Choose here
                      </option>
                      {this.state.brand.map((e) => (
                        <option value={e.id}>{e.brandName}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Row className="ml-1">
                      <Label for="origin" className="mr-1">
                        Origin
                      </Label>
                      <h5 className="text-danger"></h5>
                    </Row>
                    <Input type="select" name="origin" id="origin" value={this.state.originId} onChange={(e) => this.handleFieldChange(e, "originId")}>
                      <option value="" disabled hidden>
                        Choose here
                      </option>
                      {this.state.origin.map((e) => (
                        <option value={e.id}>{e.country}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Row className="ml-1">
                      <Label for="model" className="mr-1">
                        Model
                      </Label>
                      <h5 className="text-danger"></h5>
                    </Row>
                    <Input
                      type="text"
                      name="model"
                      id="model"
                      placeholder="Model"
                      value={this.state.model}
                      onChange={(e) => this.handleFieldChange(e, "model")}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Row className="ml-1">
                      <Label for="material" className="mr-1">
                        Material
                      </Label>
                      <h5 className="text-danger"></h5>
                    </Row>
                    <Input
                      type="text"
                      name="material"
                      id="material"
                      placeholder="Material"
                      value={this.state.material}
                      onChange={(e) => this.handleFieldChange(e, "material")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Row className="ml-1">
                      <Label for="weight" className="mr-1">
                        Weight (kg)
                      </Label>
                      <h5 className="text-danger"></h5>
                    </Row>
                    <Input
                      type="number"
                      min="1"
                      name="weight"
                      id="weight"
                      placeholder="Weight in kg"
                      step="1"
                      value={this.state.weight}
                      onChange={(e) => this.handleFieldChange(e, "weight")}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Row className="ml-1">
                      <Label for="size" className="mr-1">
                        Size
                      </Label>
                      <h5 className="text-danger"></h5>
                    </Row>
                    <Input type="text" name="size" id="size" placeholder="Size" value={this.state.size} onChange={(e) => this.handleFieldChange(e, "size")} />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Row className="ml-1">
                      <Label for="standard" className="mr-1">
                        Standard
                      </Label>
                      <h5 className="text-danger"></h5>
                    </Row>
                    <Input
                      type="text"
                      name="standard"
                      id="standard"
                      placeholder="Standard"
                      value={this.state.standard}
                      onChange={(e) => this.handleFieldChange(e, "standard")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Row className="ml-1">
                      <Label for="warranty" className="mr-1">
                        Warranty (day)
                      </Label>
                      <h5 className="text-danger"></h5>
                    </Row>
                    <Input
                      type="number"
                      min="1"
                      name="warranty"
                      id="warranty"
                      placeholder="Number of days"
                      step="1"
                      value={this.state.warranty}
                      onChange={(e) => this.handleFieldChange(e, "warranty")}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Row className="ml-1">
                      <Label for="image" className="mr-1">
                        Image
                      </Label>
                      <h5 className="text-danger"></h5>
                    </Row>
                    <Input
                      type="file"
                      name="image"
                      id="image"
                      placeholder="Image"
                      multiple
                      accept="image/*"
                      onChange={(e) => this.handleFieldChange(e, "img")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Row className="ml-1">
                      <Label for="createDate" className="mr-1">
                        Create date
                      </Label>
                      <h5 className="text-danger"></h5>
                    </Row>
                    <Input type="text" name="createDate" id="createDate" placeholder="Create date" disabled value={this.state.createDate} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Row className="ml-1">
                      <Label for="updateDate" className="mr-1">
                        Update date
                      </Label>
                      <h5 className="text-danger"></h5>
                    </Row>
                    <Input type="text" name="updateDate" id="updateDate" placeholder="Update date" disabled value={this.state.updateDate} />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Row className="ml-1">
                  <Label for="description" className="mr-1">
                    Description
                  </Label>
                  <h5 className="text-danger"></h5>
                </Row>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  rows="5"
                  value={this.state.description}
                  onChange={(e) => this.handleFieldChange(e, "description")}
                />
              </FormGroup>
            </Form>

            <h3 className="text-center">Product Details</h3>

            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Color</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>
                    <Button color="success" size="sm" onClick={() => this.handleInsertRow()}>
                      Add
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.productDetail.map((e, index) => (
                  <tr>
                    <th scope="row">{e.id}</th>
                    <td>
                      <Input
                        type="text"
                        name={`color${index}`}
                        id={`color${index}`}
                        placeholder="Color"
                        value={e.color}
                        onChange={(e) => this.handleRowChange(e, index, "color")}
                      />
                    </td>
                    <td>
                      <Input
                        type="number"
                        min="1"
                        name={`price${index}`}
                        id={`price${index}`}
                        placeholder="Price"
                        value={e.price}
                        onChange={(e) => this.handleRowChange(e, index, "price")}
                      />
                    </td>
                    <td>
                      <Input
                        type="number"
                        min="1"
                        name={`quantity${index}`}
                        id={`quantity${index}`}
                        placeholder="Quantity"
                        value={e.quantity}
                        onChange={(e) => this.handleRowChange(e, index, "quantity")}
                      />
                    </td>
                    <td>
                      <Button color="danger" size="sm" onClick={() => this.handleDeleteRow(index)}>
                        Del
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
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