import { DislikeOutlined, EyeOutlined, LikeOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import React from "react";
import Iframe from "react-iframe";
import { get_time_diff } from "./../../util/util";
import Spinner from "../../util/Spinner";
import "./Preview.css";

export default function Preview(props) {
  console.log(props.video);
  let url;
  if (props.video) {
    url = `https://www.${props.video.videoLink}`;
  }

  return (
    <div className="preview-container">
      {props.video ? (
        <>
          <Iframe
            className="preview iframe-parent"
            url={url}
            id="myId"
            position="relative"
            allowFullScreen
          />

          <Row className="information">
            <Col xs={{ span: 24 }} sm={{ span: 15 }}>
              <h2 style={{ marginLeft: "4px", color: "white" }}>
                {props.video.title}
              </h2>
              <p style={{ color: "grey" }}>
                <span>
                  <EyeOutlined /> {props.video.viewCount} &bull;
                </span>
                <span> {get_time_diff(new Date(props.video.releaseDate))}</span>
              </p>
            </Col>
            <Col className="reaction">
              <Button size="large" icon={<LikeOutlined />} shape="round">
                like
              </Button>
              <Button size="large" icon={<DislikeOutlined />} shape="round">
                dislike
              </Button>
            </Col>
          </Row>

          <hr style={{ color: "grey", width: "70%" }} />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
