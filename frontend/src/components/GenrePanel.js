import React, { Component } from "react";
import { Button, Col, Menu, Dropdown } from "antd";
import "./GenrePanel.css";

const genre = ["All", "Education", "Sports", "Comedy", "Lifestyle"];
const age = ["Anyone", "7+", "12+", "16+", "18+"];

export default class GenrePanel extends Component {
  constructor() {
    super();
    this.state = {
      sortBy: "Release Date",
      activeButtons: ["All", "Anyone"],
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleButtonClick = (e) => {
    let temp;
    if (e.target.className === "active") {
      e.target.className = "inactive";
      //remove this val from activeButton state variable as well
      temp = this.state.activeButtons.filter((el) => el !== e.target.innerHTML);
    } else {
      e.target.className = "active";
      //add the current value to activeButton state varibale
      temp = [...this.state.activeButtons, e.target.innerHTML];

      //selecting an particular value should disselect the generic value
      if (genre.indexOf(e.target.innerHTML) >= 0) {
        //remove All if present in activeButtons
        temp = temp.filter((el) => el !== "All");
      } else if (age.indexOf(e.target.innerHTML) >= 0) {
        //remove Anyone if present in activeButtons
        temp = temp.filter((el) => el !== "Anyone");
      }
    }
    //update state
    this.setState({
      activeButtons: temp,
    });
  };
  handleMenuClick = (e) => {
    if (this.state.sortBy === "Views Count") {
      this.setState({ sortBy: "Release Date" });
    } else {
      this.setState({ sortBy: "Views Count" });
    }
  };
  // componentDidUpdate() {
  //   console.log(this.state.activeButtons);
  // }
  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">
          {this.state.sortBy === "Release Date"
            ? "Views Count"
            : "Release Date"}
        </Menu.Item>
        {/* <Menu.Item key="2">Views Count</Menu.Item> */}
      </Menu>
    );
    return (
      <div className="selector-panel">
        <Col sm={{ marginRight: "5px" }}>
          <div className="genre-buttons">
            {genre.map((el, i) => (
              <button
                className={
                  this.state.activeButtons.indexOf(el) >= 0
                    ? "active"
                    : "inactive"
                }
                onClick={this.handleButtonClick}
              >
                {el}
              </button>
            ))}
          </div>
          <div className="age-filter">
            {age.map((el, i) => (
              <button
                className={
                  this.state.activeButtons.indexOf(el) >= 0
                    ? "active"
                    : "inactive"
                }
                onClick={this.handleButtonClick}
              >
                {el}
              </button>
            ))}
          </div>
        </Col>
        <Col style={{ marginLeft: "40px", justifySelf: "flex-end" }}>
          <Dropdown overlay={menu} placement="bottomRight">
            <Button
              size="large"
              icon={
                <img
                  src="/img/sort.png"
                  style={{ height: "15px", marginRight: "2px" }}
                  alt="sort icon"
                ></img>
              }
              shape="round"
            >
              {this.state.sortBy}
            </Button>
          </Dropdown>
        </Col>
      </div>
    );
  }
}
