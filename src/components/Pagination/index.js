import React, { Component } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default class index extends Component {
  state = {
    activePage: 1,
    numOfPage: this.props.numOfPage,
    arrayNumOfPage: [1],
  };

  componentDidMount() {
    if (this.state.numOfPage >= 1) {
      this.setState({ arrayNumOfPage: Array.from({ length: this.state.numOfPage }, (_, i) => i + 1) });
    } else {
      this.setState({ numOfPage: 1 });
    }
  }

  handlePagechange(needToActive) {
    this.setState({ activePage: needToActive });
    this.props.pageReturn(needToActive);
  }

  render() {
    return (
      <Pagination aria-label="Page navigation example" listClassName="justify-content-center">
        {this.state.arrayNumOfPage.map((element) => {
          if (this.state.numOfPage === 1) {
            return (
              <PaginationItem active>
                <PaginationLink>1</PaginationLink>
              </PaginationItem>
            );
          } else {
            let distanceMin = 0;
            let distanceMax = 0;
            if (this.state.activePage === 1) {
              distanceMax = 4;
            } else if (this.state.activePage === this.state.numOfPage) {
              distanceMin = -4;
            } else {
              distanceMin = -2;
              distanceMax = 2;
            }
            if (element === this.state.activePage) {
              if (element === 1) {
                return (
                  <div className="d-flex flex-row">
                    <PaginationItem disabled>
                      <PaginationLink first />
                    </PaginationItem>
                    <PaginationItem disabled>
                      <PaginationLink previous />
                    </PaginationItem>
                    <PaginationItem active>
                      <PaginationLink>1</PaginationLink>
                    </PaginationItem>
                  </div>
                );
              } else if (element === this.state.numOfPage) {
                return (
                  <div className="d-flex flex-row">
                    <PaginationItem active>
                      <PaginationLink>{this.state.numOfPage}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem disabled>
                      <PaginationLink next />
                    </PaginationItem>
                    <PaginationItem disabled>
                      <PaginationLink last />
                    </PaginationItem>
                  </div>
                );
              } else {
                return (
                  <PaginationItem active>
                    <PaginationLink>{element}</PaginationLink>
                  </PaginationItem>
                );
              }
            } else {
              let distance = element - this.state.activePage;
              if (element === 1) {
                if (distance >= distanceMin && distance <= distanceMax)
                  return (
                    <div className="d-flex flex-row">
                      <PaginationItem>
                        <PaginationLink first onClick={() => this.handlePagechange(1)} />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink previous onClick={() => this.handlePagechange(this.state.activePage - 1)} />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink onClick={() => this.handlePagechange(1)}>1</PaginationLink>
                      </PaginationItem>
                    </div>
                  );
                else
                  return (
                    <div className="d-flex flex-row">
                      <PaginationItem>
                        <PaginationLink first onClick={() => this.handlePagechange(1)} />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink previous onClick={() => this.handlePagechange(this.state.activePage - 1)} />
                      </PaginationItem>
                    </div>
                  );
              } else if (element === this.state.numOfPage) {
                if (distance >= distanceMin && distance <= distanceMax)
                  return (
                    <div className="d-flex flex-row">
                      <PaginationItem>
                        <PaginationLink onClick={() => this.handlePagechange(this.state.numOfPage)}>{this.state.numOfPage}</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink next onClick={() => this.handlePagechange(this.state.activePage + 1)} />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink last onClick={() => this.handlePagechange(this.state.numOfPage)} />
                      </PaginationItem>
                    </div>
                  );
                else
                  return (
                    <div className="d-flex flex-row">
                      <PaginationItem>
                        <PaginationLink next onClick={() => this.handlePagechange(this.state.activePage + 1)} />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink last onClick={() => this.handlePagechange(this.state.numOfPage)} />
                      </PaginationItem>
                    </div>
                  );
              } else if (distance >= distanceMin && distance <= distanceMax) {
                return (
                  <PaginationItem>
                    <PaginationLink onClick={() => this.handlePagechange(element)}>{element}</PaginationLink>
                  </PaginationItem>
                );
              }
            }
          }
        })}

        {/* <PaginationItem disabled>
          <PaginationLink first href="#" />
        </PaginationItem>
        <PaginationItem disabled>
          <PaginationLink previous href="#" />
        </PaginationItem>
        <PaginationItem active>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">5</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last href="#" />
        </PaginationItem> */}
      </Pagination>
    );
  }
}
