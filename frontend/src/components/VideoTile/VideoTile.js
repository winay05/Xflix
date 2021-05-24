import React from "react";
import { Card } from "antd";
import "./VideoTile.css";
import { Link } from "react-router-dom";
import { get_time_diff } from "../../util/util";

export default function VideoTile(props) {
  // console.log(props.video.videoLink);
  return (
    <Link className="video-tile-link" to={`/preview/${props.video._id}`}>
      <div className="video-tile">
        <Card
          hoverable
          cover={<img alt={props.video.title} src={props.video.previewImage} />}
          bordered={false}
        >
          <div style={{ marginTop: ".25em" }}>
            <h3 className="card-caption">{props.video.title}</h3>
            <p className="card-caption">
              {get_time_diff(new Date(props.video.releaseDate))}
            </p>
          </div>
        </Card>
      </div>
    </Link>
    //<a className="video-tile-link" href={url} rel="noreferrer" target="_blank">

    // </a>
  );
}
