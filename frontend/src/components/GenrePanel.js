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
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

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
            {genre.map((el) => (
              <Button shape="round">{el}</Button>
            ))}
          </div>
          <div className="age-filter">
            {age.map((el) => (
              <Button shape="round">{el}</Button>
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
