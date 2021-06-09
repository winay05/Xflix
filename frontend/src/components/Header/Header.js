import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import React, { Component } from "react";
import "./Header.css";
import UploadModal from "../UploadModal/UploadModal";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.debounceTimeout = 0;
    this.state = {
      text: "",
    };
  }
  debounceSearch = (event) => {
    let txt = event.target.value;
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.debounceTimeout = setTimeout(
      function () {
        this.props.onSearch(txt);
      }.bind(this),
      300
    );
  };
  render() {
    return (
      <div className="header-container">
        <div className="header">
          <a className="home" href="/">
            <img
              className="logo"
              style={{ height: "30px" }}
              src="logo192.png"
              alt="logo"
            ></img>
          </a>
          {this.props.history.location.pathname === "/" ? (
            <div className="search-bar">
              <Input
                placeholder="input search text"
                className="input-dark"
                value={this.state.searchText}
                onChange={(e) => {
                  this.setState({ text: e.target.value });
                  this.debounceSearch(e);
                }}
              />
              <Button
                type="primary"
                icon={<SearchOutlined />}
                className="btn-dark"
                onClick={this.props.onSearch}
              ></Button>
            </div>
          ) : (
            ""
          )}

          {this.props.history.location.pathname === "/" ? (
            <div className="header-action">
              <UploadModal />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
