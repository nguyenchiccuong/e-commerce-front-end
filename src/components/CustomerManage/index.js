import React, { Component } from "react";
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Navbar from "../NavBar";
import SideBar from "../SideBar";
import Footer from "../Footer";
import Pagination from "../Pagination";
import * as CustomerService from "../../service/CustomerService";
import { countCustomerFailException, getCustomerFailException, unlockCustomerFailException, lockCustomerFailException } from "../../exception/UserException";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { confirmAlert } from "react-confirm-alert"; // Import

class index extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      notiContent: "",
      numOfPage: 1,
      activePage: 0,
      itemPerPage: 4,
      customerList: [],
      flag: -1,
      em: this.props.cookies.get("em") || "",
      lockClassName: "",
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
        this.getRecentPageCus();
      }
    );
  }

  handleButtonDisplay() {
    if (this.state.em.role === "ROLE_EMPLOYEE") {
      this.setState({
        lockClassName: "d-none",
      });
    }
  }

  async componentDidMount() {
    this.handleButtonDisplay();
    let page = null;
    try {
      page = await CustomerService.countCustomer();
    } catch (error) {
      console.log(error);
      this.setState({
        notiContent: countCustomerFailException(error),
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
    this.getRecentPageCus();
  }

  async getRecentPageCus() {
    let result = null;
    try {
      result = await CustomerService.getCustomer(this.state.activePage, this.state.itemPerPage);
    } catch (error) {
      console.log(error);
      this.setState({
        notiContent: getCustomerFailException(error),
      });
      this.toggle();
      return;
    }
    this.setState({
      customerList: result.data.data,
    });
  }

  async lockCustomer(id) {
    let result = null;
    try {
      result = await CustomerService.lockCustomer(id);
    } catch (error) {
      console.log(error);
      this.setState({
        notiContent: lockCustomerFailException(error),
      });
      this.toggle();
      return;
    }
    this.getRecentPageCus();
  }

  async unlockCustomer(id) {
    let result = null;
    try {
      result = await CustomerService.unlockCustomer(id);
    } catch (error) {
      console.log(error);
      this.setState({
        notiContent: unlockCustomerFailException(error),
      });
      this.toggle();
      return;
    }
    this.getRecentPageCus();
  }

  async getRecentPagePrBySearchKeywordCallback(searchKeyword, callback) {
    let result = null;
    try {
      result = await CustomerService.searchCustomer(this.state.activePage, this.state.itemPerPage, searchKeyword);
    } catch (error) {
      console.log(error);
      this.setState({
        notiContent: getCustomerFailException(error),
      });
      this.toggle();
      return;
    }
    this.setState(
      {
        customerList: result.data.data,
      },
      callback
    );
  }

  searchKeywordReturn(keyword) {
    if (keyword === "") {
      this.setState(
        {
          activePage: 0,
        },
        () => {
          this.componentDidMount();
        }
      );
    } else {
      this.setState(
        {
          activePage: 0,
          numOfPage: 1,
          flag: Math.random() + "abc",
        },
        () => {
          this.getRecentPagePrBySearchKeywordCallback(keyword, () => {});
        }
      );
    }
  }

  handleLockClick = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to lock this customer",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.lockCustomer(id),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
      overlayClassName: "conform-box",
    });
  };

  handleUnlockClick = (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to unlock this customer",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.unlockCustomer(id),
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
      overlayClassName: "conform-box",
    });
  };

  render() {
    return (
      <div>
        <Navbar signInType="em" palce="customer" searchKeywordReturn={(keyword) => this.searchKeywordReturn(keyword)} />
        <section>
          <div className="d-flex text-white align-items-stretch justify-content-between manage-body-content">
            <div className="flex-fill side-bar px-auto">
              <SideBar />
            </div>
            <div className="w-75 flex-fill main-content overflow-auto">
              <h1>Customer manage</h1>

              <div className="d-plex w-100 plex row justify-content-between">
                <h3 className="ml-5">Customer</h3>
              </div>
              {/* <!-- table --> */}
              <Table className="table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Sex</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone number</th>
                    <th scope="col">DOB</th>
                    <th scope="col">Create date</th>
                    <th scope="col">Lock / Unlock</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.customerList.map((e, index) => (
                    <tr key={e.user.username + e.updateDate + index}>
                      <th scope="row">{index + 1}</th>
                      <td>{e.user.username}</td>
                      <td>{e.sex===true?"Female":"Male"}</td>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td>{e.phoneNumber}</td>
                      <td>{e.dob}</td>
                      <td>{e.createDate}</td>
                      <td className={this.state.lockClassName}>
                        {e.user.status === 1 ? (
                          <Button color="danger" onClick={() => this.handleLockClick(e.user.id)}>
                            Lock
                          </Button>
                        ) : (
                          <Button color="primary" onClick={() => this.handleUnlockClick(e.user.id)}>
                            Unlock
                          </Button>
                        )}
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

export default withCookies(index);
