// Import the YouTube API library
const YouTube = require("youtube-api-v3");

// Set your Google API credentials
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const client = new YouTube(API_KEY);

// Create a React component to render the videos
class App extends React.Component {
  state = {
    videos: [],
  };

  componentDidMount() {
    // Search for videos on YouTube
    client.search.list({
      q: "cats",
    }).then((response) => {
      this.setState({
        videos: response.items,
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.videos.map((video) => (
          <div key={video.id}>
            <a href={`https://www.youtube.com/watch?v=${video.id}`}>
              {video.snippet.title}
            </a>
          </div>
        ))}
      </div>
    );
  }
}

// Render the React component to the DOM
ReactDOM.render(<App />, document.getElementById("root"));
