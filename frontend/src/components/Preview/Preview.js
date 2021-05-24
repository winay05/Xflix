import { DislikeOutlined, EyeOutlined, LikeOutlined } from "@ant-design/icons";
import { Button, Col, message, Row } from "antd";
import React from "react";
import Iframe from "react-iframe";
import { get_time_diff } from "./../../util/util";
import "./Preview.css";
import { backendURL } from "./../../ipConfig.json";

const performAPICall = async (vote, id) => {
  let url = `${backendURL}/v1/videos/${id}/votes`;

  try {
    await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        vote: vote,
        change: "increase",
      }),
    });
  } catch (e) {
    message.error(
      "Could not update votes. Check that the internet connection and try again."
    );
  }
};

async function handleVote(vote, id) {
  await performAPICall(vote, id);
}
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
              <Button
                size="large"
                icon={<LikeOutlined />}
                shape="round"
                onClick={async () => handleVote("upVote", props.video._id)}
              >
                like
              </Button>
              <Button
                size="large"
                icon={<DislikeOutlined />}
                shape="round"
                onClick={async () => {
                  handleVote("downVote", props.video._id);
                }}
              >
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
