import React, { Component } from "react";
import { Col, message, Row } from "antd";
import VideoTile from "./VideoTile";
import Spinner from "./Spinner";
import { backendURL } from "./../ipConfig.json";
import "./Dashboard.css";

export default class Dashboard extends Component {
  constructor() {
    super();
    this.videos = [];

    this.state = {
      loading: true,
      filteredVideos: [],
    };
  }

  validateResponse = (errored, response) => {
    if (errored) {
      message.error(
        "Could not fetch videos. Check that the backend is running, reachable and returns valid JSON."
      );
      return false;
    }

    if (!response.length) {
      message.error(response.message || "No videos found in database");
      return false;
    }

    return true;
  };
  performAPICall = async () => {
    let response = {};
    let errored = false;

    this.setState({
      loading: true,
    });

    try {
      response = (await (await fetch(`${backendURL}/v1/videos`)).json()).videos;
    } catch (e) {
      errored = true;
    }
    this.setState({
      loading: false,
    });

    if (this.validateResponse(errored, response)) {
      return response;
    }
  };

  getVideos = async () => {
    let response = await this.performAPICall();
    if (response && response.length > 0) {
      this.videos = [...response];
    }
    this.setState((state) => {
      return { filteredVideos: [...this.videos] };
    });
  };
  async componentDidMount() {
    //perform api call here
    await this.getVideos();
  }
  render() {
    return (
      <div className="dashboard-container">
        {this.state.loading ? (
          <Spinner />
        ) : (
          <Row>
            {this.state.filteredVideos.map((video) => (
              <Col span={6}>
                <VideoTile video={video} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    );
  }
}
