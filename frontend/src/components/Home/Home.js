import React, { Component } from "react";
import { message } from "antd";
import { withRouter } from "react-router";

import GenrePanel from "./../GenrePanel/GenrePanel";
import Dashboard from "./../Dashboard/Dashboard";
import Header from "./../Header/Header";
import Preview from "./../Preview/Preview";
import { backendURL } from "./../../ipConfig.json";

//add the filter and search functionality here and pass to header as props

const genre = ["All", "Education", "Sports", "Comedy", "Lifestyle"];
const age = ["Anyone", "7+", "12+", "16+", "18+"];

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      searchText: "",
      videos: [],
      sortBy: "releaseDate",
      genreFilter: ["All"],
      ageContentFilter: "Anyone",
    };
  }
  handleButtonClick = async (e) => {
    let nm = e.target.innerText;

    if (genre.indexOf(nm) >= 0) {
      //set into genreFilter
      let newGenre = [...this.state.genreFilter];
      if (newGenre.indexOf(nm) >= 0) {
        //remove
        newGenre = newGenre.filter((el) => el !== nm);
      } else if (nm === "All") {
        newGenre = ["All"];
      } else {
        newGenre = newGenre.filter((el) => el !== "All");
        newGenre = [nm, ...newGenre];
      }
      this.setState(
        {
          genreFilter: newGenre,
        },
        async () => {
          await this.getVideos();
        }
      );
    } else if (age.indexOf(nm) >= 0) {
      //set into ageContentFilter
      let newAge = nm;
      if (newAge === this.state.ageContentFilter) {
        newAge = "";
      }
      this.setState(
        {
          ageContentFilter: newAge,
        },
        async () => {
          await this.getVideos();
        }
      );
    }
  };
  handleDropDown = async (e) => {
    if (this.state.sortBy === "viewCount") {
      this.setState(
        (state) => {
          return { sortBy: "releaseDate" };
        },
        async () => {
          await this.getVideos();
        }
      );
    } else {
      this.setState(
        (state) => {
          return { sortBy: "viewCount" };
        },
        async () => {
          await this.getVideos();
        }
      );
    }
  };
  handleSearch = (text) => {
    console.log("inside search handler");
    this.setState({ searchText: text }, async () => {
      await this.getVideos();
    });
  };

  validateResponse = (errored, response) => {
    if (errored) {
      message.error(
        "Could not fetch videos. Check that the backend is running, reachable and returns valid JSON."
      );
      return false;
    }

    if (!response || response.length < 1) {
      message.error(
        response ? response.message : '"No videos found in database"'
      );
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

    let url = `${backendURL}/v1/videos`;
    let queryString = "";

    if (this.state.sortBy.length > 0) {
      if (queryString.length < 1) {
        queryString += "?";
      } else {
        queryString += "&";
      }
      queryString += `sortBy=${this.state.sortBy}`;
    }
    if (this.state.searchText.length > 0) {
      if (queryString.length < 1) {
        queryString += "?";
      } else {
        queryString += "&";
      }
      //specific to json server
      queryString += `q=${this.state.searchText}`;
    }
    if (this.state.genreFilter.length > 0) {
      if (queryString.length < 1) {
        queryString += "?";
      } else {
        queryString += "&";
      }
      queryString += `genres=${this.state.genreFilter.join(",")}`;
    }

    if (this.state.ageContentFilter.length > 0) {
      if (queryString.length < 1) {
        queryString += "?";
      } else {
        queryString += "&";
      }
      queryString += `contentRating=${encodeURIComponent(
        this.state.ageContentFilter
      )}`;
    }

    url += queryString;

    try {
      response = (await (await fetch(url)).json()).data;
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
      this.setState({
        videos: [...response],
      });
    }
  };
  async componentDidMount() {
    //perform api call here
    await this.getVideos();
  }

  render() {
    return (
      <div className="container">
        <Header history={this.props.history} onSearch={this.handleSearch} />
        <Dashboard loading={this.state.loading} videos={this.state.videos}>
          {this.props.history.location.pathname === "/" ? (
            <GenrePanel
              handleDropDown={this.handleDropDown}
              sortBy={this.state.sortBy}
              genreFilter={this.state.genreFilter}
              ageContentFilter={this.state.ageContentFilter}
              handleButtonClick={this.handleButtonClick}
            />
          ) : (
            <Preview
              history={this.props.history}
              video={this.state.videos.find(
                (video) =>
                  video._id ===
                  this.props.history.location.pathname.split("/")[2]
              )}
            />
          )}
        </Dashboard>
      </div>
    );
  }
}

export default withRouter(Home);
