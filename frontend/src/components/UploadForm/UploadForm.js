import React, { useLayoutEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { message } from "antd";
import { backendURL } from "./../../ipConfig.json";

const allGenre = ["All", "Education", "Sports", "Comedy", "Lifestyle"];
const allAge = ["Anyone", "7+", "12+", "16+", "18+"];

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0.5, 2),
    backgroundColor: "red",
  },
  cancel: {
    margin: theme.spacing(3, 0.5, 2),
    backgroundColor: "transparent",
  },
}));

const validateResponse = (errored, response) => {
  if (errored) {
    message.error(
      "Error while uploading. Make sure your internet is working and try again."
    );
    return false;
  }

  if (response && response.code) {
    message.error(response.message || "Failed to upload");
    return false;
  }

  return true;
};
const performAPICall = async (bodyObj) => {
  let response = {};
  let errored = false;

  let url = `${backendURL}/v1/videos`;

  try {
    response = await (
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyObj),
      })
    ).json();
  } catch (e) {
    errored = true;
  }

  if (validateResponse(errored, response)) {
    return true;
  }
};

export default function UploadForm(props) {
  const classes = useStyles();

  const [link, setLink] = React.useState("");
  const [imgLink, setImgLink] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [genre, setGenre] = React.useState("");
  const [age, setAge] = React.useState("");
  const [date, setDate] = React.useState("");
  const [loading, toggleLoading] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const bodyObj = {
      videoLink: link,
      previewImage: imgLink,
      title: title,
      genre: genre,
      contentRating: age,
      releaseDate: date,
    };
    toggleLoading(true);

    const res = await performAPICall(bodyObj);

    props.onCancel();

    toggleLoading(false);

    if (res) {
      message.success("Uploaded!");
      setLink("");
      setImgLink("");
      setTitle("");
      setGenre("");
      setAge("");
      setDate("");
    }
  }
  const divRef = React.useRef(null);

  useLayoutEffect(() => {
    window && window.scrollTo(0, 0);
  },[]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="video-link"
            label="Video Link"
            name="video-link"
            helperText="This link will be used to deliver the video"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="thumbnail-link"
            label="Thumbnail Image Link"
            name="thumbnail-link"
            helperText="This link will be used to preview the thumbnail for the video"
            value={imgLink}
            onChange={(e) => setImgLink(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            helperText="The title will be the representation text for the video"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormControl variant="outlined" required fullWidth margin="normal">
            <InputLabel id="genre-label">Genre</InputLabel>

            <Select
              labelId="genre-label"
              id="genre-select"
              name="genre"
              margin="normal"
              required
              fullWidth
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              label="Genre"
            >
              {allGenre.map((g) => (
                <MenuItem value={g}>{g}</MenuItem>
              ))}
            </Select>
            <FormHelperText>
              Genre will help in categorizing your videos
            </FormHelperText>
          </FormControl>

          <FormControl variant="outlined" required fullWidth margin="normal">
            <InputLabel id="age-label">Suitable age group</InputLabel>

            <Select
              labelId="age-label"
              id="age-select"
              margin="normal"
              required
              fullWidth
              value={age}
              onChange={(e) => setAge(e.target.value)}
              label="Suitable age group"
            >
              {allAge.map((ag) => (
                <MenuItem value={ag}>{ag}</MenuItem>
              ))}
            </Select>
            <FormHelperText>
              This will be used to filter videos on age group suitability
            </FormHelperText>
          </FormControl>
          <TextField
            id="date"
            label="Upload and publish Date"
            type="date"
            name="date"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            helperText="This will be used to sort videos"
            InputLabelProps={{
              shrink: true,
            }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button
            id="upload-btn-submit"
            onFocus
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            ref={divRef}
          >
            Upload Video
          </Button>
          <Button
            color="danger"
            variant="contained"
            id="upload-btn-cancel"
            className={classes.cancel}
            onClick={props.onCancel}
          >
            Cancel
          </Button>
        </form>
      </div>
    </Container>
  );
}
