import React from "react";
import { Button, Col, Menu, Dropdown, Row, message, Select } from "antd";
import "./GenrePanel.css";
import { Option } from "antd/lib/mentions";

//when using mui select
// import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import SwapVertIcon from "@material-ui/icons/SwapVert";
const genre = ["All", "Education", "Sports", "Comedy", "Lifestyle"];
const age = ["Anyone", "7+", "12+", "16+", "18+"];

export default function GenrePanel(props) {
  const menu = (
    <Menu onClick={props.handleDropDown}>
      <Menu.Item key="1">
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
        {/* <Dropdown
          className="sort-select"
          overlay={menu}
          placement="bottomRight"
          trigger="click"
        >
          <Button
            id={
              props.sortBy === "releaseDate"
                ? "release-date-option"
                : "view-count-option"
            }
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
        </Dropdown> */}
        {/* using mui select*/}
        {/* <FormControl variant="filled">
          <InputLabel id="demo-simple-select-filled-label">Sort by</InputLabel>
          <Select
            className="sort-select"
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={"releaseDate"}
            onChange={() => message.info("not yet implemented")}
          >
            <MenuItem id="release-date-option" value={"releaseDate"}>
              Release Date
            </MenuItem>
            <MenuItem id="view-count-option" value={"viewCount"}>
              View Count
            </MenuItem>
          </Select>
        </FormControl> */}
        {/*using antd select */}
        {/* <Select
          className="sort-select"
          labelInValue
          defaultValue={{ value: "releaseDate" }}
          style={{ width: 120 }}
          onChange={() => message.info("not yet implemented")}
        >
          <Option id="release-date-option" value="releaseDate">
            Release Date
          </Option>
          <Option id="view-count-option" value="viewCount">
            View Count
          </Option>
        </Select> */}

        {/* <label for="sort-options">Choose a car:</label> */}
        {/* <img
          src="/img/sort.png"
          style={{ height: "15px", marginRight: "2px", color: "white" }}
          alt="sort icon"
        ></img> */}
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
            {/* <option value="opel">Opel</option>
          <option value="audi">Audi</option> */}
          </select>
        </div>
      </Col>
    </div>
  );
}
