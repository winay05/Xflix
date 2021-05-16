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
    if (e.target.className === "active") {
      e.target.className = "inactive";
    } else {
      e.target.className = "active";
    }
    if (genre.indexOf(e.target.innerText) > 0) {
      // console.log("in genre");
      document.getElementById("all-genres").className = "inactive";
    } else if (age.indexOf(e.target.innerText) > 0) {
      document.getElementById("all-ages").className = "inactive";
    }
  };
  handleMenuClick = (e) => {
    if (this.state.sortBy === "Views Count") {
      this.setState({ sortBy: "Release Date" });
    } else {
      this.setState({ sortBy: "Views Count" });
    }
  };

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
            {genre.map((el, i) =>
              i === 0 ? (
                <button
                  id="all-genres"
                  className="active"
                  onClick={this.handleButtonClick}
                >
                  {el}
                </button>
              ) : (
                <button className="inactive" onClick={this.handleButtonClick}>
                  {el}
                </button>
              )
            )}
          </div>
          <div className="age-filter">
            {age.map((el, i) =>
              i === 0 ? (
                <button
                  id="all-ages"
                  className="active"
                  onClick={this.handleButtonClick}
                >
                  {el}
                </button>
              ) : (
                <button className="inactive" onClick={this.handleButtonClick}>
                  {el}
                </button>
              )
            )}
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
