import React, { Component } from "react";
import { Col, Row } from "antd";
import VideoTile from "../VideoTile/VideoTile";
import Spinner from "./../../util/Spinner";
import "./Dashboard.css";

export default class Dashboard extends Component {
  render() {
    return (
      <>
        <div className="genre-container">{this.props.children}</div>
        <div className="dashboard-container">
          {this.props.loading ? (
            <Spinner />
          ) : (
            <Row>
              {this.props.videos.map((video) => (
                <Col sm={{ span: 12 }} lg={{ span: 6 }}>
                  <VideoTile
                    onClick={window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    })}
                    video={video}
                  />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </>
    );
  }
}
