import React from "react";
import { Button, Col, Row } from "antd";
import "./GenrePanel.css";

import SwapVertIcon from "@material-ui/icons/SwapVert";
const genre = ["All", "Education", "Sports", "Comedy", "Lifestyle"];
const age = ["Anyone", "7+", "12+", "16+", "18+"];

export default function GenrePanel(props) {
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SwapVertIcon style={{ size: "large", color: "white" }} />
          <select
            className="sort-select"
            name="sortBy"
            id="sort-select"
            defaultValue={"Release Date"}
            onChange={props.handleDropDown}
          >
            <option
              hidden={props.sortBy === "releaseDate" ? true : false}
              id="release-date-option"
              value="'Release Date'"
              selected
            >
              Release Date
            </option>
            <option
              hidden={props.sortBy === "viewCount" ? true : false}
              id="view-count-option"
              value="View Count"
            >
              View Count
            </option>
          </select>
        </div>
      </Col>
    </div>
  );
}
