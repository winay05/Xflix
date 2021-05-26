import React, { Component } from "react";
import { Modal, Button } from "antd";
import "./UploadModal.css";
import { UploadOutlined } from "@ant-design/icons";
// const { Button } = window['MaterialUI'];
import UploadForm from "./../UploadForm/UploadForm";

export default class UploadModal extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }
  toggleOpen = () => {
    this.setState((state) => {
      return { isOpen: !state.isOpen };
    });
  };
  render() {
    return (
      <>
        <Button
          icon={<UploadOutlined />}
          id="upload-btn"
          size="large"
          shape="round"
          type="primary"
          onClick={this.toggleOpen}
        >
          Upload
        </Button>
        {this.state.isOpen ? (
          <Modal
            title="Upload Video"
            visible={this.state.isOpen}
            onOk={this.toggleOpen}
            onCancel={this.toggleOpen}
          >
            <UploadForm key={1} onCancel={this.toggleOpen} />
          </Modal>
        ) : (
          ""
        )}
      </>
    );
  }
}
