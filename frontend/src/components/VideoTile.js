import React from "react";
import { Card } from "antd";
import "./VideoTile.css";

export default function VideoTile(props) {
  // console.log(props.video.videoLink);
  let url = `https://${props.video.videoLink}`;
  return (
    <div className="video-tile">
      <a href={url} rel="noreferrer" target="_blank">
        <Card
          hoverable
          cover={<img alt={props.video.title} src={props.video.previewImage} />}
          bordered={false}
        >
          <div>
            <h3 className="card-caption">{props.video.title}</h3>
            <p className="card-caption">{props.video.releaseDate}</p>
          </div>
        </Card>
      </a>
    </div>
  );
}
