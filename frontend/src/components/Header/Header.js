import { Button, Input, message } from "antd";
import { UploadOutlined, SearchOutlined } from "@ant-design/icons";

import React, { Component } from "react";
import "./Header.css";
import UploadModal from "../UploadModal/UploadModal";

export default class Header extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     text: "",
  //   };
  // }
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
              <Input placeholder="input search text" className="input-dark" />
              <Button
                type="primary"
                icon={<SearchOutlined />}
                className="btn-dark"
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
