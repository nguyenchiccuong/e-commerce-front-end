import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from "reactstrap";
import * as ReviewService from "../../service/ReviewService";
import { updateReviewFailException, reviewContentNullException, deleteReviewFailException } from "../../exception/ReviewException";

export default class ReviewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      reviewContent: this.props.reviewContent,
      message: "",
    };
    this.toggle = this.toggle.bind(this);
    this.toggleSave = this.toggleSave.bind(this);
    this.handleReviewContentChange = this.handleReviewContentChange.bind(this);
  }

  clearMessage() {
    setTimeout(() => {
      this.setState({
        message: "",
      });
    }, 2000);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
    this.setState({
      reviewContent: this.props.reviewContent,
    });
  }

  async updateReview() {
    let review = {
      id: this.props.reviewId,
      productDetailId: -1,
      numOfStar: 56,
      description: this.state.reviewContent,
      anonymous: 0,
    };
    let result = null;
    try {
      result = await ReviewService.updateReview(review);
    } catch (error) {
      console.log(error);
      this.setState({
        message: updateReviewFailException(error),
      });
      this.clearMessage();
      return;
    }
    this.props.receiveResult(result);
    this.setState({
      modal: !this.state.modal,
    });
  }

  async delReview() {
    let result = null;
    try {
      result = await ReviewService.deleteReview(this.props.reviewId);
    } catch (error) {
      console.log(error);
      this.setState({
        message: deleteReviewFailException(error),
      });
      this.clearMessage();
      return;
    }
    this.props.receiveResult(result);
    this.setState({
      modal: !this.state.modal,
    });
  }

  toggleSave() {
    if (this.props.business === "update") {
      if (this.state.reviewContent === undefined || this.state.reviewContent.trim() === "") {
        this.setState({
          message: reviewContentNullException(),
        });
        this.clearMessage();
        return;
      }
      this.updateReview();
    } else if (this.props.business === "del") {
      this.delReview();
    }
  }

  handleReviewContentChange(e) {
    this.setState({ reviewContent: e.target.value });
  }

  render() {
    return (
      <div className={this.props.classForComponent}>
        <Button color={this.props.color} onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg">
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
            <h4 className="text-danger">{this.state.message}</h4>
            <Form>
              <Input
                type="textarea"
                name="reviewContent"
                id="reviewContent"
                maxLength="200"
                rows="3"
                className="w-100 review-textarea"
                placeholder="Review content"
                value={this.state.reviewContent}
                onChange={this.handleReviewContentChange}
              />
            </Form>
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
