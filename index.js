import React from "react";
import ReactDOM from "react-dom";
import { YouTube } from "youtube-api-v3";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GuestProfile, Home, UploadVideo } from "./pages";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const client = new YouTube(API_KEY);

// Create a React component to render the videos
class App extends React.Component {
  state = {
    videos: [],
    profilePic: "",
    watchedVideos: [],
  };

  componentDidMount() {
    // Get the profile picture and watched videos from the cookie data
    const profilePic = getCookie("profilePic");
    const watchedVideos = getCookie("watchedVideos");

    // Set the state with the profile picture and watched videos
    this.setState({
      profilePic,
      watchedVideos,
    });

    // Search for videos on YouTube
    client.search.list({
      q: "cats",
    }).then((response) => {
      this.setState({
        videos: response.items,
      });
    });
  }

  // Handle the change of the profile picture
  handleProfilePicChange = (e) => {
    // Get the new profile picture
    const profilePic = e.target.files[0];

    // Set the state with the new profile picture
    this.setState({
      profilePic,
    });

    // Save the new profile picture to the cookie data
    setCookie("profilePic", profilePic);
  };

  // Handle the click of the watch video button
  handleWatchVideoClick = (video) => {
    // Add the video to the watched videos array
    const watchedVideos = [...this.state.watchedVideos, video];

    // Set the state with the new watched videos array
    this.setState({
      watchedVideos,
    });

    // Save the new watched videos array to the cookie data
    setCookie("watchedVideos", watchedVideos);
  };

  render() {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Home videos={this.state.videos} onWatchVideoClick={this.handleWatchVideoClick} />,
      },
      {
        path: "/guest-profile",
        element: <GuestProfile profilePic={this.state.profilePic} onProfilePicChange={this.handleProfilePicChange} />,
      },
      {
        path: "/upload-video",
        element: <UploadVideo />,
      },
    ]);

    return (
      <div>
        <RouterProvider router={router} />
      </div>
    );
  }
}

// Render the React component to the DOM
ReactDOM.render(<App />, document.getElementById("root"));
