import { Button, Input, message } from "antd";
import { UploadOutlined, SearchOutlined } from "@ant-design/icons";

import React from "react";
import "./Header.css";

export default function Header(props) {
  return (
    <div className="header-container">
      <div className="header">
        <img
          className="logo"
          style={{ height: "30px" }}
          src="logo192.png"
          alt="logo"
        ></img>
        <div className="search-bar">
          <Input placeholder="input search text" className="input-dark" />
          <Button icon={<SearchOutlined />} className="btn-dark"></Button>
        </div>
        {/* <Input.Search className="search-bar" placeholder="input search text" /> */}
        <div className="header-action">
          <Button type="primary" icon={<UploadOutlined />}>
            Upload
          </Button>
        </div>
      </div>
      {props.children}
    </div>
  );
}
