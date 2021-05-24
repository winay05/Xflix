import React from "react";
import { Button, Col, Menu, Dropdown, Row } from "antd";
import "./GenrePanel.css";

const genre = ["All", "Education", "Sports", "Comedy", "Lifestyle"];
const age = ["Anyone", "7+", "12+", "16+", "18+"];

export default function GenrePanel(props) {
  const menu = (
    <Menu onClick={props.handleDropDown}>
      <Menu.Item
        id={
          props.sortBy === "releaseDate"
            ? "view-count-option"
            : "release-date-option"
        }
        key="1"
      >
        {props.sortBy === "releaseDate" ? "Views Count" : "Release Date"}
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="selector-panel">
      <Col sm={{ marginRight: "5px" }}>
        <Row className="genre-buttons">
          {genre.map((el, i) => (
            <Button
              id={el}
              type="default"
              shape="round"
              size="large"
              className={
                props.genreFilter.indexOf(el) >= 0
                  ? "active genre-btn"
                  : "inactive genre-btn"
              }
              onClick={props.handleButtonClick}
            >
              {el}
            </Button>
          ))}
        </Row>
        <Row className="age-filter">
          {age.map((el, i) => (
            <Button
              id={el}
              type="default"
              shape="round"
              size="large"
              className={
                props.ageContentFilter.indexOf(el) >= 0
                  ? "active content-rating-btn"
                  : "inactive content-rating-btn"
              }
              onClick={props.handleButtonClick}
            >
              {el}
            </Button>
          ))}
        </Row>
      </Col>
      <Col style={{ marginLeft: "40px", justifySelf: "flex-end" }}>
        <Dropdown
          className="sort-select"
          overlay={menu}
          placement="bottomRight"
        >
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
            {props.sortBy === "releaseDate" ? "Release Date" : "View Count"}
          </Button>
        </Dropdown>
      </Col>
    </div>
  );
}
